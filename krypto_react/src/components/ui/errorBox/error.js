import React from "react";

import "./error.scss";

const Error = (porps) => {
    return (
        <>
            <div className={"errorTooltip " + porps?.side}>{porps?.msg}</div>
        </>
    );
};

export default Error;
