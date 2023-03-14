import React, { useContext } from "react";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import "./transactionTypeSelector.scss";
import getRoute from "../../../routing/routingService";
import { TransactionContext } from "../../../transaction/transactionContext";

const TransactionTypeSelector = (props) => {
    const transaction = useContext(TransactionContext);

    return (
        <div className={"sidebar"}>
            <Button
                to={getRoute("transactionBuy")}
                onClick={() => transaction.reset()}
                active={props.active === 1 ? true : false}
                leftIcon={"add_shopping_cart"}
            >
                {i18next.t("Kup")}
            </Button>
            <Button
                to={getRoute("transactionSell")}
                onClick={() => transaction.reset()}
                active={props.active === 2 ? true : false}
                leftIcon={"monetization_on"}
            >
                {i18next.t("Sprzedaj")}
            </Button>
            {/*
            <Button
                to={getRoute('transactionExchange')}
                active={props.active === 3 ? true : false}
                leftIcon={'swap_horiz'}>
                {i18next.t("Wymień")}
            </Button>
            */}
        </div>
    );
};

export default TransactionTypeSelector;
