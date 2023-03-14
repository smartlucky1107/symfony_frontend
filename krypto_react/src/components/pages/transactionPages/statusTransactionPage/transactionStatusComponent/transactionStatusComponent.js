import React, { useContext, useEffect, useRef, useState } from "react";
import "./transactionStatusComponent.scss";
import { UserContext } from "../../../../user/userContext";
import PostThis from "../../../../../scripts/post";
import i18next from "i18next";
import Button from "../../../../ui/button/button";
import getRoute from "../../../../routing/routingService";
import Loader from "../../../../ui/loader/loader";
import Oops from "../../../../../img/oops.svg";
import { TimerBar } from "../../../../ui/timerBar/timerBar";
import { LoadingBarSection } from "../loadingBarSection/loadingBarSection";

const TransactionStatusComponent = (props) => {
    const user = useContext(UserContext);
    const [transactionType, setTransactionType] = useState(null);
    const [transactionStatus, setTransactionStatus] = useState(null);
    const checkTransactionStatusInterval = useRef(null);
    const [ticker, setTicker] = useState(true);

    const getMarketOrderPrice = async () => {
        try {
            const response = await PostThis(
                `/api/orders/${props.transactionId}/trades`,
                "GET",
                "",
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                }
            );
            if (response.status >= 200 && response.status < 300) {
                return response?.data?.value;
            } else {
                console.warn(response);
            }
        } catch (error) {
            console.warn(error);
        }
    };

    const updateTransactionStatusPrice = (price) => {
        setTransactionStatus((prevData) => {
            return {
                ...prevData,
                order: {
                    ...prevData.order,
                    totalPaymentValue: price,
                },
            };
        });
    };

    const checkInternalTransactionStatus = async (
        previousTotalPaymentValue
    ) => {
        console.log("checkInternalTransactionStatus idzie");
        setTicker(true);
        let response = await PostThis(
            `/api/orders/${props.transactionId}`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response.status >= 200 && response.status < 300) {
            setTransactionType("internal");
            if (transactionStatus?.message === undefined) {
                setTransactionStatus({
                    ...response.data,
                    order: {
                        ...response.data.order,
                        totalPaymentValue: previousTotalPaymentValue,
                    },
                });
            } else {
                console.log("internal ustawia czyste response data");
                setTransactionStatus(response.data);
            }

            if (response.data.order.status >= 3) {
                clearInterval(checkTransactionStatusInterval.current);
            }

            return true;
        } else {
            if (response.status === 404) {
                setTransactionStatus({
                    message: i18next.t(
                        "Nie znaleziono transakcji o podanym ID"
                    ),
                });
                setTransactionType("error");
            } else {
                setTransactionStatus(response.data);
                setTransactionType("error");
            }
            return false;
        }
    };

    const checkExternalTransactionStatus = async () => {
        setTicker(true);
        let response = await PostThis(
            `/api/checkout-orders/${props.transactionId}`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response.status >= 200 && response.status < 300) {
            setTransactionStatus(response.data);
            setTransactionType("external");
            return true;
        } else {
            if (response?.data?.message) {
                setTransactionStatus(response.data);
            } else {
                setTransactionStatus({
                    message: i18next.t(
                        "Wystąpił nieznany błąd. Sprawdź swoje połączenie z internetem, a w przypadku wielokrotnego występowania błędu prosimy o kontakt ze wsparciem technicznym."
                    ),
                });
            }
            return false;
        }
    };

    useEffect(() => {
        (async () => {
            const result = await checkExternalTransactionStatus();
            if (result === false) {
                const internalResult = await checkInternalTransactionStatus();
                if (internalResult === true) {
                    const marketPrice = await getMarketOrderPrice();
                    updateTransactionStatusPrice(marketPrice);

                    if (checkTransactionStatusInterval.current === null) {
                        console.log("interwał internal startuje");
                        checkTransactionStatusInterval.current = setInterval(
                            () => {
                                setTicker(false);
                                checkInternalTransactionStatus(marketPrice);
                            },
                            10000
                        );
                    }
                }
            } else {
                if (checkTransactionStatusInterval.current === null) {
                    checkTransactionStatusInterval.current = setInterval(() => {
                        setTicker(false);
                        checkExternalTransactionStatus();
                    }, 10000);
                }
            }
        })();

        return () => {
            clearInterval(checkTransactionStatusInterval.current);
        };
    }, []);

    useEffect(() => {
        console.log("ticker", ticker);
    }, [ticker]);

    if (transactionType === "external") {
        return (
            <ExternalTransactionStatusComponent
                transactionStatus={transactionStatus}
                transactionId={props?.transactionId}
                returnButton={props?.returnButton}
                ticker={ticker}
            />
        );
    } else if (transactionType === "internal") {
        return (
            <InternalTransactionStatusComponent
                transactionStatus={transactionStatus}
                transactionId={props?.transactionId}
                returnButton={props?.returnButton}
                ticker={ticker}
            />
        );
    } else if (transactionType === "error") {
        return (
            <InternalTransactionStatusComponent
                transactionStatus={transactionStatus}
                transactionId={props?.transactionId}
                returnButton={props?.returnButton}
                ticker={ticker}
            />
        );
    } else if (transactionType === null) {
        return <Loader />;
    }
};

