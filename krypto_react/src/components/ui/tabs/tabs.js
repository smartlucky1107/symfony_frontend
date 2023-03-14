import React from "react";

import TabsContent from "./tabsContent/tabsContent";
import TabsHeader from "./tabsHeader/tabsHeader";
import "./tabs.scss";

const Tabs = (props) => {
    return (
        <>
            <div className="tabs">{props.children}</div>
        </>
    );
};

export default Tabs;
