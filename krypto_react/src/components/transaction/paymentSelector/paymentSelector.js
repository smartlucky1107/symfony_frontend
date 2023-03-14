import React, { useContext, useEffect, useRef, useState } from "react";

import "./paymentSelector.scss";
import PaymentMethod from "./paymentMethod/paymentMethod";
import { TransactionContext } from "../transactionContext";
import Infobox from "../../ui/infobox/infobox";
import i18next from "i18next";
import Button from "../../ui/button/button";
import PostThis from "../../../scripts/post";
import { UserContext } from "../../user/userContext";
import MySmallWallet from "../mySmallWallet/mySmallWallet";
import PaymentMethodLoader from "./paymentMethod/loader/paymentMethodLoader";
import Loader from "../../ui/loader/loader";
import getRoute from "../../routing/routingService";
import Oops from "../../../img/oops.svg";

const PaymentSelector = (props) => {
    const transaction = useContext(TransactionContext);
    const user = useContext(UserContext);
    const timeoutRef = useRef(null);
    const [preOrder, setPreOrder] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [paymentObject, setPaymentObject] = useState(null);
    const [processor, setProcessor] = useState(null);
    const [paymentUrl, setPaymentUrl] = useState(null);

    let buyOrSell = i18next.t("Kupujesz");
    let buyOrSellBool = 1;
    let preOrderAmount =
        transaction?.data[transaction?.data.transactionType + "IWantAmount"];
    let preOrderCurrencyPair =
        transaction?.data[transaction?.data.transactionType + "ActivePair"]
            .currencyPair.pairShortName;
    let iHaveAmount = transaction?.data.buyIHaveAmount;
    let iWantAmount = "";

    if (buyOrSell === "sell") {
        buyOrSell = i18next.t("Sprzedajesz");
        buyOrSellBool = 2;
    }

    if (transaction.data.buyLastActive === "buyIWant") {
        iWantAmount = transaction?.data.buyIWantAmount;
        iHaveAmount = "";
    }

    const handleBackButton = () => {
        transaction.reset();
    };

    const createPreOrder = async () => {
        const response = await PostThis(
            "/api/pre-order",
            "POST",
            {
                type: buyOrSellBool,
                amount: preOrderAmount,
                currencyPair: preOrderCurrencyPair,
            },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );
        if (response.status >= 200 && response.status < 300) {
            setPreOrder(response.data);
        } else {
            setPreOrder("error");
        }
        setLoading(false);
    };

    const startPayment = async (amount, processor, card = null) => {
        setProcessor(processor);

        const transactionType =
            transaction.data.transactionType === "buy" ? 1 : 2;
        if (processor?.id === 0) {
            try {
                let response = await PostThis(
                    "/api/orders",
                    "POST",
                    {
                        type: transactionType,
                        amount: amount,
                        currencyPairShortName:
                            transaction?.data.buyActivePair.currencyPair
                                .baseCurrency.shortName +
                            "-" +
                            transaction?.data.buyActivePair.currencyPair
                                .quotedCurrency.shortName,
                    },
                    {
                        Authorization: "Bearer " + user.data.user?.authToken,
                    }
                );

                if (response.status >= 200 && response.status < 300) {
                    window.location.href =
                        getRoute("transactionStatus") +
                        "/" +
                        response.data.order.id;
                } else {
                    setPaymentObject("error");
                    setProcessor(null);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            try {
                let response = await PostThis(
                    "/api/checkout-orders",
                    "POST",
                    {
                        type: transactionType,
                        amount: amount,
                        currencyPair:
                            transaction?.data.buyActivePair.currencyPair
                                .baseCurrency.shortName +
                            "-" +
                            transaction?.data.buyActivePair.currencyPair
                                .quotedCurrency.shortName,
                        paymentProcessor: processor.id,
                        card: card?.id,
                    },
                    {
                        Authorization: "Bearer " + user.data.user?.authToken,
                    }
                );

                if (response.status >= 200 && response.status < 300) {
                    redirectToPayment(response.data.order.id);
                    setPaymentObject(response.data);
                } else {
                    setPaymentObject("error");
                    setProcessor(null);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    const redirectToPayment = async (orderId) => {
        try {
            let response = await PostThis(
                `/api/checkout-orders/${orderId}/pay`,
                "PATCH",
                "",
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                }
            );
            if (response.status >= 200 && response.status < 300) {
                setPaymentUrl(response.data.paymentUrl);
                timeoutRef.current = setTimeout(() => {
                    window.location.href = response.data.paymentUrl;
                }, 5000);
            } else {
                setPaymentObject("error");
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        createPreOrder();

        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    const renderPaymentDetails = () => {
        return (
            <div className={"paymentDetails"}>
                <div className={"paymentDetailsHeader"}>
                    {i18next.t("Szczegóły transakcji")}
                </div>
                <div className={"paymentDetailsRow"}>
                    <div className={"paymentDetailsCol text-left"}>
                        {i18next.t("Kupujesz")}
                    </div>
                    <div className={"paymentDetailsCol text-right bold"}>
                        {paymentObject.order.amount}
                        <small>
                            {
                                paymentObject.order.currencyPair.baseCurrency
                                    .shortName
                            }
                        </small>
                    </div>
                </div>
                <div className={"paymentDetailsRow"}>
                    <div className={"paymentDetailsCol text-left"}>
                        {i18next.t("Do zapłaty")}
                    </div>
                    <div className={"paymentDetailsCol text-right bold"}>
                        {paymentObject.order.totalPaymentValue}
                        <small>
                            {
                                paymentObject.order.currencyPair.quotedCurrency
                                    .shortName
                            }
                        </small>
                    </div>
                </div>
                <div className={"paymentDetailsProcessor"}>
                    <div className={"paymentDetailsProcessorText"}>
                        {i18next.t("Płatność za pomocą")}
                    </div>
                    <img
                        src={
                            process.env.PUBLIC_URL +
                            "/assets/imgs/paymentMethods/" +
                            processor.name.replace(".", "_").toLowerCase() +
                            ".svg"
                        }
                    />
                </div>
            </div>
        );
    };

    if (paymentObject !== null) {
        if (paymentObject === "error") {
            return (
                <div className={"errorViewOops"}>
                    <div className={"errorImg"}>
                        <img src={Oops} alt={i18next.t("Wystąpił błąd...")} />
                    </div>
                    <div className={"error"}>
                        {i18next.t("Nie można utworzyć płatności.")}
                        <br />
                        {i18next.t("Odśwież stronę i spróbuj ponownie.")}
                    </div>
                    <div className={"btns"}>
                        <Button to={getRoute("contact")} leftIcon={"email"}>
                            {i18next.t("Zgłoś kontakt")}
                        </Button>
                        <Button
                            blue
                            onClick={() => transaction.reset()}
                            leftIcon={"cached"}
                        >
                            {i18next.t("Spróbuj ponownie")}
                        </Button>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"paymentStarted"}>
                    <div className={"paymentMainText"}>
                        <strong>
                            {i18next.t("Zlecenie zostało przyjęte.")}
                        </strong>
                        <br />
                        {i18next.t(
                            "Za chwilę zostaniesz przekierowany do płatności."
                        )}
                    </div>
                    {renderPaymentDetails()}
                    <div className={"paymentRedirectBox"}>
                        <div className={"paymentRedirectBoxText"}>
                            {i18next.t(
                                "Jeśli nie zostałeś przekierowany po upływie 5 sekund - użyj przycisku do natychmiastowego przekierowania."
                            )}
                        </div>
                        <div className={"paymentRedirectBoxBar"}>
                            <div
                                className={"paymentRedirectBoxBarInside"}
                            ></div>
                        </div>
                        <div className={"paymentRedirectBoxBtns"}>
                            <Button href={paymentUrl ?? "#"}>
                                {i18next.t("Przejdź do płatności")}
                            </Button>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <div className={`paymentSelector`}>
            <div className={"transactionDetails"}>
                <Button onClick={handleBackButton} className={"smallBackBtn"}>
                    <span className="material-icons">keyboard_backspace</span>
                </Button>
                <div className={"transactionInfo"}>
                    {
                        buyOrSell +
                            " " +
                            /*iWantAmount*/ transaction?.data.buyIWantAmount +
                            " " +
                            transaction?.data.buyActivePair.currencyPair
                                .baseCurrency
                                .shortName /* + ' ' +
                        i18next.t('za') + ' ' +
                        iHaveAmount + ' ' +
                        transaction?.data.buyActivePair.currencyPair.quotedCurrency.shortName*/
                    }
                </div>
            </div>

            <Infobox icon={"payment"}>
                {i18next.t(
                    "Poniżej wyświetlona jest lista dostępnych metod płatności, wybierz interesującą Cię opcję."
                )}
            </Infobox>

            {!isLoading ? (
                <>
                    {preOrder?.plannedOrders?.map((item, key) => {
                        let enabledByMinMax =
                            parseFloat(item.totalPaymentValue) >=
                                parseFloat(
                                    item?.paymentProcessor?.minPayment
                                ) &&
                            parseFloat(item.totalPaymentValue) <=
                                parseFloat(item?.paymentProcessor?.maxPayment);
                        return (
                            <PaymentMethod
                                {...item}
                                key={key}
                                enabled={item?.paymentProcessor?.enabled}
                                totalPrice={item.totalPaymentValue}
                                minPrice={item?.paymentProcessor?.minPayment}
                                maxPrice={item?.paymentProcessor?.maxPayment}
                                enabledByMinMax={enabledByMinMax}
                                productCurrency={
                                    transaction?.data.buyActivePair.currencyPair
                                        .baseCurrency
                                }
                                priceCurrency={
                                    transaction?.data.buyActivePair.currencyPair
                                        .quotedCurrency
                                }
                                startPayment={startPayment}
                                startedProcessorId={processor?.id}
                            />
                        );
                    })}

                    {preOrder?.marketOrder && (
                        <PaymentMethod
                            internal
                            enabled={true}
                            wallet={preOrder?.wallet}
                            amount={preOrder?.marketOrder?.amount}
                            totalPrice={preOrder?.marketOrder?.totalPrice}
                            paymentProcessor={0}
                            productCurrency={
                                transaction?.data.buyActivePair.currencyPair
                                    .baseCurrency
                            }
                            priceCurrency={
                                transaction?.data.buyActivePair.currencyPair
                                    .quotedCurrency
                            }
                            startPayment={startPayment}
                            startedProcessorId={processor?.id}
                        />
                    )}
                </>
            ) : (
                <>
                    <PaymentMethodLoader internal />
                    <PaymentMethodLoader />
                    <PaymentMethodLoader />
                    <PaymentMethodLoader />
                </>
            )}
        </div>
    );
};

export default PaymentSelector;
