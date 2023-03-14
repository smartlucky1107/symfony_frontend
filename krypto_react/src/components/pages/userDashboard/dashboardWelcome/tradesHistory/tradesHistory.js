import React, { useState, useEffect, useContext } from "react";
import i18next from "i18next";
import "./tradesHistory.scss";
import axios from "axios";
import PostThis from "../../../../../scripts/post";

import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";
import Infobox from "../../../../ui/infobox/infobox";
import { UserContext } from "../../../../user/userContext";

import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../../scripts/dateTransformations";

const TradesHistory = () => {
    const user = useContext(UserContext);
    const [boxPlaceholder, setBoxPlaceholder] = useState(true);
    const [historyList, setHistoryList] = useState();
    const [historyListError, setHistoryListError] = useState();
    const [historyListErrorType, setHistoryListErrorType] = useState();
    const [historyListErrorMsg, setHistoryListErrorMsg] = useState();

    const [
        checkoutOrdersHistoryList,
        setCheckoutOrdersHistoryList,
    ] = useState();
    const [
        checkoutOrdersHistoryListError,
        setCheckoutOrdersHistoryListError,
    ] = useState();
    const [
        checkoutOrdersHistoryListErrorType,
        setCheckoutOrdersHistoryListErrorType,
    ] = useState();
    const [
        checkoutOrdersHistoryListErrorMsg,
        setCheckoutOrdersHistoryListErrorMsg,
    ] = useState();

    const handleConverTimeToText = (time) => {
        const operationDate = new Date(time).getTime() / 1000;
        const dateNow = new Date().getTime() / 1000;

        let timeDifference = dateNow - operationDate;
        timeDifference = timeDifference * 1000 * 60;

        if (timeDifference < 1) {
            return i18next.t("mniej niż minutę temu");
        } else if (timeDifference < 50) {
            return `${i18next.t("minut temu")}`;
        } else if (timeDifference > 50 && timeDifference < 90) {
            return i18next.t("około godzinę temu");
        } else if (timeDifference > 90 && timeDifference < 150) {
            return i18next.t("około 2 godziny temu");
        } else {
            // handleConvertDate(time);
            return `${handleConvertTimeFormat(time)} ${handleConvertDateFormat(
                time
            )}`;
            // i18next.t("Więcej niż 2 godziny temu")
        }
    };

    const handleBuildList = (list) => {
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <div key={index} className="ftRow">
                        <div className="ftCol ftLeft">
                            <span
                                className={
                                    item?.orderBuy
                                        ? "material-icons up"
                                        : "material-icons down"
                                }
                            >
                                forward
                            </span>

                            <div className="operation">
                                <div className="operationType">
                                    {item?.orderBuy
                                        ? i18next.t("Kupno")
                                        : i18next.t("Sprzedaż")}{" "}
                                    <span
                                        className={
                                            item?.orderBuy
                                                ? "operationAmount up"
                                                : "operationAmount down"
                                        }
                                    >
                                        {item?.amount}
                                    </span>{" "}
                                    {item?.orderBuy
                                        ? item?.orderBuy?.currencyPair
                                              ?.baseCurrency.shortName
                                        : item?.orderSell?.currencyPair
                                              ?.baseCurrency.shortName}
                                </div>
                                <div className="operationTime">
                                    {handleConverTimeToText(item?.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className="ftCol ftRight">
                            <div
                                className={
                                    item?.orderBuy
                                        ? "operationAmount down"
                                        : "operationAmount up"
                                }
                            >
                                {item?.orderBuy ? "-" : ""}
                                {item?.totalValue}{" "}
                                {item?.orderBuy
                                    ? item?.orderBuy?.currencyPair
                                          ?.quotedCurrency.shortName
                                    : item?.orderSell?.currencyPair
                                          ?.quotedCurrency.shortName}
                                {/* {item?.amount} */}
                            </div>
                        </div>
                    </div>
                );
            });
            if (dom) {
                setHistoryList(dom);
            }
        } else {
            setHistoryListError(true);
            setHistoryListErrorMsg(i18next.t("Brak wyników"));
        }

        setBoxPlaceholder(false);
    };

    const handleBuildCheckoutListList = (list) => {
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <div key={index} className="ftRow">
                        <div className="ftCol ftLeft">
                            <span
                                className={
                                    item?.typeName === "Buy"
                                        ? "material-icons up"
                                        : "material-icons down"
                                }
                            >
                                forward
                            </span>

                            <div className="operation">
                                <div className="operationType">
                                    {item?.typeName === "Buy"
                                        ? i18next.t("Kupno")
                                        : i18next.t("Sprzedaż")}{" "}
                                    <span
                                        className={
                                            item?.typeName === "Buy"
                                                ? "operationAmount up"
                                                : "operationAmount down"
                                        }
                                    >
                                        {item?.amount}
                                    </span>{" "}
                                    {item?.currencyPair?.baseCurrency.shortName}
                                </div>
                                <div className="operationTime">
                                    {handleConverTimeToText(item?.createdAt)}
                                </div>
                            </div>
                        </div>
                        <div className="ftCol ftRight">
                            <div
                                className={
                                    item?.typeName === "Buy"
                                        ? "operationAmount down"
                                        : "operationAmount up"
                                }
                            >
                                {item?.typeName === "Buy" ? "" : "-"}
                                {item?.totalPaymentValue}{" "}
                                {item?.currencyPair?.quotedCurrency.shortName}
                                {/* {item?.amount} */}
                            </div>
                        </div>
                    </div>
                );
            });
            if (dom) {
                setCheckoutOrdersHistoryList(dom);
            }
        } else {
            setCheckoutOrdersHistoryListError(true);
            setCheckoutOrdersHistoryListErrorMsg(i18next.t("Brak wyników"));
        }

        setBoxPlaceholder(false);
    };

    const getHistoryList = async (cancelToken) => {
        const response = await PostThis(
            "/api/users/me/trades?page=1&pageSize=5&sortType=0",
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
                // handleBuildList(exampleData);
                handleBuildList(response.data.result);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setHistoryListError(true);
                setHistoryListErrorMsg(i18next.t(response.data.message));
            }
        }
    };

    const handleGetCheckoutOrdersList = async (cancelToken) => {
        const response = await PostThis(
            "/api/users/me/checkout-orders?page=1&pageSize=5&sortType=0",
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
                // handleBuildList(exampleData);
                handleBuildCheckoutListList(
                    response.data.result,
                    "checkoutOrders"
                );
            } else if (response.status === 403) {
                user.logout();
            } else {
                setCheckoutOrdersHistoryListError(true);
                setCheckoutOrdersHistoryListErrorMsg(
                    i18next.t(response.data.message)
                );
            }
        }
    };

    //

    useEffect(() => {
        const source = axios.CancelToken.source();
        getHistoryList(source.token);
        handleGetCheckoutOrdersList(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <>
            <h3 className="title">{i18next.t("Historia")}</h3>
            <div className="tradesHistoryContent">
                <div className="tradesHistoryList">
                    <BoxPlaceholder
                        type={"line"}
                        count={5}
                        show={boxPlaceholder}
                    />
                    <p>
                        <strong>{i18next.t("Transakcje")}</strong>
                    </p>
                    <div className="flexTable">{checkoutOrdersHistoryList}</div>
                    {checkoutOrdersHistoryListError ? (
                        <Infobox
                            icon={checkoutOrdersHistoryListErrorType ?? "info"}
                        >
                            {i18next.t(checkoutOrdersHistoryListErrorMsg)}
                        </Infobox>
                    ) : (
                        ""
                    )}

                    <p>
                        <strong>{i18next.t("Transakcje z portfela")}</strong>
                    </p>
                    <div className="flexTable">{historyList}</div>
                    {historyListError ? (
                        <Infobox icon={historyListErrorType ?? "info"}>
                            {i18next.t(historyListErrorMsg)}
                        </Infobox>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </>
    );
};

export default TradesHistory;
