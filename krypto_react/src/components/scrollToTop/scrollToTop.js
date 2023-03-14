import React, {useEffect, useRef, useState} from "react";
import usePrevious from "../usabilityHooks";
import {useLocation} from "react-router-dom";

const ScrollToTop = (props) => {
    const location = useLocation();
    const prevLocation = usePrevious();

    useEffect(() => {
        if(location !== prevLocation){
            window.scrollTo(0, 0);
        }
    });

    return props.children
}

export default ScrollToTop;
