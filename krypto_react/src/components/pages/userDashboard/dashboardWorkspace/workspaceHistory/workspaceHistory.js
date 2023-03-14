import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import i18next from "i18next";
import "./workspaceHistory.scss"
import { UserContext } from "../../../../user/userContext";
import PostThis from "../../../../../scripts/post";
import SearchByApi from "../../../../ui/searchByApi/searchByApi";
import Infobox from "../../../../ui/infobox/infobox";
import Pagination from "../../../../ui/pagination/pagination";
import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";
import WorkspaceHistoryListItem from "./workspaceHistoryListItem/workspaceHistoryListItem";
import { handleConvertDateFormatFilter } from "../../../../../scripts/dateTransformations";
import transhistory from "../../../../../img/pos.png";

const WorkspaceHistory = (props) => {
    const user = useContext(UserContext);
    const [historyList, setHistoryList] = useState();
    const [historyListError, setHistoryListError] = useState(false);
    const [historyListErrorType, setHistoryListErrorType] = useState();
    const [historyListErrorMsg, setHistoryListErrorMsg] = useState("");

    const [boxPlaceholder, setBoxPlaceholder] = useState(false);

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
    const [apiUrl, setApiUrl] = useState("/api/users/me/pos-orders");

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
            } else if (response.status === 400) {
                props.setIsPosAllowed(false);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };
    const handleFilter = async (e) => {
        // setHistoryListPreloader(true);
        if (e) {
            e.preventDefault();
        }

        const dateFrom = handleConvertDateFormatFilter(selectedDateFrom);
        const dateTo = handleConvertDateFormatFilter(selectedDateTo);

        const activeFilters = `${
            activePair.name
                ? `&pairShortName=${
                      activePair.name === "Para" ? "" : activePair.name
                  }`
                : ""
        }${
            activePair.id ? `&currencyPairId=${activePair.id}` : ""
        }&from=${dateFrom}&to=${dateTo}${
            activeType.value > 0 ? `&type=${activeType.value}` : ""
        }`;

        setApiUrl(`/api/users/me/pos-orders?page=1&sortType=0${activeFilters}`);

        if (document.location.search) {
            var queryParams = new URLSearchParams(window.location.search);
            if (activePair.name && activePair.name !== "Para") {
                queryParams.set("pairShortName", activePair.name);
            }
            if (activePair.id) {
                queryParams.set("currencyPairId", activePair.id);
            }
            queryParams.set("from", dateFrom);
            queryParams.set("to", dateTo);
            window.history.replaceState({}, null, `?${queryParams.toString()}`);
        }
        // else {
        //     window.history.pushState({}, null, `?filter${test}`);
        // }
    };

    const handleBuildList = (list) => {
        if (list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <WorkspaceHistoryListItem
                        item={item}
                        index={index}
                        key={index}
                    />
                );
            });
            if (dom) {
                setHistoryList(dom);
            }
        } else {
        }

        setBoxPlaceholder(false);
    };

    useEffect(() => {
        if (props.activeTab === "transactions") {
            const source = axios.CancelToken.source();
            getCurrenciesList(source.token);
            return () => {
                source.cancel();
            };
        }
    }, [props.activeTab]);

    useEffect(() => {
        let getFilters = document.location.search;
        getFilters = getFilters.split("&filter");
        getFilters = getFilters.join();
        setApiUrl(`/api/users/me/pos-orders?page=1&sortType=0${getFilters}`);
    }, []);

    return (
        <section className="workspaceHistory">
            <div className="row rowBox">
              <div className="col col-xl-6"> 
                <div>
                 <h1 className="stdDashboardHeader">
                   {i18next.t("Historia transakcji POS")}
                 </h1>
                   <p className="tbSpace">{i18next.t("W ponizszym panelu mozesz podejrzec wszystkie transakcje przeprowadzone z wykorzystaniem kart platniczych oraz innych metod platnosci")}</p>
                </div>
               </div>
               <div className="col col-xl-6"> <img src={transhistory}/></div>
            </div>

           
            <SearchByApi
                handleFilter={handleFilter}
                selectedDateFrom={selectedDateFrom}
                setSelectedDateFrom={setSelectedDateFrom}
                selectedDateTo={selectedDateTo}
                setSelectedDateTo={setSelectedDateTo}
                activeType={activeType}
                setActiveType={setActiveType}
                pairsList={pairsList}
                activePair={activePair}
                setActivePair={setActivePair}
            />

            <div className="historyListRow">
                <div className="historyListTable preloaderWrapper">
                    <div className="historyListHeader">
                        <div className="historyListCol time">
                            {i18next.t("Czas")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Data")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Para")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Ilość")}
                        </div>
                        <div className="historyListCol">
                            {i18next.t("Kwota transakcji")}
                        </div>
                        <div className="historyListCol phone">
                            {i18next.t("Telefon")}
                        </div>
                        <div className="historyListCol status">
                            {i18next.t("Status")}
                        </div>
                    </div>
                    <div className="historyListBody ">
                        <BoxPlaceholder
                            type={"line"}
                            count={10}
                            show={boxPlaceholder}
                        />

                        {historyList}
                    </div>

                    {historyListError ? (
                        <Infobox icon={historyListErrorType ?? "info"}>
                            {i18next.t(historyListErrorMsg)}
                        </Infobox>
                    ) : (
                        ""
                    )}
                </div>
            </div>

            <div className="paginationRow">
                {
                    <Pagination
                        setBoxPlaceholder={setBoxPlaceholder}
                        handleBuildList={handleBuildList}
                        setList={setHistoryList}
                        URL={apiUrl}
                        activePair={activePair}
                        activeType={activeType}
                        dateFrom={handleConvertDateFormatFilter(
                            selectedDateFrom
                        )}
                        dateTo={handleConvertDateFormatFilter(selectedDateTo)}
                    />
                }
            </div>
        </section>
    );
};

export default WorkspaceHistory;
