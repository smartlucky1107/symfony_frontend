import React, { useState, useContext } from "react";
import "./paymentcard.scss";
import i18next from "i18next";

import { UserContext } from "../../../../user/userContext";

import PostThis from "../../../../../scripts/post";

import Button from "../../../../ui/button/button";

import visaLogo from "../../../../../img/visa-logo-white.svg";
import mastercardLogo from "../../../../../img/mastercard-logo.svg";
import paymentCardChip from "../../../../../img/chip.png";

const Paymentcard = (props) => {
    const user = useContext(UserContext);
    const [cardNumber, setCardNumber] = useState(
        `${props.data.first6Digits}** **** ${props.data.last4Digits}`
    );
    const [cardResponse, setCardResponse] = useState(false);
    const [cardResponseMsg, setCardResponseMsg] = useState("");

    const handleRemoveCard = async () => {
        const response = await PostThis(
            `/api/users/me/payment-cards/${props.id}/disable`,
            "PATCH",
            { paymentCardId: props.id },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            ""
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setCardResponse(true);
                setCardResponseMsg(
                    i18next.t("Karta została poprawnie dezaktywowana")
                );
                setTimeout(() => {
                    props.handleGetPaymentcards();
                    setCardResponse(false);
                }, 3000);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setCardResponse(true);
                setCardResponseMsg(
                    i18next.t(response?.data?.message)
                    // "Wystąpił problem, proszę odświeżyć stronę i spróbować ponownie."
                );
            }
        }
        //
    };

    const handleActivateCard = async () => {
        const response = await PostThis(
            `/api/users/me/payment-cards/${props.id}/enable`,
            "PATCH",
            { paymentCardId: props.id },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            ""
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setCardResponse(true);
                setCardResponseMsg(
                    i18next.t("Karta została poprawnie aktywowana")
                );
                setTimeout(() => {
                    props.handleGetPaymentcards();
                    setCardResponse(false);
                }, 3000);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setCardResponse(true);
                setCardResponseMsg(
                    i18next.t(response?.data?.message)
                    // "Wystąpił problem, proszę odświeżyć stronę i spróbować ponownie."
                );
            }
        }
        //
    };

    return (
        <div className="col col-sm-6 ">
            <div
                className={
                    !props.data.enabled ? `paymentcard disabled` : `paymentcard`
                }
            >
                <div className="paymentcard-type">{props.cardType}</div>
                {!props.data.enabled ? (
                    <div className="disabledRibbon ">
                        <span>{i18next.t("Nie aktywna")}</span>
                    </div>
                ) : (
                    ""
                )}

                {cardResponse ? (
                    <div className="status ">{i18next.t(cardResponseMsg)}</div>
                ) : (
                    ""
                )}
                {props.status === "pending" ? (
                    <div className="status pending">
                        <div className="hourglass">
                            <span className="material-icons">
                                hourglass_full
                            </span>
                        </div>

                        <div className="">{i18next.t("Przetwarzanie")}</div>
                    </div>
                ) : (
                    ""
                )}

                {/* <div className="contactless-payment">
                    <span className="material-icons">wifi</span>
                </div> */}

                {!props.data.enabled ? (
                    <Button
                        // rightIcon="credit_card_on"
                        onClick={(e) => {
                            handleActivateCard(e);
                        }}
                    >
                        {i18next.t("Aktywuj kartę")}
                    </Button>
                ) : (
                    <Button
                        // rightIcon="highlight_off"
                        onClick={(e) => {
                            handleRemoveCard(e);
                        }}
                    >
                        {i18next.t("Dezaktywuj kartę")}
                    </Button>
                )}

                <div className="paymentcard-chip">
                    <img src={paymentCardChip} alt={""} />
                </div>
                <div className="paymentcard-number">{cardNumber}</div>
                <div className="paymentcard-owner">
                    {props?.data?.user?.firstName} {props?.data?.user?.lastName}
                </div>
                <div
                    className={
                        props.card === "VISA"
                            ? "paymentcard-logo visa"
                            : "paymentcard-logo"
                    }
                >
                    
                    {/* <img
                        src={props.card === "VISA" ? visaLogo : mastercardLogo}
                    /> */}
                </div>
            </div>
        </div>
    );
};

export default Paymentcard;