const ExternalTransactionStatusComponent = (props) => {
    //return <Redirect to={getRoute('main')}/>

    const renderTransactionStatus = () => {
        let transactionTypeName =
            props?.transactionStatus?.order?.type === 1
                ? i18next.t("Kupiłeś")
                : i18next.t("Sprzedałeś");
        let transactionTypePayment =
            props?.transactionStatus?.order?.type === 1
                ? i18next.t("Do zapłaty")
                : i18next.t("Otrzymasz");

        let transactionDate = new Date(
            props?.transactionStatus?.order?.createdAt
        ).toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        let transactionTime = new Date(
            props?.transactionStatus?.order?.createdAt
        ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        if (props?.transactionStatus === null) {
            return (
                <div className={"loaderBox"}>
                    <div className={"loadingCircle"}></div>
                </div>
            );
        }
        if (props?.transactionStatus?.message) {
            return (
                <div className={"errorViewOops"}>
                    <div className={"errorImg"}>
                        <img src={Oops} alt={i18next.t("Wystąpił błąd...")} />
                    </div>
                    <div className={"error"}>
                        {props?.transactionStatus.message}
                    </div>
                    <div className={"btns"}>
                        <Button to={getRoute("contact")} leftIcon={"email"}>
                            {i18next.t("Zgłoś kontakt")}
                        </Button>
                        <Button
                            blue
                            to={getRoute("transactionBuy")}
                            leftIcon={"cached"}
                        >
                            {i18next.t("Spróbuj ponownie")}
                        </Button>
                    </div>
                </div>
            );
        }
        if (props?.transactionStatus?.order) {
            return (
                <div className={"statusDetails"}>
                    <TransactionStatusViewer
                        status={props?.transactionStatus.order.status}
                    />
                    <div className={"detailsTable"}>
                        <div className={"detailsTableHeader"}>
                            {i18next.t("Szczegóły transakcji")}
                        </div>

                        <div className={"statusDetailsRow"}>
                            <div className={"text-left"}>
                                {i18next.t("Data transakcji")}
                            </div>
                            <div className={"text-right"}>
                                {transactionDate} <span>{transactionTime}</span>
                            </div>
                        </div>

                        <div className={"statusDetailsRow"}>
                            <div className={"text-left"}>
                                {transactionTypeName}
                            </div>
                            <div className={"text-right"}>
                                {props?.transactionStatus.order.amount}
                                <small>
                                    {
                                        props?.transactionStatus.order
                                            .currencyPair.baseCurrency.shortName
                                    }
                                </small>
                            </div>
                        </div>

                        <div className={"statusDetailsRow"}>
                            <div className={"text-left"}>
                                {transactionTypePayment}
                            </div>
                            <div className={"text-right"}>
                                {
                                    props?.transactionStatus.order
                                        .totalPaymentValue
                                }
                                <small>
                                    {
                                        props?.transactionStatus.order
                                            .currencyPair.quotedCurrency
                                            .shortName
                                    }
                                </small>
                            </div>
                        </div>

                        <div className={"transactionId"}>
                            <div className={"infoText"}>
                                {i18next.t("Numer transakcji")}
                            </div>
                            <div className={"idHash"}>
                                {props?.transactionStatus?.order?.id}
                            </div>
                        </div>
                    </div>

                    {props?.transactionStatus?.order?.status === 100 ||
                    props?.transactionStatus?.order?.status === 2 ? null : (
                        <LoadingBarSection ticker={props?.ticker} />
                    )}

                    {props?.returnButton === true ? (
                        <TransactionStatusButtons />
                    ) : null}
                </div>
            );
        }
    };

    return (
        <div className={"transactionStatusComponent"}>
            {renderTransactionStatus()}
        </div>
    );
};

const InternalTransactionStatusComponent = (props) => {
    const renderTransactionStatus = () => {
        let transactionTypeName =
            props?.transactionStatus?.order?.type === 1
                ? i18next.t("Kupiłeś")
                : i18next.t("Sprzedałeś");
        let transactionTypePayment =
            props?.transactionStatus?.order?.type === 1
                ? i18next.t("Kwota transakcji")
                : i18next.t("Otrzymasz około");

        let transactionDate = new Date(
            props?.transactionStatus?.order?.createdAt
        ).toLocaleDateString([], {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });

        let transactionTime = new Date(
            props?.transactionStatus?.order?.createdAt
        ).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });

        if (props?.transactionStatus === null) {
            return (
                <div className={"loaderBox"}>
                    <div className={"loadingCircle"}></div>
                </div>
            );
        }
        if (props?.transactionStatus?.message) {
            return (
                <div className={"error"}>
                    {props?.transactionStatus.message}
                </div>
            );
        }
        if (props?.transactionStatus?.order) {
            return (
                <div className={"statusDetails"}>
                    <InternalTransactionStatusViewer
                        status={props?.transactionStatus.order.status}
                    />
                    <div className={"detailsTable"}>
                        <div className={"detailsTableHeader"}>
                            {i18next.t("Szczegóły transakcji")}
                        </div>

                        <div className={"statusDetailsRow"}>
                            <div className={"text-left"}>
                                {i18next.t("Data transakcji")}
                            </div>
                            <div className={"text-right"}>
                                {transactionDate} <span>{transactionTime}</span>
                            </div>
                        </div>

                        <div className={"statusDetailsRow"}>
                            <div className={"text-left"}>
                                {transactionTypeName}
                            </div>
                            <div className={"text-right"}>
                                {props?.transactionStatus.order.amount}
                                <small>
                                    {
                                        props?.transactionStatus.order
                                            .currencyPair.baseCurrency.shortName
                                    }
                                </small>
                            </div>
                        </div>

                        <div className={"statusDetailsRow"}>
                            <div className={"text-left"}>
                                {transactionTypePayment}
                            </div>
                            <div className={"text-right"}>
                                {
                                    props?.transactionStatus?.order
                                        ?.totalPaymentValue
                                }
                                <small>
                                    {
                                        props?.transactionStatus.order
                                            .currencyPair.quotedCurrency
                                            .shortName
                                    }
                                </small>
                            </div>
                        </div>

                        <div className={"transactionId"}>
                            <div className={"infoText"}>
                                {i18next.t("Numer transakcji")}
                            </div>
                            <div className={"idHash"}>
                                {props?.transactionStatus?.order?.id}
                            </div>
                        </div>
                    </div>
                    {props?.transactionStatus.order.status < 3 ? (
                        <LoadingBarSection ticker={props?.ticker} />
                    ) : null}

                    {props?.returnButton === true ? (
                        <TransactionStatusButtons />
                    ) : null}
                </div>
            );
        }
    };

    return (
        <div className={"transactionStatusComponent"}>
            {renderTransactionStatus()}
        </div>
    );
};

