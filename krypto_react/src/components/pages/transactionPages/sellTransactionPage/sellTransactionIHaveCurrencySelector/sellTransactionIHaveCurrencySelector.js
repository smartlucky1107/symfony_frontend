import React, { useContext, useEffect, useState } from "react";
import "./sellTransactionIHaveCurrencySelector.scss";
import "./currencyOption/currencyOption.scss";
import PostThis from "../../../../../scripts/post";
import { UserContext } from "../../../../user/userContext";
import Loader from "../../../../ui/loader/loader";
import getRoute from "../../../../routing/routingService";
import { TransactionContext } from "../../../../transaction/transactionContext";
import i18next from "i18next";
import Button from "../../../../ui/button/button";

export const SellTransactionIHaveCurrencySelector = ({
    sellActivePair,
    sellPairList,
    onChangeCurrency,
    visible,
    isPendingRequest,
}) => {
    const [walletList, setWalletList] = useState(null);
    const [
        currencyListWithFreeAmount,
        setCurrencyListWithFreeAmount,
    ] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const user = useContext(UserContext);

    const getWalletList = async () => {
        const response = await PostThis(
            "/api/users/me/wallets?pageSize=0",
            "GET",
            "",
            {
                Authorization: `Bearer ${user.data.user?.authToken}`,
            },
            null
        );
        if (response.status >= 200 && response.status < 300) {
            setWalletList(response.data.result);
        } else {
            return new Error("Wallets list cannot be fetched");
        }
    };

    const getCurrencyListWithFreeAmount = (wallets, currencyPairs) => {
        console.log(wallets);
        console.log(currencyPairs);
        let currencyPairsArray = currencyPairs;
        for (let i = 0; i < wallets.length; i++) {
            currencyPairsArray.find((cryptoPair, key) => {
                const cryptoPairShortName =
                    cryptoPair.currencyPair.baseCurrency.shortName;
                const walletShortName = wallets[i].currency.shortName;
                const walletFreeAmount = wallets[i].freeAmount;

                if (cryptoPairShortName === walletShortName) {
                    currencyPairsArray[key].freeAmount = walletFreeAmount;
                }
            });
        }
        return currencyPairsArray;
    };

    const handleShowMore = (e) => {
        e.preventDefault();
        setShowMore(!showMore);
    };

    useEffect(() => {
        getWalletList();
    }, []);

    useEffect(() => {
        if (sellPairList.length > 0 && walletList !== null) {
            setCurrencyListWithFreeAmount(
                getCurrencyListWithFreeAmount(walletList, sellPairList)
            );
        }
    }, [sellPairList, walletList]);

    if (currencyListWithFreeAmount !== null) {
        console.log(sellActivePair);
        return (
            <div
                className={`
            sellTransactionIHaveCurrencySelectorWrapper 
            ${visible ? "" : "hide"}
            `}
            >
                <div
                    className={`
                    sellTransactionIHaveCurrencySelector 
                    ${showMore ? "showMore" : ""}
                    `}
                >
                    {isPendingRequest() ? (
                        <div className={"pendingRequest"}>
                            <Loader />
                        </div>
                    ) : null}
                    <div
                        className={"sellTransactionIHaveCurrencySelectorLabel"}
                    >
                        {i18next.t("Dostępne środki") + ":"}
                    </div>
                    {currencyListWithFreeAmount.map((item, key) => {
                        let isActive = false;
                        if (
                            sellActivePair.currencyPair.baseCurrency
                                .shortName ===
                            item.currencyPair.baseCurrency.shortName
                        ) {
                            isActive = true;
                        }
                        return (
                            <CurrencyOption
                                isActive={isActive}
                                data={item}
                                key={key}
                                onChangeCurrency={onChangeCurrency}
                            />
                        );
                    })}
                </div>
                {currencyListWithFreeAmount.length > 3 ? (
                    <Button
                        small
                        rightIcon={"more_horiz"}
                        onClick={handleShowMore}
                    >
                        {showMore ? (
                            <>{i18next.t("Pokaż mniej")}</>
                        ) : (
                            <>{i18next.t("Pokaż więcej")}</>
                        )}
                    </Button>
                ) : null}
            </div>
        );
    } else {
        return (
            <div
                className={`
            sellTransactionIHaveCurrencySelectorWrapper 
            ${visible ? "" : "hide"}
            `}
            >
                <Loader />
            </div>
        );
    }
};

const CurrencyOption = ({ data, onChangeCurrency, isActive }) => {
    return (
        <div
            className={`currencyOption ${isActive ? "active" : ""}`}
            onClick={() => onChangeCurrency("sellIWant", data)}
        >
            <div className={"currencyIcon"}>
                <img
                    src={`${getRoute("assets/currencies")}${
                        data.currencyPair.baseCurrency.shortName
                    }.svg`}
                    alt={data.currencyPair.baseCurrency.fullName}
                />
            </div>
            <div className={"currencyFullName"}>
                {data.currencyPair.baseCurrency.fullName}
            </div>
            <div className={"currencyFreeAmount"}>{data.freeAmount}</div>
            <div className={"currencyShortName"}>
                {data.currencyPair.baseCurrency.shortName}
            </div>
        </div>
    );
};
