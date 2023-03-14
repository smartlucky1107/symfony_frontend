import React, {useState, forwardRef, useEffect} from "react";
import "./allCurrenciesList.scss";
import {SingleCurrencyBlock} from "./singleCurrencyBlock/singleCurrencyBlock";
import i18next from "i18next";
import PostThis from "../../../../scripts/post";
import Loader from "../../../ui/loader/loader";

/*const initCurrencies = [
    {
        shortName: 'BTC',
        fullName: 'Bitcoin',
        buyPrice: '27272.24',
        sellPrice: '26840.12',
        priceHistory: [27300.74, 26850.20, 27101.44, 27292.91, 29111.41, 27272.24],
        priceCurrencyShortName: 'PLN',
        change: '1.72'
    },
    {
        shortName: 'ETH',
        fullName: 'Ethereum',
        buyPrice: '743.12',
        sellPrice: '720.22',
        priceHistory: [652.63, 688.44, 671.20, 711.47, 720.11, 743.12],
        priceCurrencyShortName: 'PLN',
        change: '-0.5'
    },
    {
        shortName: 'USDT',
        fullName: 'Tether',
        buyPrice: '4.23',
        sellPrice: '4.10',
        priceHistory: [4.22, 4.24, 4.22, 4.21, 4.20, 4.23],
        priceCurrencyShortName: 'PLN',
        change: '0.71'
    },
    {
        shortName: 'ZRX',
        fullName: 'ZeroX',
        buyPrice: '32.45',
        sellPrice: '30.20',
        priceHistory: [38.41, 32.16, 26.44, 30.78, 31.42, 32.45],
        priceCurrencyShortName: 'PLN',
        change: '14.22'
    },
    {
        shortName: 'LINK',
        fullName: 'Chainlink',
        buyPrice: '117.31',
        sellPrice: '110.12',
        priceHistory: [100.11, 123.24, 133.25, 136.44, 138.64, 117.31],
        priceCurrencyShortName: 'PLN',
        change: '-7.23'
    },
    {
        shortName: 'REP',
        fullName: 'Augur',
        buyPrice: '52.39',
        sellPrice: '50.22',
        priceHistory: [42.74, 46.27, 48.54, 50.11, 52.60, 52.39],
        priceCurrencyShortName: 'PLN',
        change: '2.43'
    },
]*/
export const AllCurrenciesList = forwardRef((props, ref) => {
    const [currencies, setCurrencies] = useState(null);

    const getCurrencyList = async () => {
        let currencyArray = [];
        try {
            const response = await PostThis("/charting/currencies", "GET", "", "");
            if (response.status >= 200 && response.status < 300) {
                Object.keys(response.data).map((shortName, key) => {
                   response.data[shortName].map((item, keyb) => {
                       currencyArray.push(item);
                   })
                });

                setCurrencies(currencyArray);
            }
        } catch(error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCurrencyList();
    }, []);

    if(currencies === null){
        return <Loader/>
    }
    return(
        <div className={'allCurrenciesList'}>
            <div className={'header'}>
                <div className={'headerCol crypto'}>
                    {i18next.t('Kryptowaluta')}
                </div>
                <div className={'headerCol chart noMobi'}>

                </div>
                <div className={'headerCol priceChange'}>
                    {i18next.t('Zmiana 24h')}
                </div>
                <div className={'headerCol priceSell noMobi'}>
                    {i18next.t('Sprzedaj za')}
                </div>
                <div className={'headerCol priceBuy'}>
                    {i18next.t('Kup za')}
                </div>
            </div>
            <div className={'allCurrenciesListContainer'} ref={ref}>
            {currencies.map((item, key) => {
                return <SingleCurrencyBlock
                    key={key}
                    shortName={item.currencyPair.baseCurrency.shortName}
                    fullName={item.currencyPair.baseCurrency.fullName}
                    buyPrice={item.price}
                    sellPrice={item.price}
                    priceHistory={item.currencyPair['1hPoints']}
                    priceCurrencyShortName={item.currencyPair.quotedCurrency.shortName}
                    change={item.growth}
                />
            })}
            </div>
        </div>
    )
});
