import React from "react";
import "./underHeader.scss";

const UnderHeader = (props) => {
    return(
        <div className={'underHeader'}>
            <div className={'container'}>
                <h1 className={'stdHeader center'}>{props.title}</h1>
                {props.description ? <div className={'description'}>{props.description}</div> : ''}
            </div>
        </div>
    )
}
export default UnderHeader;
