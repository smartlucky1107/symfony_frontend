import React, { useContext, useEffect, useState } from "react";
import i18next from "i18next";
import axios from "axios";
import "./accountData.scss";

import PostThis from "../../../../../scripts/post";

import { UserContext } from "../../../../user/userContext";

const AccountData = () => {
    const user = useContext(UserContext);
    const userData = user.data.user;
    const [lastLoginDate, setLastLoginDate] = useState();

    const getLastLoginData = async (cancelToken) => {
        const response = await PostThis(
            "/api/users/me/login-history/recent",
            "GET",
            "",
            {
                Authorization: `Bearer ${user.data.user?.authToken}`,
            },
            "",
            cancelToken
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setLastLoginDate(response.data.login.createdAt);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        getLastLoginData(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <>
            <div className="accountDataContent">
                <h3 className="title">{i18next.t("Twoje konto")}</h3>
                <div className="flexTable">
                    {userData.type === 2 || userData.type === 3 ? (
                        <div className="ftRow">
                            <div className="ftCol ftLeft">
                                {i18next.t("Nazwa firmy")}
                            </div>
                            <div className="ftCol ftRight">
                                {userData.companyName}
                            </div>
                        </div>
                    ) : (
                        ""
                    )}
                    <div className="ftRow">
                        <div className="ftCol ftLeft">{i18next.t("Imię")}</div>
                        <div className="ftCol ftRight">
                            {userData.firstName}
                        </div>
                    </div>
                    <div className="ftRow">
                        <div className="ftCol ftLeft">
                            {i18next.t("Nazwisko")}
                        </div>
                        <div className="ftCol ftRight">{userData.lastName}</div>
                    </div>

                    {userData.type === 2 && userData.nip ? (
                        <div className="ftRow">
                            <div className="ftCol ftLeft">
                                {i18next.t("Nip")}
                            </div>
                            <div className="ftCol ftRight">{userData?.nip}</div>
                        </div>
                    ) : (
                        ""
                    )}

                    <div className="ftRow">
                        <div className="ftCol ftLeft">
                            {i18next.t("E-mail")}
                        </div>
                        <div className="ftCol ftRight">{userData.email}</div>
                    </div>
                    <div className="ftRow">
                        <div className="ftCol ftLeft">
                            {i18next.t("Ostatnie logowanie")}
                        </div>
                        <div className="ftCol ftRight">{lastLoginDate}</div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AccountData;
