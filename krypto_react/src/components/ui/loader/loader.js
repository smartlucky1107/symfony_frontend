import React from "react";
import "./loader.scss";
import getRoute from "../../routing/routingService";
import i18next from "i18next";

const Loader = (props) => {
    const renderLabel = () => {
        if (props.label) {
            return <div className={"label"}>{props.label}</div>;
        }
        return <div className={"label"}>{i18next.t("Ładowanie") + "..."}</div>;
    };
    return (
        <div className={`loader ${props.absolute ? "absolute" : ""}`}>
            <div className={"loadingElement"}>
                <img src={getRoute("assets") + "/imgs/loader.svg"} />
            </div>
            {renderLabel()}
        </div>
    );
};

export default Loader;
