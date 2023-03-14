import React, {useContext, useState} from "react";
import {getChartData, getChartOptions} from "../../../../../charts/charts";
import getRoute from "../../../../routing/routingService";
import {Line} from "react-chartjs-2";
import "./singleCurrencyBlock.scss";
import {AppContext} from "../../../../appContext";
import Button from "../../../../ui/button/button";
import i18next from "i18next";


export const SingleCurrencyBlock = (props) => {
    const fallingOrRising = parseFloat(props.change) < 0 ? 'falling' : 'rising';
    const appContext = useContext(AppContext);
    const chartData = getChartData(props.priceHistory);
    const chartOptions = getChartOptions();
    const [detailsActive, setDetailsActive] = useState(false);

    const toggleDetailsActive = () => {
        setDetailsActive(!detailsActive);
    }

    let chartSize = {
        width: 120,
        height: 40
    }

    if (appContext.data.isMobile) {
        chartSize = {
            width: 100,
            height: 50
        }
    }
    return (
        <div className={'singleCurrencyBlock'}
             data-search={`${props.fullName}, ${props.shortName}`}
        >
            <div className={'mainData'} onClick={toggleDetailsActive}>
            <div className={'currency'}>
                    <div className={'image'}>
                        <img src={getRoute('assets/currencies') + props.shortName + '.svg'} alt={props.fullName}/>
                    </div>
                    <div className={'data'}>
                        <div className={'fullName'}>
                            {props.fullName}
                        </div>
                        <div className={'shortName'}>
                            {props.shortName}
                        </div>
                    </div>
                </div>


                <div className={'chart noMobi'}>
                    <Line
                        data={chartData}
                        options={chartOptions}
                        width={chartSize.width}
                        height={chartSize.height}
                    />
                </div>

                <div className={`change ${fallingOrRising}`}>
                    {fallingOrRising === 'falling' ?
                        <span className="material-icons">
                            arrow_drop_down
                            </span> :
                        <span className="material-icons">
                            arrow_drop_up
                            </span>
                    }
                    {props.change}%
                </div>

                <div className={'sellPrice noMobi'}>
                    <BuyOrSellBtn
                        isMobile={appContext.data.isMobile}
                        buyOrSell={'sell'}
                        cryptoShortName={props.shortName}
                        price={props.sellPrice}
                        priceShortName={props.priceCurrencyShortName}
                    />
                </div>

                <div className={'buyPrice'}>
                    <BuyOrSellBtn
                        isMobile={appContext.data.isMobile}
                        buyOrSell={'buy'}
                        cryptoShortName={props.shortName}
                        price={props.buyPrice}
                        priceShortName={props.priceCurrencyShortName}
                    />
                </div>
            </div>

            {appContext.data.isMobile ?
                detailsActive ?
                    <MoreDetails {...props}/>
                    : null
                : null
            }

        </div>
    )
}

const BuyOrSellBtn = ({isMobile, buyOrSell, cryptoShortName, price, priceShortName,}) => {
    const url = buyOrSell === 'buy' ?
        getRoute('transactionBuy') :
        getRoute('transactionSell');

    const icon = buyOrSell === 'buy' ?
        'add_shopping_cart' :
        'monetization_on';

    if (isMobile) {
        return (
            <>
                {price} <small>{priceShortName}</small>
            </>
        )
    } else {
        return (
            <Button to={`${url}/${cryptoShortName}`} leftIcon={icon}>
                {price}
                <small>{priceShortName}</small>
            </Button>
        )
    }
}

const MoreDetails = (props) => {
    return (
        <div className={'details'}>
            <div className={'sellPrice'}>
                <div className={'smallHeader'}>
                    {i18next.t('Sprzedaj za')}
                </div>
                <BuyOrSellBtn
                    isMobile={false}
                    buyOrSell={'sell'}
                    cryptoShortName={props.shortName}
                    price={props.sellPrice}
                    priceShortName={props.priceCurrencyShortName}
                />
            </div>

            <div className={'buyPrice'}>
                <div className={'smallHeader'}>
                    {i18next.t('Kup za')}
                </div>
                <BuyOrSellBtn
                    isMobile={false}
                    buyOrSell={'buy'}
                    cryptoShortName={props.shortName}
                    price={props.buyPrice}
                    priceShortName={props.priceCurrencyShortName}
                />
            </div>
        </div>
    )
}
