import React from "react";

import "./preloader.scss";

// add class preloaderWrapper to parent
// <Preloader show={true/false} size="small/medium/empty is big" />
const Preloader = (props) => {
    return (
        <>
            <div
                className={`preloader ${props.show ? "show" : ""} ${
                    props.size ? props.size : ""
                }`}
            >
                <span className="loader"></span>
            </div>
        </>
    );
};

export default Preloader;
