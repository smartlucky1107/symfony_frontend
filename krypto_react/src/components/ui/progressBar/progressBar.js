import React, { useEffect, useState } from "react";

import "./progressBar.scss";

const ProgressBar = (props) => {
    // 0-100
    const [progressLenght, setProgressLength] = useState(0);

    useEffect(() => {
        setProgressLength(props.progressLenght);
    }, [props.progressLenght]);

    return (
        <>
            <div className="progressBarContent">
                <div className="progressBar">
                    <div
                        className={`${
                            props.barColor
                                ? "progressBarLength success"
                                : "progressBarLength"
                        }`}
                        style={{ width: `${progressLenght}%` }}
                    ></div>
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default ProgressBar;
