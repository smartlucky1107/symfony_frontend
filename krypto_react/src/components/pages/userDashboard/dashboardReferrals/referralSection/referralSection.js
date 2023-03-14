import React from "react";
import i18next from "i18next";

import "./referralSection.scss";

const ReferralSection = (props) => {
    return (
        <>
            <div className="referralSection">
                <div className="row">
                    <div
                        className={
                            props.contentSide === "left"
                                ? "col order-2"
                                : "col "
                        }
                    >
                        <div className="content">{props.children}</div>
                    </div>
                    <div className="col">
                        <div className="img">
                            <img src={props.img} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReferralSection;
