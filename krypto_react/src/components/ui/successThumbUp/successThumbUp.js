import React from "react";
import i18next from "i18next";
import "./successThumbUp.scss";

const SuccessThumbUp = (props) => {
    return (
        <div className="successThumbUp">
            <div className="circle">
                <div className="border"></div>
                <span className="material-icons icon">thumb_up</span>
            </div>
            <h3 className="textCenter">
                {i18next.t("Sukces")}
                <br />
                {i18next.t(props.message)}
            </h3>
        </div>
    );
};

export default SuccessThumbUp;
