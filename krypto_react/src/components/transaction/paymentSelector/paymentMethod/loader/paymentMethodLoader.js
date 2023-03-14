import React from "react";
import "./paymentMethodLoader.scss";

const PaymentMethodLoader = (props) => {
    return (
        <div className={'paymentMethodLoaderWrapper'}>
            <div className={'paymentMethodLoader'}>
                <div className={'logo'}>
                </div>
                <div className={'details'}>
                    <div className={'shortRow'}></div>
                    <div className={'longRow'}></div>
                    <div className={'shortRow'}></div>
                    <div className={'longRow'}></div>
                </div>
                <div className={'buyNow'}>
                </div>
            </div>
            {props.internal ?
                <div className={'wallets'}>
                    <div className={'walletHeader'}></div>
                    <div className={'singleWallet'}></div>
                </div> : ''}
        </div>
    )
}

export default PaymentMethodLoader;