const TransactionStatusViewer = (props) => {
    const renderStatusBox = () => {
        switch (props.status) {
            case 1:
                return (
                    <div className={"statusBoxView paymentCreated"}>
                        {i18next.t("Utworzono zlecenie płatności")}
                    </div>
                );
                break;

            case 2:
                return (
                    <div className={"statusBoxView rejected"}>
                        {i18next.t("Odrzucona")}
                    </div>
                );
                break;

            case 3:
                return (
                    <div className={"statusBoxView paymentPending"}>
                        {i18next.t("Przetwarzanie zlecenia płatności")}
                    </div>
                );
                break;
            case 4:
                return (
                    <div className={"statusBoxView paymentPending"}>
                        {i18next.t("Oczekuje na wpłatę")}
                    </div>
                );
                break;
            case 5:
                return (
                    <div className={"statusBoxView paymentProcessing"}>
                        {i18next.t("Przetwarzanie płatności")}
                    </div>
                );
                break;
            case 6:
                return (
                    <div className={"statusBoxView paymentBooked"}>
                        {i18next.t(
                            "Płatność zaksięgowana, rozpoczęto przetwarzanie transakcji"
                        )}
                    </div>
                );
                break;

            case 7:
                return (
                    <div className={"statusBoxView paymentBooked"}>
                        {i18next.t(
                            "Płatność zaksięgowana, rozpoczęto przetwarzanie transakcji"
                        )}
                    </div>
                );
                break;

            case 8:
                return (
                    <div className={"statusBoxView paymentBooked"}>
                        {i18next.t(
                            "Płatność zaksięgowana, rozpoczęto przetwarzanie transakcji"
                        )}
                    </div>
                );
                break;

            case 100:
                return (
                    <div className={"statusBoxView approved"}>
                        {i18next.t("Zakończona sukcesem")}
                    </div>
                );
                break;

            default:
                return (
                    <div className={"statusBoxView paymentPending"}>
                        {i18next.t("Przetwarzanie i realizacja zamówienia")}
                    </div>
                );
        }
    };
    return <div className={"transactionStatusViewer"}>{renderStatusBox()}</div>;
};

