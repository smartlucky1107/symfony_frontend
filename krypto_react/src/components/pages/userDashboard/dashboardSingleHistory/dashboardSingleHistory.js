import React, { useEffect, useState, useContext } from "react";
import i18next from "i18next";

import { UserContext } from "../../../user/userContext";
import { ModalControllerContext } from "../../../modals/modalControllerContext";

import "./dashboardSingleHistory.scss";
import UserDashboard from "./../userDashboard";
import PostThis from "../../../../scripts/post";
import Loader from "../../../ui/loader/loader";
import BoxPlaceholder from "../../../ui/boxPlaceholder/boxPlaceholder";
import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../scripts/dateTransformations";

const DashboardSingleHistory = () => {
    const user = useContext(UserContext);
    const modalController = useContext(ModalControllerContext);

    const [rowBoxPlaceholder, setRowBoxPlaceholder] = useState(true);

    const [historyId, setHistoryId] = useState();

    //Dane pracownika
    const [employeeName, setEmployeeName] = useState();
    const [employeeLastname, setEmployeeLastname] = useState();
    const [employeeId, setEmployeeId] = useState();

    // Dane transakcji
    const [transactionDate, setTransactionDate] = useState();
    const [transactionTypeName, setTransactionTypeName] = useState();
    const [transactionCurrencyPair, setTransactionCurrencyPair] = useState();
    const [phone, setPhone] = useState();
    const [amount, setAmount] = useState();
    const [initiationPrice, setInitiationPrice] = useState();
    // const [realOrderPrice, setRealOrderPrice] = useState();
    // const [realTradePrice, setRealTradePrice] = useState();
    const [status, setStatus] = useState();
    const [statusName, setStatusName] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const handleGetHistoryData = async (id) => {
        const response = await PostThis(
            `/api/checkout-orders/${id}`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            // setTransactionDate();
            setRowBoxPlaceholder(false);
            if (response.status >= 200 && response.status < 300) {
                console.log(response.data.order);
                setTransactionDate(response.data.order.createdAt);

                setPhone(response.data.order.phone);
                setTransactionTypeName(response.data.order.typeName);
                setTransactionCurrencyPair(
                    response.data.order.currencyPair.pairShortName
                );
                setAmount(response.data.order.amount);
                setInitiationPrice(response.data.order.initiationPrice);
                // setRealOrderPrice(response.data.order.realOrderPrice);
                // setRealTradePrice(response.data.order.realTradePrice);
                setStatus(response.data.status);
                setStatusName(response.data.order.statusName);
                setTotalPrice(response.data.order.totalPaymentValue);
            } else if (response.status === 403) {
                user.logout();
            } else {
                //Obsłużyć błąd pobierania danych transakcji pos
            }
        }
    };

    // const handleConvertDateFormat = (date) => {
    //     // Przy zwracaniu timestamp
    //     // date = new Date(date * 1000);
    //     date = new Date(date);
    //     let dateDay = date.getDate();
    //     let dateMonth = date.getMonth() + 1;
    //     let dateYear = date.getFullYear();

    //     return `${dateDay < 10 ? `0${dateDay}` : dateDay}-${
    //         dateMonth < 10 ? `0${dateMonth}` : dateMonth
    //     }-${dateYear}`;
    // };
    // const handleConvertTimeFormat = (date) => {
    //     // Przy zwracaniu timestamp
    //     // date = new Date(date * 1000);
    //     date = new Date(date);
    //     let dateHour = date.getHours();
    //     let dateMin = date.getMinutes();
    //     return `${dateHour < 10 ? `0${dateHour}` : dateHour}:${
    //         dateMin < 10 ? `0${dateMin}` : dateMin
    //     }`;
    // };

    useEffect(() => {
        const historyIdUrl = document.location.pathname.split("/");

        setHistoryId(historyIdUrl[historyIdUrl.length - 1]);
        handleGetHistoryData(historyIdUrl[historyIdUrl.length - 1]);
    }, []);

    return (
        <UserDashboard>
            <section className="dashboardSinglePos preloaderWrapper">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Transakcja id")}: {historyId}
                </h1>

                <div className="row rowBox">
                    {/* <div className="col">
                        <div className="content">
                            <h3 className="title">
                                {i18next.t("Dane pracownika")}
                            </h3>
                            <div className="flexTable">
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Imię i nazwisko")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {employeeName}{" "}
                                                {employeeLastname}
                                            </div>
                                        </>
                                    )}
                                </div>

                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Id pracownika")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {employeeId}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div> */}
                    {/* <div className="content">
                            <h3 className="title">
                                {i18next.t("Dane workspace")}
                            </h3>
                            <div className="flexTable">
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Nazwa workspace")}
                                    </div>
                                    <div className="ftCol ftRight">name</div>
                                </div>
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Nazwa firmy")}
                                    </div>
                                    <div className="ftCol ftRight">
                                        companyName
                                    </div>
                                </div>
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Nip")}
                                    </div>
                                    <div className="ftCol ftRight">
                                        companyNip
                                    </div>
                                </div>
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Adres")}
                                    </div>
                                    <div className="ftCol ftRight">
                                        companyStreet
                                        <br />
                                        companyPostcode companyCity
                                        <br />
                                        companyCountry
                                    </div>
                                </div>
                            </div>
                        </div> */}
                    {/* </div> */}
                    <div className="col">
                        <div className="content">
                            <h3 className="title">
                                {i18next.t("Szczegóły transakcji")}
                            </h3>
                            <div className="flexTable">
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Rodzaj transakcji")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {i18next.t(transactionTypeName)}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Utworzono")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {handleConvertTimeFormat(
                                                    transactionDate
                                                )}{" "}
                                                {handleConvertDateFormat(
                                                    transactionDate
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Telefon klienta")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {phone}
                                            </div>
                                        </>
                                    )}
                                </div> */}
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Para zakupu")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {transactionCurrencyPair}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Ilość")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {amount}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t(
                                                    "Cena rozpoczęcia transakcji"
                                                )}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {initiationPrice}
                                            </div>
                                        </>
                                    )}
                                </div>
                                {/* <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Kurs zlecenia")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {realOrderPrice}
                                            </div>
                                        </>
                                    )}
                                </div> */}
                                {/* <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Kurs realizacji")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {realTradePrice}
                                            </div>
                                        </>
                                    )}
                                </div> */}
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t("Status Transakcji")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {status} {statusName}
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className="ftRow">
                                    {rowBoxPlaceholder ? (
                                        <BoxPlaceholder
                                            type="bpftRow"
                                            count={1}
                                            show={rowBoxPlaceholder}
                                        />
                                    ) : (
                                        <>
                                            <div className="ftCol ftLeft">
                                                {i18next.t(
                                                    "Całkowity koszt transakcji"
                                                )}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {totalPrice}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserDashboard>
    );
};

export default DashboardSingleHistory;
