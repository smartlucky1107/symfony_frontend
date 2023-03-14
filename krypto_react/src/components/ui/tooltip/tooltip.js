import React from "react";

import "./tooltip.scss";

{
    /* <div className={"tooltipWrapper"}>
    <span className="material-icons">cancel</span>
    <Tooltip text={i18next.t("Zablokuj parę")} side="left" />
</div>; */
}

const Tooltip = (props) => {
    return (
        <>
            <div className={`tooltip ${props.side ? props.side : ""}`}>
                {props.text}
            </div>
        </>
    );
};

export default Tooltip;
