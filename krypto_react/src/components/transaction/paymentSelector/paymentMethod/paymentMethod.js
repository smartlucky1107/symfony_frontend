import React, { useContext, useEffect, useState } from "react";

import "./paymentMethod.scss";
import "./cardSelector/cardSelector.scss";
import "./enabledByMinMax/enabledByMinMax.scss";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import { TransactionContext } from "../../transactionContext";
import MySmallWallet from "../../mySmallWallet/mySmallWallet";
import FeeImg from "./../../../../img/fee.svg";
import Tooltip from "../../../ui/tooltip/tooltip";
import { ModalControllerContext } from "../../../modals/modalControllerContext";
import PostThis from "../../../../scripts/post";
import { UserContext } from "../../../user/userContext";
import getRoute from "../../../routing/routingService";
import Select from "../../../ui/select/select";
import Loader from "../../../ui/loader/loader";

import VisaProvider from "../../../../img/paymentMethods/paymentCards/visa-logo.jpg";
import MasterProvider from "../../../../img/mastercard-logo.svg";

const PaymentMethod = (props) => {
    let cardsMock = [
        {
            id: "visa-123",
            type: "visa",
            number: "33 1221 **** **** **** 0192",
        },
        {
            id: "master-345",
            type: "master",
            number: "20 1717 **** **** **** 1515",
        },
    ];

    cardsMock = [];

    const transaction = useContext(TransactionContext);
    const user = useContext(UserContext);
    const modalController = useContext(ModalControllerContext);
    const [cards, setCards] = useState([]);
    const [activeCard, setActiveCard] = useState("loading");
    let productValue = parseFloat(props?.amount).toFixed(8);
    let priceValue = parseFloat(props?.totalPrice).toFixed(2);

    /*if(transaction.data.buyLastActive === 'buyIWant'){
        priceValue = props?.amount;
        productValue = props?.totalPrice;
    }*/

    let paymentProcessorName = "";
    let paymentProcessorFee = "";
    let paymentProcessorStarted = null;
    if (props.paymentProcessor !== 0) {
        paymentProcessorName = props.paymentProcessor.name;
        paymentProcessorFee = props.paymentProcessor.fee + "%";
        if (typeof props.startedProcessorId !== "undefined") {
            if (props.startedProcessorId === props.paymentProcessor.id) {
                paymentProcessorStarted = "startedLoading";
            } else {
                paymentProcessorStarted = "startedDisabled";
            }
        }
    } else {
        paymentProcessorName = "kryptowaluty.pl";
        //paymentProcessorStarted = 0;
        if (typeof props.startedProcessorId !== "undefined") {
            if (props.startedProcessorId === 0) {
                paymentProcessorStarted = "startedLoading";
            } else {
                paymentProcessorStarted = "startedDisabled";
            }
        }
    }

    const handleClickEvent = async () => {
        console.log(props);
        if (
            props?.enabled !== false &&
            paymentProcessorStarted === null &&
            checkIfUserHasEnoughCurrency() &&
            props?.enabledByMinMax !== false
        ) {
            if (props.paymentProcessor === 0) {
                console.log("idzie ok");
                props.startPayment(props?.amount, {
                    id: 0,
                    name: "kryptowaluty.pl",
                });
            } else {
                if (props.paymentProcessor.id === 1) {
                    if (props.paymentProcessor.id === 1 && cards.length > 0) {
                        props.startPayment(
                            props?.amount,
                            props?.paymentProcessor,
                            activeCard
                        );
                    }
                } else {
                    props.startPayment(props?.amount, props?.paymentProcessor);
                }
            }
        }
    };
    useEffect(() => {
        if (props.paymentProcessor.id === 1) {
            getCards();
        }
        console.log(props);
    }, []);
    const getCards = async () => {
        const response = await PostThis(
            "/api/users/me/payment-cards",
            "GET",
            "",
            { Authorization: "Bearer " + user.data.user?.authToken }
        );
        if (response.status >= 200 && response.status < 300) {
            setCards(response.data.cards);
            setActiveCard(response.data.cards[0]);
        } else {
            setCards([]);
            setActiveCard(null);
        }
    };
    const onChangeActiveCard = (element) => {
        console.log(element);
        setActiveCard(element);
    };
    const renderCards = () => {
        if (
            props.paymentProcessor.id === 1 &&
            props?.enabledByMinMax !== false
        ) {
            return (
                <div className={"cardSelector"}>
                    <div className={"cardSelectorHeader"}>
                        {i18next.t("Wybierz kartę do realizacji transakcji")}
                    </div>
                    {activeCard === "loading" ? (
                        <Loader />
                    ) : cards.length === 0 ? (
                        <div className={"addCard"}>
                            <Button
                                leftIcon={"add"}
                                to={getRoute("userDashboardPaymentcards")}
                            >
                                {i18next.t("Dodaj kartę")}
                            </Button>
                        </div>
                    ) : (
                        <Select
                            cardOptions={cards}
                            activeElement={activeCard}
                            onChangeActiveElement={onChangeActiveCard}
                        />
                    )}
                </div>
            );
        }
    };

    const renderWallet = () => {
        if (props?.internal) {
            return (
                <MySmallWallet
                    freeAmount={props?.wallet?.freeAmount}
                    currencyShortName={
                        transaction?.data.buyActivePair.currencyPair
                            .quotedCurrency.shortName
                    }
                    currencyFullName={
                        transaction?.data.buyActivePair.currencyPair
                            .quotedCurrency.fullName
                    }
                />
            );
        }
    };

    const checkIfUserHasEnoughCurrency = () => {
        if (props?.internal) {
            if (
                parseFloat(props?.wallet?.freeAmount) <
                parseFloat(props?.totalPrice)
            ) {
                return false;
            } else {
                return true;
            }
        }

        return true;
    };

    const renderNoCardAdded = () => {
        return (
            <div className={"notEnoughCurrency"}>
                <div className={"info"}>
                    <div className={"currencyAmountInfo"}>
                        <div className={"text"}>
                            {i18next.t(
                                "Dodaj kartę by użyć tej metody płatności"
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderNotEnoughCurrency = () => {
        let neededCurrencyAmount = parseFloat(
            parseFloat(props?.totalPrice) -
                parseFloat(props?.wallet?.freeAmount)
        ).toFixed(2);

        if (props?.internal) {
            return (
                <div className={"notEnoughCurrency"}>
                    <div className={"info"}>
                        <div className={"infoText"}>
                            {i18next.t("Niewystarczające środki")}
                        </div>
                        <div className={"currencyAmountInfo"}>
                            <div className={"text"}>
                                {i18next.t("Brakuje jeszcze")}
                            </div>
                            <div className={"amount"}>
                                {neededCurrencyAmount}
                                <small>
                                    {
                                        transaction?.data.buyActivePair
                                            .currencyPair.quotedCurrency
                                            .shortName
                                    }
                                </small>
                            </div>
                        </div>
                    </div>

                    <div className={"btns"}>
                        <Button
                            to={
                                getRoute("userDashboardWallets") +
                                "/" +
                                transaction?.data.buyActivePair.currencyPair
                                    .quotedCurrency.shortName +
                                "?deposit"
                            }
                            rightIcon={"add"}
                        >
                            {i18next.t("Dodaj środki")}
                        </Button>
                    </div>
                </div>
            );
        }
    };

    const renderEnabledByMinMax = () => {
        if (props?.enabledByMinMax === false) {
            return (
                <div className={"enabledByMinMax"}>
                    <div className={"enabledByMinMaxText"}>
                        {i18next.t("Nieobsługiwana kwota transakcji")}
                    </div>
                    <div className={"enabledByMinMaxValues"}>
                        <div className={"valuesText"}>
                            {i18next.t("Dozwolona kwota transakcji to")}
                        </div>
                        <div className={"values"}>
                            {props?.minPrice + " - " + props?.maxPrice}
                            <span>{props?.priceCurrency.shortName}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div
            className={`
        paymentMethodWrapper 
        ${props?.paymentProcessor?.id === 1 ? "highlight" : ""}
        ${props?.internal ? "internal" : ""}
        ${paymentProcessorStarted ?? ""}
        `}
        >
            <div
                className={`
        paymentMethod 
        ${props?.enabled === false ? "disabled" : ""}
        `}
                onClick={() => handleClickEvent()}
            >
                <div className={"leftColumn"}>
                    <div className={"paymentProcessor"}>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/assets/imgs/paymentMethods/" +
                                paymentProcessorName
                                    .replace(".", "_")
                                    .replace("/", "_")
                                    .toLowerCase() +
                                ".svg"
                            }
                        />
                        <div className={"payWith"}>
                            {i18next.t("Zapłać z") + " " + paymentProcessorName}
                        </div>

                        {props?.paymentProcessor?.id === 1 ? (
                            <div className={"availableCardProviders"}>
                                <div className={"availableCardProvider"}>
                                    <img src={VisaProvider} alt={"Visa"} />
                                </div>
                                <div className={"availableCardProvider"}>
                                    <img
                                        src={MasterProvider}
                                        alt={"Master Card"}
                                    />
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                {props?.enabled === false ? (
                    <div className={"notAvailable"}>
                        <div className={"inner"}>
                            {i18next.t("Dostępne wkrótce")}
                        </div>
                    </div>
                ) : props?.enabledByMinMax !== false ? (
                    <>
                        <div className={"middleColumn"}>
                            <div className={"productTagLabel"}>
                                {i18next.t("Otrzymasz")}:
                            </div>
                            <div className={"productTag"}>
                                {productValue}{" "}
                                {props?.productCurrency.shortName}
                            </div>
                            <div className={"priceTagLabel"}>
                                {i18next.t("Zapłacisz")}
                                {props?.paymentProcessor === 0
                                    ? " " + i18next.t("około")
                                    : null}
                                :
                            </div>
                            <div className={"priceTag"}>
                                <div className={"tooltipWrapper"}>
                                    {priceValue}{" "}
                                    {props?.priceCurrency.shortName}
                                    {paymentProcessorFee !== "" ? (
                                        <>
                                            <div className={"feeTag"}>
                                                <div className={"feeLabel"}>
                                                    {
                                                        /*paymentProcessorFee*/ "*"
                                                    }
                                                </div>
                                            </div>
                                            <Tooltip
                                                text={`${i18next.t(
                                                    "Różnica w kursie zależy od wybranej metody płatności"
                                                )} (${paymentProcessorFee})`}
                                                side="bottom"
                                            />
                                        </>
                                    ) : (
                                        ""
                                    )}
                                </div>

                                {props?.internal ? (
                                    <div className="tooltipWrapper depositInfo">
                                        <span class="material-icons">
                                            help_outline
                                        </span>
                                        <Tooltip
                                            text={i18next.t(
                                                "W pierwszej kolejności wykorzystane będą środki depozytowe"
                                            )}
                                            side="bottom"
                                        />
                                    </div>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>

                        <div className={"rightColumn"}>
                            {paymentProcessorStarted === "startedLoading" ? (
                                <div className={"loading"}>
                                    <div className={"loadingCircle"}></div>
                                </div>
                            ) : checkIfUserHasEnoughCurrency() ? (
                                (props.paymentProcessor.id === 1 &&
                                    cards.length > 0) ||
                                props.paymentProcessor.id !== 1 ? (
                                    <>
                                        <Button blue>
                                            {i18next.t("Kup teraz")}
                                        </Button>
                                    </>
                                ) : (
                                    renderNoCardAdded()
                                )
                            ) : (
                                renderNotEnoughCurrency()
                            )}
                        </div>
                    </>
                ) : (
                    renderEnabledByMinMax()
                )}
            </div>

            {renderWallet()}
            {renderCards()}
        </div>
    );
};

export default PaymentMethod;
