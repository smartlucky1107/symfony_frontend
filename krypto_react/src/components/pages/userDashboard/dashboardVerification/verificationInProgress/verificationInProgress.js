import React from "react";
import i18next from "i18next";

import "./verificationInProgress.scss";

const VerificationInProgress = () => {
    return (
        <>
            <div className="verificationInProgressContent">
                <div className="circle">
                    <div className="border"></div>
                    <span className="material-icons icon">hourglass_full</span>
                </div>
                <h3>{i18next.t("Twoje dane są właśnie przetwarzane.")}</h3>
                <p>
                    {i18next.t(
                        "W razie konieczności potwierdzenia danych nasz dział supportu skontaktuje się z tobą."
                    )}
                </p>
            </div>
        </>
    );
};

export default VerificationInProgress;
