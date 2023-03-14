import React from "react";
import i18next from "i18next";

const WorkspaceDeniedNotification = () => {
    return (
        <>
            <div className="workspaceDeniedNotification">
                <h3>{i18next.t("Brak dostępu")}</h3>
            </div>
        </>
    );
};

export default WorkspaceDeniedNotification;
