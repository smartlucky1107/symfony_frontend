import React, { useContext } from "react";
import i18next from "i18next";

import "./dashboardVerification.scss";
import { UserContext } from "../../../user/userContext";
import UserDashboard from "./../userDashboard";

// import VerificationForm from "./verificationForm/verificationForm";s
// import VerificationJumio from "./verificationJumio/verificationJumio";
// import VerificationAddress from "./verificationAddress/verificationAddress";
// import VerificationSuccess from "./verificationSuccess/verificationSuccess";
// import VerificationBusiness from "./verificationBusiness/verificationBusiness";

import VerificationPersonalUser from "./verificationPersonalUser/verificationPersonalUser";
import VerificationBusinessUser from "./verificationBusinessUser/verificationBusiness/verificationBusiness";

const DashboardVerification = () => {
    const user = useContext(UserContext);

    return (
        <UserDashboard>
            <section className="dashboardVerification">
                <h1 className="stdDashboardHeader">
                    {i18next.t("Weryfikacja konta")}
                </h1>

                <div className="bg-w pt0">
                    {user.data.user.type === 1 || user.data.user.type === 2 ? (
                        <VerificationPersonalUser />
                    ) : (
                        <VerificationBusinessUser />
                    )}
                </div>
            </section>
        </UserDashboard>
    );
};
export default DashboardVerification;
