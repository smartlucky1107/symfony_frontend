import React, { useContext } from "react";
import i18next from "i18next";
import "./dashboardNews.scss";

import { UserContext } from "./../../../../user/userContext";

import CryptocurrencyOverviewSingleSmall from "../../../mainPage/cryptocurrencyOverview/singleCryptoView";

const DashboardNews = () => {
    const userContext = useContext(UserContext);
    const userData = userContext.data.user;

    const popularCoins = [
        {
            shortName: "BTC",
            fullName: "Bitcoin",
            price: "27272.24",
            priceHistory: [
                27300.74,
                26850.2,
                27101.44,
                27292.91,
                29111.41,
                27272.24,
            ],
            priceCurrencyShortName: "PLN",
            change: "1.72",
        },
        {
            shortName: "ETH",
            fullName: "Ethereum",
            price: "743.12",
            priceHistory: [652.63, 688.44, 671.2, 711.47, 720.11, 743.12],
            priceCurrencyShortName: "PLN",
            change: "-0.5",
        },
        {
            shortName: "USDT",
            fullName: "Tether",
            price: "4.23",
            priceHistory: [4.22, 4.24, 4.22, 4.21, 4.2, 4.23],
            priceCurrencyShortName: "PLN",
            change: "0.71",
        },
        {
            shortName: "ZRX",
            fullName: "ZeroX",
            price: "32.45",
            priceHistory: [38.41, 32.16, 26.44, 30.78, 31.42, 32.45],
            priceCurrencyShortName: "PLN",
            change: "14.22",
        },
        {
            shortName: "LINK",
            fullName: "Chainlink",
            price: "117.31",
            priceHistory: [100.11, 123.24, 133.25, 136.44, 138.64, 117.31],
            priceCurrencyShortName: "PLN",
            change: "-7.23",
        },
        {
            shortName: "REP",
            fullName: "Augur",
            price: "52.39",
            priceHistory: [42.74, 46.27, 48.54, 50.11, 52.6, 52.39],
            priceCurrencyShortName: "PLN",
            change: "2.43",
        },
    ];

    return (
        <>
            <div className="dashboardNews">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Witaj")} {userData.fullName}
                </h1>
                <div className="bg-w">
                    <div className="dashboardIntroduce">
                        <p>
                            {i18next.t(
                                "Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60."
                            )}
                        </p>
                    </div>
                    <div className="content">
                        <div className="row">
                            {popularCoins.map((item, key) => {
                                return (
                                    <CryptocurrencyOverviewSingleSmall
                                        key={key}
                                        shortName={item.shortName}
                                        fullName={item.fullName}
                                        price={item.price}
                                        priceHistory={item.priceHistory}
                                        priceCurrencyShortName={
                                            item.priceCurrencyShortName
                                        }
                                        change={item.change}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardNews;
