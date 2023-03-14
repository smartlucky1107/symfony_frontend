import React from "react";

import Tab from "./tab/tab";

const TabsHeader = (props) => {
    return (
        <>
            <div className="tabsHeader">
                <Tab>{props.children}</Tab>
            </div>
        </>
    );
};

export default TabsHeader;
