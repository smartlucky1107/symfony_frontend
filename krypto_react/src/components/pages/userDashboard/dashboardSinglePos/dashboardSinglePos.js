import React, { useEffect, useState, useContext, useRef } from "react";
import i18next from "i18next";

import { UserContext } from "../../../user/userContext";
import { ModalControllerContext } from "../../../modals/modalControllerContext";

import "./dashboardSinglePos.scss";
import UserDashboard from "./../userDashboard";
import PostThis from "../../../../scripts/post";
import Loader from "../../../ui/loader/loader";
import BoxPlaceholder from "../../../ui/boxPlaceholder/boxPlaceholder";
import Button from "../../../ui/button/button";
import Infobox from "../../../ui/infobox/infobox";
import Tooltip from "../../../ui/tooltip/tooltip";
import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../ui/popup/popup";

import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../scripts/dateTransformations";

import DisableTransaction from "./disableTransaction/disableTransaction";

const DashboardSinglePos = () => {
    const user = useContext(UserContext);
    const modalController = useContext(ModalControllerContext);

    const [rowBoxPlaceholder, setRowBoxPlaceholder] = useState(true);

    const [posId, setPosId] = useState();
    const [smsPreloader, setSmsPreloader] = useState(false);
    const [showSmsMsg, setShowSmsMsg] = useState(false);
    const [smsStatus, setSmsStatus] = useState("warning");
    const [smsMsg, setSmsMsg] = useState();

    //Dane pracownika
    const [employeeName, setEmployeeName] = useState();
    const [employeeLastname, setEmployeeLastname] = useState();
    const [employeeId, setEmployeeId] = useState();

    // Dane transakcji
    const [transactionDate, setTransactionDate] = useState();
    const [phone, setPhone] = useState();
    const [amount, setAmount] = useState();
    const [initiationPrice, setInitiationPrice] = useState();
    // const [realOrderPrice, setRealOrderPrice] = useState();
    // const [realTradePrice, setRealTradePrice] = useState();
    const [status, setStatus] = useState();
    const [statusName, setStatusName] = useState();
    const [totalPrice, setTotalPrice] = useState();

    const popupRef = useRef(null);

    const handleGetPosData = async (id) => {
        const response = await PostThis(`/api/pos-orders/${id}`, "GET", "", {
            Authorization: "Bearer " + user.data.user?.authToken,
        });

        if (response) {
            // setTransactionDate();
            setRowBoxPlaceholder(false);
            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);
                setTransactionDate(response.data.createdAt);
                setEmployeeName(response.data.employee.firstName);
                setEmployeeLastname(response.data.employee.lastName);
                setEmployeeId(response.data.employee.id);
                setPhone(response.data.phone);
                setAmount(response.data.amount);
                setInitiationPrice(response.data.initiationPrice);
                // setRealOrderPrice(response.data.realOrderPrice);
                // setRealTradePrice(response.data.realTradePrice);
                setStatus(response.data.status);
                setStatusName(response.data.statusName);
                setTotalPrice(response.data.totalPrice);
            } else if (response.status === 403) {
                user.logout();
            } else {
                //Obsłużyć błąd pobierania danych transakcji pos
            }
        }
    };

    const handleDisableTransaction = () => {
        // modalController.showDemoVersionModal();
        // handleShowPopup()
        // Prace wstrzymane na polecenie CTO Task KRYPT-39
    };

    const handleSendSMS = async (e) => {
        // Nie ma endpointa do obsługi wysyłania ponownie sms z kryptowaluty.pl
        // e.preventDefault();
        setSmsPreloader(true);
        const response = await PostThis(
            `/api/users/me/pos/${posId}/resend`,
            "POST",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            // modalController.showDemoVersionModal();
            setSmsPreloader(false);
            if (response.status >= 200 && response.status < 300) {
                // setShowSmsMsg(true);
                // setSmsStatus("warning");
                // setSmsMsg(i18next.t("Wiadomość SMS została wysłana"));
            } else if (response.status === 403) {
                user.logout();
            } else {
                // setShowSmsMsg(true);
                // setSmsStatus("warning");
                // setSmsMsg(i18next.t(response.data.message));
            }
        }
    };

    useEffect(() => {
        const posId = document.location.pathname.split("/");
        setPosId(posId[posId.length - 1]);
        handleGetPosData(posId[posId.length - 1]);
    }, []);

    return (
        <UserDashboard>
            <section className="dashboardSinglePos preloaderWrapper">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Transakcja id")}: {posId}
                </h1>

                <div className="row rowBox">
                    <div className="col">
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
                        </div>
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
                    </div>
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
                                                {i18next.t("Telefon klienta")}
                                            </div>
                                            <div className="ftCol ftRight">
                                                {phone}
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
                {/* Disabled bo Łukasz Powiedział że nie może być zrobione Task KRYPT-41 */}
                {/* <div className="offsetTop ">
                    <div className="tooltipWrapper">
                        <Button
                            rightIcon="archive"
                            onClick={(e) => handleDisableTransaction()}
                        >
                            {i18next.t("Anuluj transakcję")}
                        </Button>
                        <Tooltip
                            text={i18next.t(
                                "Transakcja zostanie anulowana, a środki sprzedane po aktualnym kursie"
                            )}
                            side="bottom"
                        />
                    </div>
                </div> */}
                <div className="offsetTop">
                    <div className="tooltipWrapper preloaderWrapper">
                        {smsPreloader ? (
                            <Loader
                                absolute
                                label={i18next.t("Przetwarzanie")}
                            />
                        ) : (
                            ""
                        )}
                        {showSmsMsg ? (
                            <Infobox icon={"info"} type={smsStatus}>
                                {smsMsg}
                            </Infobox>
                        ) : (
                            ""
                        )}
                        {/* <Button
                            rightIcon="markunread_mailbox"
                            onClick={(e) => handleSendSMS()}
                        >
                            {i18next.t("Wyślij ponownie sms z potwierdzeniem")}
                        </Button>
                        <Tooltip
                            text={i18next.t(
                                "Wyślij sms z potwierdzeniem na podany przy zamówieniu numer"
                            )}
                            side="bottom"
                        /> */}
                    </div>
                </div>

                <Popup
                    handleClosePopup={() => handleClosePopup(popupRef)}
                    ref={popupRef}
                >
                    <DisableTransaction
                        totalPrice={totalPrice}
                        posId={posId}
                        handleClosePopup={handleClosePopup}
                        popupRef={popupRef}
                    />
                </Popup>
            </section>
        </UserDashboard>
    );
};

export default DashboardSinglePos;
