import React, { useContext, useEffect, useState } from "react";
import "./redeemInside.scss";
import FundsAdded from "./../../../../img/funds_added.svg";
import { UserContext } from "../../../user/userContext";
import IsNotLoggedIn from "../../loginPage/isNotLoggedIn/isNotLoggedIn";
import { AppContext } from "../../../appContext";
import Loader from "../../../ui/loader/loader";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import getRoute from "../../../routing/routingService";

const RedeemInside = (props) => {
    const user = useContext(UserContext);
    const app = useContext(AppContext);

    const [realised, setRealised] = useState(false);

    console.log(user);
    if (user.data.user === null) {
        return (
            <div className={"redeemInside"}>
                <div className={"narrowContainer"}>
                    <IsNotLoggedIn alert={"toContinue"} />
                </div>
            </div>
        );
    } else {
        if (realised) {
            return (
                <div className={"redeemInside"}>
                    <div className={"redeemInsideContent centerflex"}>
                        <div className={"imgContainer"}>
                            <img src={FundsAdded} />
                        </div>
                        <div className={"textContainer"}>
                            <div className={"text"}>
                                {i18next.t(
                                    "Środki zostały pomyślnie przetransferowane!"
                                )}
                            </div>
                            <Button
                                blue
                                rightIcon={"account_balance_wallet"}
                                to={getRoute("userDashboardWallets")}
                            >
                                {i18next.t("Przejdź do portfela")}
                            </Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            setTimeout(() => {
                setRealised(true);
            }, 4000);

            return (
                <div className={"redeemInside"}>
                    <div className={"redeemInsideContent"}>
                        <Loader label={i18next.t("Trwa transfer środków...")} />
                    </div>
                </div>
            );
        }
    }
};

export default RedeemInside;
