import React from "react";
import "./transactionDescription.scss";

export const TransactionDescription = (props) => {
    return(
        <div className={'transactionDescription'}>
            <div className={'transactionDescriptionText'}>
                {props.text}
            </div>
            <div className={'transactionDescriptionImg'}>
                <img src={props.img}/>
            </div>
        </div>
    )
}
