import React, { useContext, useState } from "react";
import i18next from "i18next";

import ErrorImg from "../../../../img/error.svg";

import { UserContext } from "../../../user/userContext";
import PostThis from "../../../../scripts/post";
import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";

import "./walletsDeniedNotification.scss";

const WalletsDeniedNotification = () => {
    const user = useContext(UserContext);
    const [walletsAgreeValue, setWalletsAgreeValue] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        let response;
        response = await PostThis(
            `/api/users/me/virtual-wallet/${walletsAgreeValue}`,
            "PATCH",
            {},
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                user.reload();
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    return (
        <>
            <div className={"walletsDeniedNotification"}>
                <div className={"walletsDeniedNotificationBoxWrapper"}>
                    <div className={"walletsDeniedNotificationImg"}>
                        <img src={ErrorImg} />
                    </div>
                    <div className={"walletsDeniedNotificationBox error"}>
                        <div className={"walletsDeniedNotificationTitle"}>
                            {i18next.t("Usługa portfeli została zablokowana")}
                        </div>
                        <div className={"walletsDeniedNotificationContent"}>
                            {i18next.t(
                                "Zgodnie z wybraną przez ciebie opcją usługa portfeli została wstrzymana na okres 14 dni."
                            )}
                        </div>

                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="kInput">
                                <input
                                    type="radio"
                                    id="before"
                                    value="1"
                                    required
                                    onChange={(e) =>
                                        setWalletsAgreeValue(e.target.value)
                                    }
                                />
                                <label htmlFor="before">
                                    {i18next.t(
                                        "Rozpoczynam korzystanie z wirtualnego portfela"
                                    )}{" "}
                                    <strong>{i18next.t("natychmiast")}</strong>{" "}
                                    {i18next.t("i rozumiem, że")}{" "}
                                    <strong>
                                        {i18next.t(
                                            "nie będę mógł odstąpić od umowy"
                                        )}
                                    </strong>{" "}
                                    {i18next.t(
                                        "w zakresie usługi portfela wirtualnego."
                                    )}
                                </label>
                            </div>
                            <div className="textCenter">
                                <Button blue type="submit">
                                    {i18next.t("Potwierdzam")}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WalletsDeniedNotification;
