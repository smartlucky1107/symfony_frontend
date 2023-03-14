import i18next from "i18next";
import React from "react";

import "./statusError.scss";

import Button from "../../../../../../ui/button/button";

import img from "../../../../../../../img/verification_error.svg";

const StatusError = (props) => {
    return (
        <>
            <div className="jumioStatus error">
                <img
                    src={img}
                    className="jumioStatusImg"
                    alt={i18next.t("Błąd")}
                />

                <h3>
                    {props.msg
                        ? i18next.t(props.msg)
                        : i18next.t(
                              "Wystąpiły problemy z połączeniem, sprawdź połączenie i spróbuj za chwilę"
                          )}
                </h3>
                <Button blue big>
                    {i18next.t("Spróbuj ponownie")}
                </Button>
            </div>
        </>
    );
};

export default StatusError;
