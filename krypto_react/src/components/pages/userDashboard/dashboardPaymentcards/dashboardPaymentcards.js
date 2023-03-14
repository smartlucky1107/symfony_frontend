import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import i18next from "i18next";
import "./dashboardPaymentcards.scss";
import carddemo from "../../../../img/carddemo.jpg"
import UserDashboard from "./../userDashboard";
import { UserContext } from "../../../user/userContext";

import PostThis from "../../../../scripts/post";
import { handleConvertDateFormat } from "../../../../scripts/dateTransformations";

import Paymentcard from "./paymentcard/paymentcard";

import Button from "../../../ui/button/button";
import BoxPlaceholder from "../../../ui/boxPlaceholder/boxPlaceholder";
import Infobox from "../../../ui/infobox/infobox";
import CustomList from "../../../ui/customList/customList";
import { CustomListItem } from "../../../ui/customList/customList";
import cardImg from "../../../../img/card.svg";
import paymentCardChip from "../../../../img/chip.png"

const DashboardPaymentcards = () => {
    const user = useContext(UserContext);
    const [paymentcardDomList, setPaymentcardDomList] = useState();
    const [paymentcardDomListError, setPaymentcardDomListError] = useState(
        false
    );
    const [
        paymentcardDomListErrorType,
        setPaymentcardDomListErrorType,
    ] = useState("error");
    const [
        paymentcardDomListErrorMsg,
        setPaymentcardDomListErrorMsg,
    ] = useState();
    const [
        paymentcardPendingDomList,
        setPaymentcardPendingDomList,
    ] = useState();
    const [
        paymentcardPendingListError,
        setPaymentcardPendingListError,
    ] = useState(false);
    const [
        paymentcardPendingListErrorType,
        setPaymentcardPendingListErrorType,
    ] = useState("error");
    const [
        paymentcardPendingListErrorMsg,
        setPaymentcardPendingListErrorMsg,
    ] = useState();

    const [boxPlaceholder, setBoxPlaceholder] = useState();

    const [paymentcardRegisterError, setPaymentcardRegisterError] = useState(
        false
    );
    const [
        paymentcardRegisterErrorMsg,
        setPaymentcardRegisterErrorMsg,
    ] = useState();

    const handleAddNewCard = async () => {
        const response = await PostThis(
            `/api/users/me/payment-cards`,
            "POST",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            ""
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                window.location.href = response.data.redirectUrl;
            } else if (response.status === 403) {
                user.logout();
            } else {
                setPaymentcardRegisterError(true);
                setPaymentcardRegisterErrorMsg(response?.data?.message);
            }
        }
    };

    const handleGetPaymentcards = async (cancelToken) => {
        setPaymentcardDomListError(false);
        const response = await PostThis(
            "/api/users/me/payment-cards",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            cancelToken
        );

        // handleBuildList(fakePaymentCards);
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                handleBuildList(response.data.cards);
                if (response.data?.cards.length === 0) {
                    setPaymentcardDomListError(true);
                    setPaymentcardDomListErrorType("info");
                    setPaymentcardDomListErrorMsg(
                        i18next.t("Brak aktywnych kart")
                    );
                }
            } else if (response.status === 403) {
                user.logout();
            } else {
                setPaymentcardDomListError(true);
                setPaymentcardDomListErrorType("error");
                setPaymentcardDomListErrorMsg(i18next.t(response?.message));
            }
        }
    };

    const handleGetPaymentcardsRegistrations = async (cancelToken) => {
        setPaymentcardPendingListError(false);
        const response = await PostThis(
            "/api/users/me/payment-cards-registrations",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            cancelToken
        );

        // handleBuildPendingList(fakePaymentCardsPendingList);
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                handleBuildPendingList(response.data.registrations);
                if (response.data?.registrations.length === 0) {
                    setPaymentcardPendingListError(true);
                    setPaymentcardPendingListErrorType("info");
                    setPaymentcardPendingListErrorMsg(
                        i18next.t("Brak oczekujących")
                    );
                }
            } else if (response.status === 403) {
                user.logout();
            } else {
                setPaymentcardPendingListError(true);

                setPaymentcardPendingListErrorMsg(i18next.t(response.message));
            }
        }
    };

    const handleBuildList = (arrayList) => {
        if (arrayList && arrayList.length > 0) {
            const list = arrayList.map((item, index) => {
                console.log(item);
                return (
                    <Paymentcard
                        key={index}
                        id={item.id}
                        card={item.binCard}
                        cardType={item.binType}
                        data={item}
                        status={item.status}
                        handleGetPaymentcards={handleGetPaymentcards}
                    />
                );
            });

            if (list) {
                setPaymentcardDomList(list);
                setBoxPlaceholder(false);
            }
        } else {
            setBoxPlaceholder(false);
        }
    };

    const handleBuildPendingList = (arrayList) => {
        if (arrayList && arrayList.length > 0) {
            const list = arrayList.map((item, index) => {
                return (
                    <CustomListItem key={index} id={item.id} data={item}>
                        {/* <div className="customListItemCol icon warning">
                            <span className="material-icons">
                                hourglass_full
                            </span>
                        </div> */}
                        <div className="customListItemCol time">
                        <img className ="imgsize" src={carddemo}></img>
                        </div>
                        <div className="customListItemCol date">
                            {handleConvertDateFormat(item?.createdAt)}
                        </div>
                        <div className="customListItemCol number">
                            **** **** {item?.last4Digits}
                            {/* {item?.last4Digits} */}
                        </div>

                        <div className="customListItemCol status">
                            {item.status}
                        </div>
                    </CustomListItem>
                );
            });
            if (list) {
                setPaymentcardPendingDomList(list);
                setBoxPlaceholder(false);
            }
        } else {
            setBoxPlaceholder(false);
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        handleGetPaymentcardsRegistrations();
        handleGetPaymentcards(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    useEffect(() => {}, [paymentcardDomList]);

    return (
        <UserDashboard>
            <section className="dashboardPaymentcards">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Karty płatnicze")}
                </h1>

                <div className="bg-w">
                    <div className="row rowBox dashboardIntroduce">
                        <div className="col col-xl-9">
                            <p>
                                {i18next.t(
                                    "Dokonaj zakupu kryptowalut za pomocą karty płatniczej!  W panelu poniżej możesz podejrzeć aktywne karty, dodać nowe przyciskiem “Dodaj nową kartę” lub je dezaktywować. Status kart znajdziesz w menu 'Karty oczekujące' po prawej stronie."
                                )}
                            </p>
                        </div>
                        <div className="col col-xl-3 contentImg">
                            <img src={cardImg} alt="" />
                        </div>
                    </div>

                    <Button
                        rightIcon="add"
                        onClick={(e) => {
                            handleAddNewCard(e);
                        }}
                    >
                        {i18next.t("Dodaj nową kartę")}
                    </Button>

                    {paymentcardRegisterError ? (
                        <Infobox type={"error"} icon={"sync_problem"}>
                            {paymentcardRegisterErrorMsg}
                        </Infobox>
                    ) : (
                        ""
                    )}

                    <div className="paymentcards-list">
                        <div className="row rowBox">
                            <div className="col col-xl-12">
                                <h3>{i18next.t("Karty aktywne")}</h3>
        <div className="row rowBox"> 
        <div className="col col-xl-8">
                                {/* <h3>{i18next.t("Karty aktywne")}</h3> */}
                                {paymentcardDomListError ? (
                                    <Infobox
                                        type={paymentcardDomListErrorType}
                                        icon={
                                            paymentcardDomListErrorType ===
                                            "error"
                                                ? "sync_problem"
                                                : "info"
                                        }
                                    >
                                        {paymentcardDomListErrorMsg}
                                    </Infobox>
                                ) : (
                                    ""
                                )}
                                <div className="row rowBox">
                                    {boxPlaceholder ? (
                                        <>
                                            <BoxPlaceholder
                                                type="box"
                                                count={1}
                                                show={boxPlaceholder}
                                            />

                                            <BoxPlaceholder
                                                type="box"
                                                count={1}
                                                show={boxPlaceholder}
                                            />
                                        </>
                                    ) : (
                                        ""
                                    )}

                                    {paymentcardDomList
                                        ? paymentcardDomList
                                        : ""}
                                </div>
                            </div>              
            {/* <div className="col col-xl-6">
                <div className="cstCard">
                   <div className="toppart">
                    <h3>Credit Card</h3><h4>Bank Name</h4>
                   </div>
                   <div className="paymentcard-chip">
                    <img src={paymentCardChip} alt={""} />
                </div>
                   <div className="degits"><h3>1234 &nbsp; 5678  &nbsp; 9012  &nbsp; 3456</h3><small>0123</small></div>
                   <div className="bottompart">
                    <h3>Name Surname</h3>
                    <div className="expirecard"><div className="w-60"><small>VALID THRU </small></div><h5>01/80</h5></div>
                   </div>
                </div>
              </div> */}
              {/* <div className="col col-xl-6">
              <div className="cstCard">
              <div className="toppart">
                    <h3>Credit Card</h3><h4>Bank Name</h4>
                   </div>
                   <div className="paymentcard-chip">
                    <img src={paymentCardChip} alt={""} />
                </div>
                   <div className="degits"><h3>1234 &nbsp; 5678  &nbsp; 9012  &nbsp; 3456</h3><small>0123</small></div>
                   <div className="bottompart">
                    <h3>Name Surname</h3>
                    <div className="expirecard"><div className="w-60"><small>VALID THRU </small></div><h5>01/80</h5></div>
                   </div>
              </div>
           </div> */}
           <div className="col col-xl-6">
             <div className="dashBox">
                 <p>{i18next.t("Dodaj nowq karte")}+</p>
              </div>
           </div>

        </div>

{/* old */}

                                {/* {paymentcardDomListError ? (
                                    <Infobox
                                        type={paymentcardDomListErrorType}
                                        icon={
                                            paymentcardDomListErrorType ===
                                            "error"
                                                ? "sync_problem"
                                                : "info"
                                        }
                                    >
                                        {paymentcardDomListErrorMsg}
                                    </Infobox>
                                ) : (
                                    ""
                                )}
                                <div className="row rowBox">
                                    {boxPlaceholder ? (
                                        <>
                                            <BoxPlaceholder
                                                type="box"
                                                count={1}
                                                show={boxPlaceholder}
                                            />

                                            <BoxPlaceholder
                                                type="box"
                                                count={1}
                                                show={boxPlaceholder}
                                            />
                                        </>
                                    ) : (
                                        ""
                                    )}

                                    {paymentcardDomList
                                        ? paymentcardDomList
                                        : ""}
                                </div> */}


                            </div>

                            <div className="col col-xl-12 mt-1">
                                <h3>{i18next.t("Karty oczekujące")}</h3>
                                {paymentcardPendingListError ? (
                                    <Infobox
                                        type={paymentcardPendingListErrorType}
                                        icon={
                                            paymentcardPendingListErrorType ===
                                            "error"
                                                ? "sync_problem"
                                                : "info"
                                        }
                                    >
                                        {paymentcardPendingListErrorMsg}
                                    </Infobox>
                                ) : (
                                    ""
                                )}
                                {paymentcardPendingDomList ? (
                                    <>
                                        <CustomList>
                                            <div className="customListHeader">
                                                {/* <div className="customListItemCol icon"></div> */}
                                                
                                                <div className="customListItemCol time">
                                                    {i18next.t("karta")}
                                                </div>
                                                <div className="customListItemCol date">
                                                    {i18next.t("Data")}
                                                </div>
                                                <div className="customListItemCol number">
                                                    {i18next.t("Numer")}
                                                </div>

                                                <div className="customListItemCol status">
                                                    {i18next.t("Status")}
                                                </div>
                                            </div>
                                            {paymentcardPendingDomList}
                                        </CustomList>
                                    </>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </UserDashboard>
    );
};

export default DashboardPaymentcards;
