import React, {useContext, useEffect} from "react";
import {UserContext} from "../userContext";
import {Redirect} from "react-router-dom";
import getRoute from "../../routing/routingService";
import PostThis from "../../../scripts/post";
import getCookie from "../../../scripts/cookies";
import Loader from "../../ui/loader/loader";

const AuthChecker = (props) => {
    const user = useContext(UserContext);

    if(user.data.isLoggedIn === null){
        return(
            <>
                <Loader/>
            </>
        )

    }else if(user.data.isLoggedIn === false){
        return <Redirect to={getRoute('login')} />

    }else {
        console.log('AUTH CHECKER: authorised');
        return (
            <>
                {props.children}
            </>
        )

    }
}

export default AuthChecker;
