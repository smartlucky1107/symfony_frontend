import i18next from "i18next";
import React from "react";

import "./statusCompleted.scss";

const StatusCompleted = () => {
    return (
        <>
            <div className="jumioStatus completed">
                {i18next.t("Weryfikacja zakończona pomyślnie")}
            </div>
        </>
    );
};

export default StatusCompleted;
