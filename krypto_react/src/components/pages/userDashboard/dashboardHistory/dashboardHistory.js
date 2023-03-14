import React, { useContext, useState, useEffect, useRef } from "react";
import i18next from "i18next";
import axios from "axios";

import "./dashboardHistory.scss";
import "./../../../ui/tabs/tabs.scss";

import { UserContext } from "../../../user/userContext";
import UserDashboard from "./../userDashboard";

import PostThis from "../../../../scripts/post";
import { ChangeTabs, ShowTabs } from "../../../../scripts/changeTabs";

import { handleConvertDateFormatFilter } from "../../../../scripts/dateTransformations";

import Trades from "./trades/trades";
import CheckoutOrders from "./checkoutOrders/checkoutOrders";

const DashboardHistory = (prosp) => {
    const user = useContext(UserContext);
    const [historyListError, setHistoryListError] = useState(false);
    const [boxPlaceholderHistoryList, setBoxPlaceholderHistoryList] = useState(
        true
    );

    const [selectedDateFrom, setSelectedDateFrom] = useState(
        new Date("01/01/2019")
    );
    const [selectedDateTo, setSelectedDateTo] = useState(new Date());

    const [typeList, setTypeList] = useState([
        {
            value: 0,
            name: i18next.t("Typ"),
        },
        {
            value: "1",
            name: i18next.t("Kupno"),
        },
        {
            value: "2",
            name: i18next.t("Sprzedaż"),
        },
    ]);

    const [activeType, setActiveType] = useState({
        value: 0,
        name: i18next.t("Typ"),
    });

    const [pairsList, setPairsList] = useState([]);
    const [activePair, setActivePair] = useState({
        value: 0,
        name: i18next.t("Para"),
    });

    const [apiOrdersUrl, setApiOrdersUrl] = useState("");
    const [apiCheckoutOrdersUrl, setApiCheckoutOrdersUrl] = useState(
        "/api/users/me/checkout-orders"
    );

    const refTabs = useRef(null);
    const refTabsContent = useRef(null);

    const getCurrenciesList = async (cancelToken) => {
        const response = await PostThis(
            "/public-api/homepage-data",
            "GET",
            "",
            {
                Authorization: `Bearer ${user.data.user?.authToken}`,
            },
            "",
            cancelToken
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                let pairs = response.data.currencyPairs;
                pairs.unshift({ id: "", pairShortName: "Para" });
                const buildOptionsList = pairs.map((item, index) => {
                    return { name: item.pairShortName, id: item.id };
                });

                return setPairsList(buildOptionsList);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    const handleOrdersFilter = async (e) => {
        if (e) {
            e.preventDefault();
        }

        const dateFrom = handleConvertDateFormatFilter(selectedDateFrom);
        const dateTo = handleConvertDateFormatFilter(selectedDateTo);

        setApiOrdersUrl(
            `/api/users/me/trades?page=1&sortType=0${
                activePair.name
                    ? `&pairShortName=${
                          activePair.name === "Para" ? "" : activePair.name
                      }`
                    : ""
            }${
                activePair.id ? `&currencyPairId=${activePair.id}` : ""
            }&from=${dateFrom}&to=${dateTo}${
                activeType.value > 0 ? `&type=${activeType.value}` : ""
            }`
        );

        let queryParams = new URLSearchParams();
        if (activePair.name && activePair.name !== "Para") {
            queryParams.set("pairShortName", activePair.name);
        }
        if (activePair.id) {
            queryParams.set("currencyPairId", activePair.id);
        }
        if (activeType.value > 0) {
            queryParams.set("type", activeType.value);
        }
        queryParams.set("from", dateFrom);
        queryParams.set("to", dateTo);

        window.history.replaceState(
            {},
            null,
            `?orders=&${queryParams.toString()}`
        );
    };

    const handleCheckoutOrdersFilter = async (e) => {
        // setHistoryListPreloader(true);
        if (e) {
            e.preventDefault();
        }
        setHistoryListError(false);
        const dateFrom = handleConvertDateFormatFilter(selectedDateFrom);
        const dateTo = handleConvertDateFormatFilter(selectedDateTo);

        setApiCheckoutOrdersUrl(
            `/api/users/me/checkout-orders?page=1&sortType=0${
                activePair.name
                    ? `&pairShortName=${
                          activePair.name === "Para" ? "" : activePair.name
                      }`
                    : ""
            }${
                activePair.id ? `&currencyPairId=${activePair.id}` : ""
            }&from=${dateFrom}&to=${dateTo}${
                activeType.value > 0 ? `&type=${activeType.value}` : ""
            }`
        );
        let queryParams = new URLSearchParams();
        if (activePair.name && activePair.name !== "Para") {
            queryParams.set("pairShortName", activePair.name);
        }
        if (activePair.id) {
            queryParams.set("currencyPairId", activePair.id);
        }
        if (activeType.value > 0) {
            queryParams.set("type", activeType.value);
        }
        queryParams.set("from", dateFrom);
        queryParams.set("to", dateTo);

        window.history.replaceState(
            {},
            null,
            `?checkout-orders=&${queryParams.toString()}`
        );
    };

    const handleChangeTab = (e) => {
        setApiCheckoutOrdersUrl("");
        setApiOrdersUrl("");
        setHistoryListError(false);
        setActiveType({
            value: 0,
            name: i18next.t("Typ"),
        });
        setActivePair({
            value: 0,
            name: i18next.t("Para"),
        });

        if (e.currentTarget.dataset.tab === "checkoutorders") {
            setApiCheckoutOrdersUrl("/api/users/me/checkout-orders");
        } else {
            setApiOrdersUrl("/api/users/me/trades");
        }

        ChangeTabs(e, refTabs, refTabsContent);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        // handleChangeTab()
        getCurrenciesList(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    //ustawienie aktywności taba z url
    useEffect(() => {
        // setApiCheckoutOrdersUrl("/api/users/me/checkout-orders");
        // setApiOrdersUrl("/api/users/me/trades");
        let tabFromLink = document.location.search.split("?");
        if (tabFromLink[1]) {
            tabFromLink = tabFromLink[1].split("=");
            if (tabFromLink[0]) {
                setApiCheckoutOrdersUrl("");
                setApiOrdersUrl("");
                ChangeTabs(tabFromLink[0], refTabs, refTabsContent);
                if (tabFromLink[0] === "checkoutorders") {
                    setApiCheckoutOrdersUrl("/api/users/me/checkout-orders");
                } else {
                    setApiOrdersUrl("/api/users/me/trades");
                }
            }
        }
    }, []);

    useEffect(() => {
        let searchParams = document.location.search;
        let activeTab = searchParams.split("=");
        activeTab = activeTab.slice(0, 1);
        let getFilters = searchParams.split(`${activeTab[0]}=`);
        const params = new URLSearchParams(searchParams);
        // Ustawianie daty z linku jak Ł.Rak przygotuje filtrowanie
        // setSelectedDateFrom(new Date(test.getAll("from")));
        // setSelectedDateTo(new Date(test.getAll("to")));
        if (params.get("pairShortName")) {
            setActivePair({
                value: params.getAll("currencyPairId"),
                name: params.getAll("pairShortName"),
            });
        }
        if (params.get("type")) {
            let typeName;
            if (params.get("type") === "1") {
                typeName = i18next.t("Kupno");
            } else if (params.get("type") === "2") {
                typeName = i18next.t("Sprzedaż");
            }
            setActiveType({
                value: params.get("type"),
                name: typeName,
            });
        }
        if (getFilters && getFilters.length > 0) {
            // if (activeTab[0] === "?trades") {
                setApiOrdersUrl(`/api/users/me/trades?page=1${getFilters[1]}`);
            // } else if 
            // (activeTab[0] === "?checkoutorders")
            //  {
                setApiCheckoutOrdersUrl(
                    `/api/users/me/checkout-orders?page=1${getFilters[1]}`
                );
            // }
        }
    }, []);

    return (
        <UserDashboard>
            <section className="dashboardHistory">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Historia transakcji")}
                </h1>
                <div className="dashboardIntroduce">
                    <p>
                        {i18next.t(
                            "W tym panelu możesz sprawdzić listę zrealizowanych zleceń kupna i sprzedaży. Znajdziesz tu wszystkie transakcje opłacone za pomocą portfela wewnętrznego, karty lub innych metod płatniczych. Możesz je filtrować, czy śledzić zmiany salda."
                        )}
                    </p>
                </div>

                <div className="tabs">
                    <button
                        className="show-tabs"
                        onClick={(e) => ShowTabs(refTabs)}
                    >
                        <div className="innerTab">
                            <span className="material-icons">list</span>
                        </div>
                    </button>
                    <div className="tabsHeader" ref={refTabs}>
                        <div className="tabsHeaderHelper">
                            {/* <button
                                className="tab active"
                                data-tab="checkoutorders"
                                onClick={(e) => handleChangeTab(e)}
                            >
                                <div className="innerTab">
                                    <div className="text">
                                        {i18next.t("Transakcje")}
                                    </div>
                                </div>
                            </button> */}
                            {/* <button
                                className="tab "
                                data-tab="trades"
                                onClick={(e) => handleChangeTab(e)}
                            >
                                <div className="innerTab">
                                    <div className="text">
                                        {i18next.t("Transakcje z portfela")}
                                    </div>
                                </div>
                            </button> */}
                        </div>
                    </div>

                    <div className="tabsContent" ref={refTabsContent}>
                        <div className="tabContent" data-tab="trades">
                            {/* <Trades
                                apiOrdersUrl={apiOrdersUrl}
                                handleOrdersFilter={handleOrdersFilter}
                                selectedDateFrom={selectedDateFrom}
                                setSelectedDateFrom={setSelectedDateFrom}
                                selectedDateTo={selectedDateTo}
                                setSelectedDateTo={setSelectedDateTo}
                                typeList={typeList}
                                activeType={activeType}
                                setActiveType={setActiveType}
                                pairsList={pairsList}
                                activePair={activePair}
                                setActivePair={setActivePair}
                                boxPlaceholderHistoryList={
                                    boxPlaceholderHistoryList
                                }
                                setBoxPlaceholderHistoryList={
                                    setBoxPlaceholderHistoryList
                                }
                            /> */}
                        </div>
                        <div
                            className="tabContent active"
                            data-tab="checkoutorders"
                        >
                            <CheckoutOrders
                                apiCheckoutOrdersUrl={apiCheckoutOrdersUrl}
                                handleCheckoutOrdersFilter={
                                    handleCheckoutOrdersFilter
                                }
                                selectedDateFrom={selectedDateFrom}
                                setSelectedDateFrom={setSelectedDateFrom}
                                selectedDateTo={selectedDateTo}
                                setSelectedDateTo={setSelectedDateTo}
                                typeList={typeList}
                                activeType={activeType}
                                setActiveType={setActiveType}
                                pairsList={pairsList}
                                activePair={activePair}
                                setActivePair={setActivePair}
                                boxPlaceholderHistoryList={
                                    boxPlaceholderHistoryList
                                }
                                setBoxPlaceholderHistoryList={
                                    setBoxPlaceholderHistoryList
                                }
                            />
                             <Trades
                                apiOrdersUrl={apiOrdersUrl}
                                handleOrdersFilter={handleOrdersFilter}
                                selectedDateFrom={selectedDateFrom}
                                setSelectedDateFrom={setSelectedDateFrom}
                                selectedDateTo={selectedDateTo}
                                setSelectedDateTo={setSelectedDateTo}
                                typeList={typeList}
                                activeType={activeType}
                                setActiveType={setActiveType}
                                pairsList={pairsList}
                                activePair={activePair}
                                setActivePair={setActivePair}
                                boxPlaceholderHistoryList={
                                    boxPlaceholderHistoryList
                                }
                                setBoxPlaceholderHistoryList={
                                    setBoxPlaceholderHistoryList
                                }
                            />
                        </div>
                    </div>
                </div>
            </section>
        </UserDashboard>
    );
};
export default DashboardHistory;
