import React, { useContext, useEffect, useState } from "react";
import "./initialSellContainer.scss";
import "./topSmallNavigation.scss";
import Input from "../../ui/input/input";
import i18next from "i18next";
import Select from "../../ui/select/select";
import Button from "../../ui/button/button";
import getRoute from "../../routing/routingService";
import { TransactionContext } from "../transactionContext";
import { SelectedCurrencyTooltip } from "../selectedCurrencyTooltip/selectedCurrencyTooltip";
import { ModuleUnderMaintennace } from "../../ui/moduleUnderMaintenance/moduleUnderMaintenance";
import { TimerBar } from "../../ui/timerBar/timerBar";
// import SellImg from "../../../img/sell.svg";
import SellImg from "../../../img/sell.png";
import { TransactionDescription } from "../../pages/transactionPages/transactionDescription/transactionDescription";
import { SellTransactionIHaveCurrencySelector } from "../../pages/transactionPages/sellTransactionPage/sellTransactionIHaveCurrencySelector/sellTransactionIHaveCurrencySelector";
import { UserContext } from "../../user/userContext";
import { AppContext } from "../../appContext";
import { SellPercentageAmountSelector } from "./sellPercentageAmountSelector/sellPercentageAmountSelector";

const InitialSellContainer = (props) => {
    const transaction = useContext(TransactionContext);
    const user = useContext(UserContext);
    const app = useContext(AppContext);
    const [ready, setReady] = useState(false);
    const [debounce, setDebounce] = useState(false);

    const {
        sellIWantCurrencyList,
        sellIHaveCurrencyList,
        currencyList,
        sellActivePair,
    } = transaction.data;

    const hasEnoughCurrency = () => {
        const freeAmount = transaction.data?.sellActivePair?.freeAmount;
        const iHaveAmount = transaction.data.sellIHaveAmount;

        if (freeAmount) {
            if (parseFloat(freeAmount) >= iHaveAmount) {
                return true;
            }
        }
        return false;
    };

    const isReadyToProceed = () => {
        if (
            transaction.data.sellIHaveLoading ||
            transaction.data.sellIWantLoading ||
            transaction.data.sellIHaveValid !== true ||
            transaction.data.sellIWantAmount === null ||
            (hasEnoughCurrency() === false && props.isHomepage !== true)
        ) {
            if (user.data.isLoggedIn === true) {
                return false;
            } else {
                return true;
            }
        }

        return true;
    };

    const onChangeCurrency = (iHaveORiWant, currencyObject) => {
        if (transaction.isPendingRequest() === false) {
            transaction.stopRefreshingPrices();
            const iWantCurrencyList = transaction.getSellIWantCurrencyList(
                currencyObject
            );
            setDebounce(true);
            transaction.update({
                sellLastActive: iHaveORiWant,
                sellActivePair: currencyObject,
                sellIHaveAmount: parseFloat("0.01").toFixed(
                    currencyObject.currencyPair.baseCurrency.roundPrecision
                ),
                ...iWantCurrencyList,
            });
        }
    };

    const onChangeAmount = (iHaveORiWant, value) => {
        transaction.update({
            [iHaveORiWant + "Amount"]: value,
            sellLastActive: iHaveORiWant,
        });
    };

    const setPercentageAmountFromWallet = (percent) => {
        const freeAmount = transaction.data?.sellActivePair?.freeAmount;
        const percentageValue = parseFloat(freeAmount) * (percent / 100);
        const roundedPercentageValue = parseFloat(
            percentageValue.toFixed(
                transaction.data?.sellActivePair?.currencyPair?.baseCurrency
                    ?.roundPrecision
            )
        );

        transaction.update({
            sellIHaveAmount: roundedPercentageValue,
        });
    };

    const onSellButtonClick = (e) => {
        e.preventDefault();
        if (isReadyToProceed()) {
            transaction.update({
                sellTransactionStep: transaction.data.sellTransactionStep + 1,
            });

            if (props.isHomepage) {
                props.history.push(getRoute("transactionSell"));
            }
        }
    };

    useEffect(() => {
        transaction.update({
            initialBaseCurrency: props.match?.params?.baseCurrency ?? "",
            initialQuotedCurrency: props.match?.params?.quotedCurrency ?? "",
            transactionType: "sell",
            transactionComponentMounted: true,
        });
    }, []);

    useEffect(() => {
        console.log(`%c${isReadyToProceed()}`, "color: red");
        console.log(transaction.data?.sellActivePair?.freeAmount);
    }, [transaction.data.sellIHaveAmount, transaction.data?.sellActivePair]);

    useEffect(() => {
        /*
        if(debounce === true){
            setTimeout(() => {
                setDebounce(false);
            }, 1000);
        }
         */
    }, [debounce]);

    if (app.data.tradingDisabled) {
        return <ModuleUnderMaintennace trading />;
    }
    if (transaction.data.maintenance) {
        return <ModuleUnderMaintennace />;
    }
    return (
        <form
            onSubmit={onSellButtonClick}
            className={`sellStep1 ${
                props.isHomepage ? "homepageTransaction" : ""
            }`}
        >
            {!props.isHomepage ? (
                <TransactionDescription
                    text={i18next.t(
                        "Sprzedawaj kryptowaluty za złotówki! Wpisz ilość kryptowalut, jaką pragniesz sprzedać. Pamiętaj, że środki do sprzedaży muszą znajdować się w Twoim portfelu."
                    )}
                    img={SellImg}
                />
            ) : null}

            {!props.isHomepage && user.data.isLoggedIn === true ? (
                <SellTransactionIHaveCurrencySelector
                    sellActivePair={transaction.data.sellActivePair}
                    sellPairList={transaction.data.sellIHaveCurrencyList}
                    onChangeCurrency={onChangeCurrency}
                    isPendingRequest={transaction.isPendingRequest}
                    visible={!props.isHomepage}
                />
            ) : null}

            <Input
                id={"sellIHave"}
                numeric={true}
                precision={
                    transaction.data?.sellActivePair?.currencyPair.baseCurrency
                        .roundPrecision
                }
                label={i18next.t("Sprzedam")}
                afterLabel={
                    !props.isHomepage && user.data.isLoggedIn === true ? (
                        <SellPercentageAmountSelector
                            updatePercentage={setPercentageAmountFromWallet}
                            active={
                                transaction.data?.sellActivePair?.freeAmount > 0
                            }
                        />
                    ) : null
                }
                fontSize={"big"}
                fontWeight={"700"}
                value={transaction.data?.sellIHaveAmount ?? ""}
                onChange={onChangeAmount}
                autocomplete={false}
                loading={transaction.data?.sellIHaveLoading}
                minMax={transaction.data?.sellIHaveValid}
                minMaxComponent={
                    <SelectedCurrencyTooltip
                        data={transaction.data?.sellActivePair?.currencyPair}
                        type={transaction.data?.sellIHaveValid}
                    />
                }
            >
                <Select
                    inputSelect
                    activeElement={
                        transaction.data?.sellActivePair?.currencyPair
                            .baseCurrency ?? ""
                    }
                    onChangeActiveElement={onChangeCurrency}
                    className={"sellBuySelect iWant"}
                    optionsAlign={"right"}
                    currencyOptions={sellIHaveCurrencyList ?? []}
                />
            </Input>

            <Input
                id={"sellIWant"}
                label={i18next.t("Otrzymam około")}
                fontSize={"big"}
                fontWeight={"700"}
                value={transaction.data?.sellIWantAmount ?? ""}
                onChange={onChangeAmount}
                loading={transaction.data?.sellIWantLoading}
                disabled
            >
                <Select
                    inputSelect
                    activeElement={
                        transaction.data?.sellActivePair?.currencyPair
                            .quotedCurrency ?? ""
                    }
                    onChangeActiveElement={onChangeCurrency}
                    className={"sellBuySelect iHave"}
                    optionsAlign={"right"}
                    currencyOptions={sellIWantCurrencyList}
                />
            </Input>
            {/*props.isHomepage ?
                <Button type={'submit'} to={getRoute('transactionBuy')} blue rightIcon={'add_shopping_cart'}>{i18next.t('Kup') + ' '}{transaction.data?.buyActivePair?.currencyPair.baseCurrency.shortName ?? '-'}</Button>
            :
                <Button type={'submit'} blue big>{i18next.t('Kup') + ' '}{transaction.data?.buyActivePair?.currencyPair.baseCurrency.shortName ?? '-'}</Button>
            */}
            <TimerBar
                time={5}
                ticker={transaction?.data?.requestTicker}
                label={i18next.t("Cena odświeżana jest co 5s")}
            />

            <Button type={"submit"} blue big disabled={!isReadyToProceed()}>
                {i18next.t("Sprzedaj") + " "}
                {transaction.data?.sellActivePair?.currencyPair.baseCurrency
                    .shortName ?? "-"}
            </Button>
        </form>
    );
};

export default InitialSellContainer;
