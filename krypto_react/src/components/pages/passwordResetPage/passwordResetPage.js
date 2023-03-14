import React from "react";
import {Helmet} from "react-helmet";
import i18next from "i18next";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import PasswordResetBox from "./passwordResetBox/passwordResetBox";

const PasswordResetPage = () => {
    return(
        <div className={'loginPage'}>
            <Helmet>
                <title>{i18next.t("PASSWORD_RESET_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("PASSWORD_RESET_PAGE_DESC")}
                />
            </Helmet>
            <Header/>
            <div className={'container minHeightContainer'}>
                <div className={'narrowContainer'}>
                   <PasswordResetBox />
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PasswordResetPage;
