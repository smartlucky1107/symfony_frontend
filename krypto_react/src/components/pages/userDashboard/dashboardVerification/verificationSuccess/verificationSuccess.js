import React from "react";
import i18next from "i18next";

import "./verificationSuccess.scss";

const VerificationSuccess = () => {
    return (
        <>
            <div className="verificationSuccessContent">
                <div className="circle">
                    <div className="border"></div>
                    <span className="material-icons icon">thumb_up</span>
                </div>
                <h3>{i18next.t("Weryfikacja zakończona pomyślnie")}</h3>
            </div>
        </>
    );
};

export default VerificationSuccess;
