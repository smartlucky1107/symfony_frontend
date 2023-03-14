import i18next from "i18next";
import React from "react";

import "./statusMaintenance.scss";

import Button from "../../../../../../ui/button/button";

import img from "../../../../../../../img/install-pos.svg";

const StatusMaintenance = (props) => {
    return (
        <>
            <div className="jumioStatusMaintenance ">
                <img
                    src={img}
                    className="jumioStatusImgMaintenance"
                    alt={i18next.t("Prace techniczne")}
                />

                <h3>
                    {props.msg
                        ? i18next.t(props.msg)
                        : i18next.t("Trwają prace techniczne")}
                </h3>
            </div>
        </>
    );
};

export default StatusMaintenance;
