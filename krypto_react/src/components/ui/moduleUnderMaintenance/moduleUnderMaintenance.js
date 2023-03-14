import React from "react";
import i18next from "i18next";
import "./moduleUnderMaintenance.scss";

export const ModuleUnderMaintennace = (props) => {
    const renderText = () => {
        if (props?.trading === true) {
            return i18next.t(
                "Trwają prace techniczne. Prosimy spróbować ponownie za chwilę."
            );
        }
        return i18next.t("Wystąpił problem z połączeniem. Odśwież stronę.");
    };
    return (
        <div className={"moduleUnderMaintenance"}>
            <div className={"maintenanceContent"}>
                <div className={"maintenanceIcon"}>
                    <span className="material-icons">build</span>
                </div>
                <div className={"maintenanceText"}>{renderText()}</div>
            </div>
        </div>
    );
};
