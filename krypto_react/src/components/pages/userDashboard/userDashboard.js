import React, { useRef, useEffect, useContext } from "react";

import Header from "../../head/header";
import Footer from "../../foot/footer";
import UserBox from "../../ui/userBox/userBox";
import DashboardNav from "./dashboardNav/dashboardNav";
import getRoute from "../../routing/routingService";

import "./userDashboard.scss";
import PhoneRequiredModal from "../../modals/phoneModal/phoneModal";
import NewsletterModal, {
    handleCloseNewsletterModal,
    handleShowNewsletterModal,
} from "../../modals/newsletterModal/newsletterModal";
import { UserContext } from "../../user/userContext";

import MobileNavModal from "../../modals/mobileNavModal/mobileNavModal";

const UserDashboard = (props) => {
    const user = useContext(UserContext);
    const newsletterModalRef = useRef(null);

    useEffect(() => {
        handleShowNewsletterModal(newsletterModalRef);
    }, []);

    return (
        <>
            <Header />

            <div className="userDashboard">
                <div className="container">
                    <div className="row">
                        <div className="leftSide dashSidebar">
                            <div className="sticky">
                                <UserBox
                                    to={getRoute("userDashboardWelcome")}
                                />
                                <DashboardNav />
                            </div>
                        </div>

                        <div className="rightSide dashBody">{props.children}</div>
                    </div>
                </div>
            </div>

            {user.data.user.isPhoneConfirmed ? null : <PhoneRequiredModal />}

            {/* <NewsletterModal
                handleCloseNewsletterModal={handleCloseNewsletterModal}
                ref={newsletterModalRef}
            /> */}
            <MobileNavModal />
            <Footer />
        </>
    );
};

export default UserDashboard;
