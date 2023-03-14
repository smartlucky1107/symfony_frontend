import i18next from "i18next";
import React from "react";

import "./statusRetry.scss";

import Button from "../../../../../../ui/button/button";

import img from "../../../../../../../img/verification_error.svg";

const StatusRetry = (props) => {
    return (
        <>
            <div className="jumioStatus retry">
                <img
                    src={img}
                    className="jumioStatusImg"
                    alt={i18next.t("Weryfikacja wygasła")}
                />
                <div className="textCenter">
                    <h3>
                        {props.msg
                            ? i18next.t(props.msg)
                            : i18next.t("Weryfikacja wygasła")}
                    </h3>
                </div>
                <Button
                    blue
                    big
                    onClick={() => {
                        props.handleGenerateVerification();
                    }}
                >
                    {i18next.t("Rozpocznij nową weryfikację")}
                </Button>
            </div>
        </>
    );
};

export default StatusRetry;
