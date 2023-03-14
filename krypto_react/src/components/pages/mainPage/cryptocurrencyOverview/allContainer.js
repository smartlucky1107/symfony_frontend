import React, { useContext, useEffect, useState } from "react";
import "./allContainer.scss";
import getRoute from "../../../routing/routingService";
import PropTypes from "prop-types";
import CryptocurrencyOverviewSingleSmall from "./singleCryptoView";
import Button from "../../../ui/button/button";
import i18next from "i18next";
import { ModalControllerContext } from "../../../modals/modalControllerContext";
import PostThis from "../../../../scripts/post";
import Loader from "../../../ui/loader/loader";

const CryptocurrencyOverviewAllContainer = (props) => {
    const modalController = useContext(ModalControllerContext);
    /*
    const popularCoins = [
        {
            shortName: 'BTC',
            fullName: 'Bitcoin',
            price: '27272.24',
            priceHistory: [27300.74, 26850.20, 27101.44, 27292.91, 29111.41, 27272.24],
            priceCurrencyShortName: 'PLN',
            change: '1.72'
        },
        {
            shortName: 'ETH',
            fullName: 'Ethereum',
            price: '743.12',
            priceHistory: [652.63, 688.44, 671.20, 711.47, 720.11, 743.12],
            priceCurrencyShortName: 'PLN',
            change: '-0.5'
        },
        {
            shortName: 'USDT',
            fullName: 'Tether',
            price: '4.23',
            priceHistory: [4.22, 4.24, 4.22, 4.21, 4.20, 4.23],
            priceCurrencyShortName: 'PLN',
            change: '0.71'
        },
        {
            shortName: 'ZRX',
            fullName: 'ZeroX',
            price: '32.45',
            priceHistory: [38.41, 32.16, 26.44, 30.78, 31.42, 32.45],
            priceCurrencyShortName: 'PLN',
            change: '14.22'
        },
        {
            shortName: 'LINK',
            fullName: 'Chainlink',
            price: '117.31',
            priceHistory: [100.11, 123.24, 133.25, 136.44, 138.64, 117.31],
            priceCurrencyShortName: 'PLN',
            change: '-7.23'
        },
        {
            shortName: 'REP',
            fullName: 'Augur',
            price: '52.39',
            priceHistory: [42.74, 46.27, 48.54, 50.11, 52.60, 52.39],
            priceCurrencyShortName: 'PLN',
            change: '2.43'
        },
    ]*/
    const [currencies, setCurrencies] = useState(null);

    const getCurrencyList = async () => {
        let currencyArray = [];
        try {
            const response = await PostThis(
                "/charting/currencies",
                "GET",
                "",
                ""
            );
            if (response.status >= 200 && response.status < 300) {
                Object.keys(response.data).map((shortName, key) => {
                    response.data[shortName].map((item, keyb) => {
                        currencyArray.push(item);
                    });
                });

                setCurrencies(currencyArray);
            }
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getCurrencyList();
    }, []);
    if (currencies === null) {
        return (
            <div className={"cryptocurrencyOverviewAllContainer"}>
                <Loader />
            </div>
        );
    }
    return (
        <div className={"cryptocurrencyOverviewAllContainer"}>
            <div className={"container"}>
                {currencies.map((item, key) => {
                    if (key < 9) {
                        return (
                            <CryptocurrencyOverviewSingleSmall
                                key={key}
                                shortName={
                                    item.currencyPair.baseCurrency.shortName
                                }
                                fullName={
                                    item.currencyPair.baseCurrency.fullName
                                }
                                price={item.price}
                                priceHistory={item.currencyPair["1hPoints"]}
                                priceCurrencyShortName={
                                    item.currencyPair.quotedCurrency.shortName
                                }
                                change={item.growth}
                            />
                        );
                    }
                })}
                <div className={"row"}>
                    <Button
                        rightIcon={"more_horiz"}
                        to={getRoute("allCurrencies")}
                    >
                        {i18next.t("Pokaż wszystkie")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CryptocurrencyOverviewAllContainer;
