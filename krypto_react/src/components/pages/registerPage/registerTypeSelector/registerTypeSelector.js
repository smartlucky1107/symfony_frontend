import React, { useContext } from "react";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import "./registerTypeSelector.scss";
import getRoute from "../../../routing/routingService";
// import {TransactionContext} from "../../../transaction/transactionContext";

const RegisterTypeSelector = (props) => {
    // const transaction = useContext(TransactionContext);

    return (
        <div className={"sidebar"}>
            <Button
                // to={getRoute("transactionBuy")}
                onClick={() => props.changeType(1)}
                active={props.active === 1 ? true : false}
                leftIcon={"person"}
            >
                {i18next.t("Konto indywidualne")}
            </Button>
            <Button
                // to={getRoute("transactionSell")}
                onClick={() => props.changeType(2)}
                active={props.active === 2 ? true : false}
                leftIcon={"business"}
            >
                {i18next.t("Konto firmowe")}
            </Button>
            {/*
            <Button
                to={getRoute('transactionExchange')}
                active={props.active === 3 ? true : false}
                leftIcon={'swap_horiz'}>
                {i18next.t('Wymień')}
            </Button>
            */}
        </div>
    );
};

export default RegisterTypeSelector;
