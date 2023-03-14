import React from "react";
import {Helmet} from "react-helmet";
import i18next from "i18next";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import "./../passwordResetPage/passwordResetPage.scss";
import PasswordResetConfirmBox from "./passwordResetConfirmBox/passwordResetConfirmBox";

const PasswordResetConfirmPage = (props) => {
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
                   <PasswordResetConfirmBox {...props}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default PasswordResetConfirmPage;
