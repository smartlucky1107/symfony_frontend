import getRoute from "../../../routing/routingService";
import PropTypes from "prop-types";
import React from "react";
import "./singleCryptoView.scss";
import { Line } from "react-chartjs-2";
import { getChartData, getChartOptions } from "../../../../charts/charts";
import { Link } from "react-router-dom";

const CryptocurrencyOverviewSingleSmall = (props) => {
    const fallingOrRising = parseFloat(props.change) < 0 ? "falling" : "rising";

    const chartData = getChartData(props.priceHistory);
    const chartOptions = getChartOptions();
    return (
        <Link
            to={getRoute("transactionBuy") + "/" + props.shortName}
            className={"cryptocurrencyOverviewSingleSmall"}
        >
            <div className={"flexRow"}>
                <div className={"image"}>
                    <img
                        src={
                            getRoute("assets/currencies") +
                            props.shortName +
                            ".svg"
                        }
                        alt={props.fullName}
                    />
                </div>
                <div className={"data"}>
                    <div className={"fullName"}>{props.fullName}</div>
                    <div className={`change ${fallingOrRising}`}>
                        {fallingOrRising === "falling" ? (
                            <span className="material-icons">
                                arrow_drop_down
                            </span>
                        ) : (
                            <span className="material-icons">
                                arrow_drop_up
                            </span>
                        )}
                        {props.change}%
                    </div>
                </div>
                <div className={"price"}>
                    {props.price} <small>{props.priceCurrencyShortName}</small>
                </div>
            </div>
            <div className={"flexRow"}>
                <div className={"chart"}>
                    <Line
                        data={chartData}
                        options={chartOptions}
                        width={283}
                        height={80}
                    />
                </div>
            </div>
        </Link>
    );
};

CryptocurrencyOverviewSingleSmall.propTypes = {
    /**
     * Short name of the cryptocurrency, i.e: BTC
     */
    shortName: PropTypes.string,
    /**
     * Full name of the cryptocurrency, i.e: Bitcoin
     */
    fullName: PropTypes.string,
    /**
     * Percentage price change, i.e: -1.25
     */
    change: PropTypes.number,
    /**
     * Short name of currency used to calculate price, i.e: USD
     */
    priceCurrencyShortName: PropTypes.string,
    /**
     * Price, i.e: 1.12312312
     */
    price: PropTypes.string,
    /**
     * Price history with 6 points of data,
     * i.e: [1.20, 1.80, 1.50, 1.44, 1.62, 1.77]
     */
    priceHistory: PropTypes.array,
};

export default CryptocurrencyOverviewSingleSmall;
