import React from "react";
import i18next from "i18next";
import "./sellPercentageAmountSelector.scss";

export const SellPercentageAmountSelector = ({updatePercentage, active}) => {
    return(
        <div className={'sellPercentageAmountSelector'}>
            {/*<div className={'sellPercentageAmountSelectorLabel'}>
                {i18next.t('Procentowa ilość z portfela') + ':'}
            </div>*/}
            <div className={'sellPercentageAmountSelectorButtons'}>
                <PercentageButton
                    percent={25}
                    onClick={updatePercentage}
                    active={active}
                />
                <PercentageButton
                    percent={50}
                    onClick={updatePercentage}
                    active={active}
                />
                <PercentageButton
                    percent={75}
                    onClick={updatePercentage}
                    active={active}
                />
                <PercentageButton
                    percent={100}
                    onClick={updatePercentage}
                    active={active}
                />
            </div>
        </div>
    )
}

const PercentageButton = ({percent, onClick, active}) => {
    const handleOnClick = () => {
        if(active) {
            onClick(percent);
        }
    }
    return(
        <div className={`
        percentageButton 
        ${active !== true ? 'disabled': ''}
        `} onClick={handleOnClick}>
            {percent}%
        </div>
    )
}
