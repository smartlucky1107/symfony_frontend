import React, { useEffect, useState } from "react";
import i18next from "i18next";
import "./sellDetails.scss";
import Infobox from "../../../ui/infobox/infobox";
import Button from "../../../ui/button/button";
import Tooltip from "../../../ui/tooltip/tooltip";
import MySmallWallet from "../../mySmallWallet/mySmallWallet";
import Loader from "../../../ui/loader/loader";

const SellDetails = (props) => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleSellSubmit = async () => {
        if (error === null) {
            setLoading(true);
            let response = await props.onSubmit();
            if (response) {
                //setLoading(false);
            }
        }
    };

    const hasEnoughCurrency = () => {
        console.log("odpala hasEnoughCurrency");
        const freeAmount = props?.preOrder?.wallet?.freeAmount;
        const totalToPay = props?.preOrder?.marketOrder?.amount;
        if (freeAmount) {
            console.log("odpala ifa w hasEnoughCurrency");
            console.log(freeAmount + " >= " + totalToPay);
            if (parseFloat(freeAmount) >= parseFloat(totalToPay)) {
                return true;
            }
        }
        return false;
    };

    useEffect(() => {
        if (hasEnoughCurrency()) {
            setError(null);
        } else {
            setError(i18next.t("Brak wystarczających środków, doładuj konto."));
        }
    }, [
        props?.preOrder?.wallet?.freeAmount,
        props?.preOrder?.marketOrder?.totalPrice,
    ]);

    if (isLoading) {
        return <Loader />;
    }
    return (
        <div className={"sellDetailsContent"}>
            <div className={"sellDetailsWrapper"}>
                <div className={"sellDetailsInfo"}>
                    <div className={"paymentProcessor"}>
                        <img
                            src={
                                process.env.PUBLIC_URL +
                                "/assets/imgs/paymentMethods/kryptowaluty_pl.svg"
                            }
                        />
                    </div>
                    <div className={"paymentDetails"}>
                        <div className={"productTagLabel"}>
                            {i18next.t("Otrzymasz około")}:
                        </div>
                        <div className={"productTag"}>
                            {props?.preOrder?.marketOrder?.totalPrice + " "}
                            {
                                props?.preOrder?.currencyPair?.quotedCurrency
                                    ?.shortName
                            }
                        </div>
                        <div className={"priceTagLabel"}>
                            {i18next.t("Zapłacisz")}:
                        </div>
                        <div className={"priceTag"}>
                            {props?.preOrder?.marketOrder?.amount + " "}
                            {
                                props?.preOrder?.currencyPair?.baseCurrency
                                    ?.shortName
                            }
                        </div>
                    </div>
                </div>
                <MySmallWallet
                    freeAmount={props?.preOrder?.wallet?.freeAmount}
                    currencyShortName={
                        props?.preOrder?.currencyPair?.baseCurrency?.shortName
                    }
                    currencyFullName={
                        props?.preOrder?.currencyPair?.baseCurrency?.fullName
                    }
                />
            </div>
            {error ? (
                <Infobox icon={"toll"} type={"error"}>
                    {error}
                </Infobox>
            ) : null}
            <Button
                blue
                big
                onClick={handleSellSubmit}
                disabled={hasEnoughCurrency() ? false : true}
            >
                {i18next.t("Sprzedaj") +
                    " " +
                    props?.preOrder?.currencyPair?.baseCurrency?.shortName}
            </Button>
        </div>
    );
};

export default SellDetails;
