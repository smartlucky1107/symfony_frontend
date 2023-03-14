import React from "react";
import "./sellDetailsLoader.scss";

const SellDetailsLoader = (props) => {
    return (
        <>
        <div className={'sellDetailsLoaderWrapper'}>
            <div className={'sellDetailsLoader'}>
                <div className={'logo'}>
                </div>
                <div className={'details'}>
                    <div className={'shortRow'}></div>
                    <div className={'longRow'}></div>
                    <div className={'shortRow'}></div>
                    <div className={'longRow'}></div>
                </div>
            </div>
                <div className={'wallets'}>
                    <div className={'walletHeader'}></div>
                    <div className={'singleWallet'}></div>
                </div>
        </div>
            <div className={'sellDetailsButtonLoader'}></div>
            </>
    )
}

export default SellDetailsLoader;
