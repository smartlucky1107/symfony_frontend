import React from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";
import getRoute from "./../../../routing/routingService";

import "./WorkerTile.scss";

const WorkerTile = (props) => {
    return (
        <div
            className={"col col-md-4"}
            data-search={`${props.name},${props.lastName},${props.fullName}`}
        >
            <div className=" workerTile">
                <div>{props.fullName}</div>
                <div className="row">
                    <Link
                        className="goToBtn"
                        to={
                            getRoute("userDashboardWorkspace") +
                            "/employee/" +
                            props.id
                        }
                    >
                        {i18next.t("Szczegóły")}
                        <span className="material-icons">more_horiz</span>
                    </Link>
                    {/* <button className="rmvBtn colorError">
                    {i18next.t("Usuń pracownika")}
                    <span className="material-icons">delete_forever</span>
                </button> */}
                </div>
            </div>
        </div>
    );
};

export default WorkerTile;
