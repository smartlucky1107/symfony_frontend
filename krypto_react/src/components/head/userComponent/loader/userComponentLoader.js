import React from "react";
import "./userComponentLoader.scss";

const UserComponentLoader = () => {
    return(
        <div className={'userComponentLoader'}>
            <div className={'firstComponent userPlaceholder'}></div>
            <div className={'secondComponent userPlaceholder'}></div>
            <div className={'thirdComponent userPlaceholder'}></div>
        </div>
    )
}

export default UserComponentLoader;
