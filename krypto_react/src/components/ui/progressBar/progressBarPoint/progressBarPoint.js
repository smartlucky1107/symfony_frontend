import React, { useState } from "react";

const ProgressBarPoint = (props) => {
    const [pointPositon, setPointPositon] = useState(props.pointPositon);

    return (
        <>
            <div
                className={`progressBarPoint ${
                    props.startPoint ? "startPoint" : ""
                } ${props.endPoint ? "endPoint" : ""} ${
                    props.pointColor ? "success" : ""
                }`}
                style={{ left: `${pointPositon}%` }}
            >
                <div className="progressBarPointContent">{props.pointName}</div>
            </div>
        </>
    );
};

export default ProgressBarPoint;
