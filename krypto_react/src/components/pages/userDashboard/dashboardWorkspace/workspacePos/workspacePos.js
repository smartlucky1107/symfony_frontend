import React, { useState, useContext, useEffect } from "react";
import "./workspacePos.scss";
import WorkspacePosInstallation from "./workspacePosInstallation/workspacePosInstallation";

import WorkspaceWorkers from "../workspaceWorkers/workspaceWorkers";

const WorkspacePos = (props) => {
    return (
        <section className="workspacePos">
            <WorkspacePosInstallation
                activeTab={props.activeTab}
                workspace={props.workspace}
                setIsPosAllowed={props.setIsPosAllowed}
            />

            <WorkspaceWorkers
                activeTab={props.activeTab}
                setIsPosAllowed={props.setIsPosAllowed}
            />
        </section>
    );
};

export default WorkspacePos;
