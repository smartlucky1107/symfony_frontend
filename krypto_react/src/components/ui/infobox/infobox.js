import React from "react";
import "./infobox.scss";

const Infobox = (props) => {
    return (
        <div className={`infobox ${props.animation ?? ''} ${props.type ?? ''} ${props.fontSize ?? ''}`}>
            {props.icon ?<div className={'infoboxIcon'}>

                        <span className="material-icons">
                            {props.icon}
                        </span>

                </div>: null}

                <div className={'infoboxText'}>
                    {props.children}
                </div>
        </div>
    )
}

export default Infobox;
