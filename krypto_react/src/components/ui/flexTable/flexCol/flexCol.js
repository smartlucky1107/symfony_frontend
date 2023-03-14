import React from "react";

const FlexCol = (props) => {
    return <div className={`flexTableCol ${props.name}`}>{props.children}</div>;
};

export default FlexCol;
