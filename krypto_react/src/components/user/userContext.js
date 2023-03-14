import React, { useEffect, useState } from "react";
import PostThis from "../../scripts/post";
import getCookie, { setCookie } from "../../scripts/cookies";
import NotificationsWebsocket from "../notifications/notificationsWebsocket/notificationsWebsocket";

export const userContext = {
    user: null,
    business: true,
    isLoggedIn: null,
};

export const UserContext = React.createContext({
    data: userContext,
    update: () => {},
    reload: () => {},
});

export const UserContextProvider = (props) => {
    const [data, setData] = useState(userContext);

    const updateContextData = (data) => {
        setData((prevState) => {
            return {
                ...prevState,
                ...data,
            };
        });
    };

    const reloadContextData = async (callback = null) => {
        const response = await PostThis("/api/users/me", "GET", "", {
            authorization: "Bearer " + getCookie("authToken"),
        });
        //const isLoggedIn = response.status === 200 ? true : false;
        console.log(response);

        if (response && response.status === 200) {
            updateContextData({
                user: {
                    ...response.data.user,
                    authToken: getCookie("authToken"),
                },
                isLoggedIn: true,
            });
        } else {
            console.log("response users/me !== 200");
            setCookie("authToken", "", 0);
            updateContextData({
                user: null,
                isLoggedIn: false,
            });
        }
        if (typeof callback === "function") {
            callback();
        }
    };

    const logoutUser = async () => {
        const response = await PostThis(
            "/logout",
            "POST",
            {
                token: data.user.authToken,
            },
            ""
        );

        if (response.status === 201) {
            updateContextData({
                user: null,
                isLoggedIn: false,
            });
            setCookie("authToken", "", 0);
            return true;
        } else {
            return false;
        }
    };

    useEffect(() => {
        if (getCookie("authToken")) {
            reloadContextData();
        } else {
            updateContextData({
                user: null,
                isLoggedIn: false,
            });
        }
    }, []);
    return (
        <UserContext.Provider
            value={{
                update: updateContextData,
                reload: reloadContextData,
                logout: logoutUser,
                data,
            }}
        >
            {data.user !== null ? (
                <NotificationsWebsocket user={data?.user} />
            ) : null}
            {props.children}
        </UserContext.Provider>
    );
};
