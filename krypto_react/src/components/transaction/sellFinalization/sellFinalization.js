import React, { useContext, useEffect, useState } from "react";
import "./sellFinalization.scss";
import Button from "../../ui/button/button";
import { TransactionContext } from "../transactionContext";
import i18next from "i18next";
import SellDetails from "./sellDetails/sellDetails";
import PostThis from "../../../scripts/post";
import { UserContext } from "../../user/userContext";
import { ModalControllerContext } from "../../modals/modalControllerContext";
import Infobox from "../../ui/infobox/infobox";
import SellDetailsLoader from "./sellDetails/loader/sellDetailsLoader";
import getRoute from "../../routing/routingService";
import Oops from "../../../img/oops.svg";

const SellFinalization = () => {
    const transaction = useContext(TransactionContext);
    const modalController = useContext(ModalControllerContext);
    const user = useContext(UserContext);
    const [isLoading, setLoading] = useState(true);
    const [preOrder, setPreOrder] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        createPreOrder();
    }, []);

    const createPreOrder = async () => {
        const response = await PostThis(
            "/api/pre-order",
            "POST",
            {
                type: 2,
                amount: transaction.data.sellIHaveAmount,
                currencyPair:
                    transaction.data.sellActivePair.currencyPair.pairShortName,
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

    const handleBackButton = () => {
        transaction.reset();
    };

    const handleSubmitSell = async () => {
        let response = await PostThis(
            "/api/orders",
            "POST",
            {
                type: 2,
                amount: transaction.data.sellIHaveAmount,
                currencyPairShortName:
                    transaction?.data.sellActivePair.currencyPair.pairShortName,
            },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response.status >= 200 && response.status < 300) {
            return (window.location.href =
                getRoute("transactionStatus") + "/" + response.data.order.id);
        } else {
            setError(response?.data?.message);
            return false;
        }
    };

    if (preOrder === "error" || error) {
        return (
            <div className={"errorViewOops"}>
                <div className={"errorImg"}>
                    <img src={Oops} alt={i18next.t("Wystąpił błąd...")} />
                </div>
                <div className={"error"}>{error}</div>
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
    }
    return (
        <div className={"sellFinalization"}>
            <div className={"transactionDetails"}>
                <Button onClick={handleBackButton} className={"smallBackBtn"}>
                    <span className="material-icons">keyboard_backspace</span>
                </Button>
                <div className={"transactionInfo"}>
                    {
                        i18next.t("Sprzedajesz") +
                            " " +
                            transaction?.data.sellIHaveAmount +
                            " " +
                            transaction?.data.sellActivePair.currencyPair
                                .baseCurrency
                                .shortName /* +
                    ' ' + i18next.t('za') + ' ' +
                    transaction?.data.sellIWantAmount + ' ' +
                    transaction?.data.sellActivePair.currencyPair.quotedCurrency.shortName*/
                    }
                </div>
            </div>
            <div className={"sellDetails"}>
                <Infobox icon={"report_problem"}>
                    {i18next.t(
                        "Sprawdź poniższe szczegóły dokonywanej transakcji i zatwierdź sprzedaż by kontynuować."
                    )}
                </Infobox>
                {!isLoading ? (
                    <SellDetails
                        preOrder={preOrder}
                        onSubmit={handleSubmitSell}
                    />
                ) : (
                    <SellDetailsLoader />
                )}
            </div>
        </div>
    );
};

export default SellFinalization;