const InternalTransactionStatusViewer = (props) => {
    const renderStatusBox = () => {
        switch (props.status) {
            case 1:
                return (
                    <div className={"statusBoxView paymentCreated"}>
                        {i18next.t("Utworzono transakcję")}
                    </div>
                );
                break;
            case 2:
                return (
                    <div className={"statusBoxView paymentPending"}>
                        {i18next.t("Przetwarzanie transakcji")}
                    </div>
                );
                break;
            case 3:
                return (
                    <div className={"statusBoxView approved"}>
                        {i18next.t("Zakończona sukcesem")}
                    </div>
                );
                break;
            case 4:
                return (
                    <div className={"statusBoxView rejected"}>
                        {i18next.t("Anulowana")}
                    </div>
                );
                break;

            case 5:
                return (
                    <div className={"statusBoxView rejected"}>
                        {i18next.t("Odrzucona")}
                    </div>
                );
                break;

            default:
                return (
                    <div className={"statusBoxView paymentPending"}>
                        {i18next.t("Przetwarzanie i realizacja zamówienia")}
                    </div>
                );
        }
    };
    return <div className={"transactionStatusViewer"}>{renderStatusBox()}</div>;
};

const TransactionStatusButtons = () => {
    return (
        <div className={"btns"}>
            <Button
                leftIcon={"account_circle"}
                big
                to={getRoute("userDashboardWelcome")}
            >
                {i18next.t("Moje konto")}
            </Button>
            <Button
                leftIcon={"add_shopping_cart"}
                blue
                big
                to={getRoute("transactionBuy")}
            >
                {i18next.t("Kup ponownie")}
            </Button>
        </div>
    );
};

export default TransactionStatusComponent;
