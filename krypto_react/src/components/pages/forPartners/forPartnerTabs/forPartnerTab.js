import React, { useContext, useEffect } from "react";
import { TransactionContext } from "../transactionContext";
import Input from "../../ui/input/input";
import i18next from "i18next";
import Select from "../../ui/select/select";
import Button from "../../ui/button/button";
import "./initialBuyContainer.scss";
import "./topSmallNavigation.scss";
import getRoute from "../../routing/routingService";
import { SelectedCurrencyTooltip } from "../selectedCurrencyTooltip/selectedCurrencyTooltip";
import { TimerBar } from "../../ui/timerBar/timerBar";
import { TransactionDescription } from "../../pages/transactionPages/transactionDescription/transactionDescription";
import BuyImg from "./../../../img/buy.svg";
import { ModuleUnderMaintennace } from "../../ui/moduleUnderMaintenance/moduleUnderMaintenance";
import { AppContext } from "../../appContext";

const InitialBuyContainer = (props) => {
    const transaction = useContext(TransactionContext);
    const app = useContext(AppContext);
    const {
        buyIWantCurrencyList,
        buyIHaveCurrencyList,
        currencyList,
        buyActivePair,
    } = transaction.data;

    const onChangeCurrency = (iHaveORiWant, currencyObject) => {
        const iHaveCurrencyList = transaction.getIHaveCurrencyList(
            currencyObject
        );

        transaction.update({
            //buyLastActive: iHaveORiWant,
            buyActivePair: currencyObject,
            buyIWantAmount: parseFloat(
                parseFloat("0.01").toFixed(
                    currencyObject.currencyPair.baseCurrency.roundPrecision
                )
            ),
            ...iHaveCurrencyList,
        });
    };

    const onChangeAmount = (iHaveORiWant, value) => {
        transaction.update({
            buyLastActive: iHaveORiWant,
            [iHaveORiWant + "Amount"]: value,
        });
    };
    const isReadyToProceed = () => {
        if (
            transaction.data.buyIHaveLoading ||
            transaction.data.buyIWantLoading ||
            transaction.data.buyIWantValid !== true ||
            transaction.data.buyIWantAmount === null ||
            transaction.data.buyIHaveAmount === null
        ) {
            return false;
        } else {
            return true;
        }
    };
    const onBuyButtonClick = (e) => {
        e.preventDefault();
        if (isReadyToProceed()) {
            transaction.update({
                buyTransactionStep: transaction.data.buyTransactionStep + 1,
            });

            if (props.isHomepage) {
                props.history.push(getRoute("transactionBuy"));
            }
        }
    };

    useEffect(() => {
        transaction.update({
            initialBaseCurrency: props.match?.params?.baseCurrency ?? "",
            initialQuotedCurrency: props.match?.params?.quotedCurrency ?? "",
            transactionType: "buy",
            transactionComponentMounted: true,
        });
    }, []);

    if (app.data.tradingDisabled) {
        return <ModuleUnderMaintennace trading />;
    }
    if (transaction.data.maintenance) {
        return <ModuleUnderMaintennace />;
    }
    return (
        <form
            onSubmit={onBuyButtonClick}
            className={`buyStep1 ${
                props.isHomepage ? "homepageTransaction" : ""
            }`}
        >
            {!props.isHomepage ? (
                <TransactionDescription
                    text={i18next.t(
                        "Kup kryptowaluty w dwóch prostych krokach! Wpisz ilość kryptowalut, jaką pragniesz kupić, a następnie wybierz sposób płatności do realizacji transakcji."
                    )}
                    img={BuyImg}
                />
            ) : null}
            <Input
                id={"buyIWant"}
                numeric={true}
                precision={
                    transaction.data?.buyActivePair?.currencyPair.baseCurrency
                        .roundPrecision
                }
                label={i18next.t("Chcę kupić")}
                fontSize={"big"}
                fontWeight={"700"}
                value={transaction.data?.buyIWantAmount ?? ""}
                onChange={onChangeAmount}
                autocomplete={false}
                loading={transaction.data?.buyIWantLoading}
                minMax={transaction.data?.buyIWantValid}
                minMaxComponent={
                    <SelectedCurrencyTooltip
                        data={transaction.data?.buyActivePair?.currencyPair}
                        type={transaction.data?.buyIWantValid}
                    />
                }
            >
                <Select
                    inputSelect
                    activeElement={
                        transaction.data?.buyActivePair?.currencyPair
                            .baseCurrency ?? ""
                    }
                    onChangeActiveElement={onChangeCurrency}
                    className={"sellBuySelect iWant buyIWant"}
                    optionsAlign={"right"}
                    currencyOptions={buyIWantCurrencyList}
                />
            </Input>

            <Input
                id={"buyIHave"}
                numeric={true}
                precision={
                    transaction.data?.buyActivePair?.currencyPair.quotedCurrency
                        .roundPrecision
                }
                label={i18next.t("Zapłacę")}
                fontSize={"big"}
                fontWeight={"700"}
                value={transaction.data?.buyIHaveAmount ?? ""}
                onChange={onChangeAmount}
                autocomplete={false}
                loading={transaction.data?.buyIHaveLoading}
            >
                <Select
                    inputSelect
                    activeElement={
                        transaction.data?.buyActivePair?.currencyPair
                            .quotedCurrency ?? ""
                    }
                    onChangeActiveElement={onChangeCurrency}
                    className={"sellBuySelect iHave buyIHave"}
                    optionsAlign={"right"}
                    currencyOptions={buyIHaveCurrencyList ?? []}
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
                {i18next.t("Kup") + " "}
                {transaction.data?.buyActivePair?.currencyPair.baseCurrency
                    .shortName ?? "-"}
            </Button>
        </form>
    );
};

export default InitialBuyContainer;
