import React from "react";
import "./selectedCurrencyTooltip.scss";
import i18next from "i18next";

export const SelectedCurrencyTooltip = (props) => {
    if (typeof props.data === "undefined") {
        return <>...</>;
    }

    const { lotSizeMinQty, lotSizeMaxQty, tradePrecision } = props.data;
    console.log(props);

    if (props.type === "min") {
        return (
            <div className={`selectedCurrencyDetails ${props.type}`}>
                <div className={"desc"}>
                    {i18next.t("Minimalna ilość") + ":"}
                </div>
                <div className={"amount"}>
                    {parseFloat(lotSizeMinQty).toFixed(tradePrecision)}
                </div>
            </div>
        );
    } else {
        return (
            <div className={`selectedCurrencyDetails ${props.type}`}>
                <div className={"desc"}>
                    {i18next.t("Maksymalna ilość") + ":"}
                </div>
                <span className={"amount"}>
                    {parseFloat(lotSizeMaxQty).toFixed(tradePrecision)}
                </span>
            </div>
        );
    }
};
