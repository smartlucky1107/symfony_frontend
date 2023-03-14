import React, { useContext, useEffect, useState } from "react";
import "./redeemPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import Header from "../../head/header";
import Footer from "../../foot/footer";

import Loader from "../../ui/loader/loader";

import { RedeemContext } from "./redeemContext";
import SmsCode from "./smsCode/smsCode";
import ChooseRedeemType from "./chooseRedeemType/chooseRedeemType";
import SecondSmsCode from "./secondSmsCode/secondSmsCode";
import RedeemInside from "./redeemInside/redeemInside";
import RedeemOutside from "./redeemOutside/redeemOutside";
//https://localhost:3000/odbierz/123/123

import SmsImg from "../../../img/sms.svg";
import RedeemImg from "../../../img/redeem.svg";
import SmsImg2 from "../../../img/sms2.svg";

const RedeemPage = (props) => {
    const currentUrl = window.location.href.includes("?")
        ? window.location.href.split("?")[0]
        : window.location.href;

    const redeem = useContext(RedeemContext);

    /*
    /api-public/pos/redeem/order/{signature}/{redeemHash} - get info about pos
    /api-public/pos/redeem/order/{signature}/{redeemHash}/resend-sms - resend sms
    /api-public/pos/redeem/order/{signature}/{redeemHash}/external-wallet
     */
    const renderStep = () => {
        switch (redeem.data.currentStep) {
            case 1:
                return <SmsCode {...props} mainImg={SmsImg} />;
                break;
            case 2:
                return <ChooseRedeemType {...props} mainImg={RedeemImg} />;
                break;
            case 3:
                return <SecondSmsCode {...props} mainImg={SmsImg2} />;
                break;
            case 4:
                if (redeem.data.redeemType === 0) {
                    return <RedeemInside />;
                } else {
                    return <RedeemOutside />;
                }
                break;
        }
    };

    useEffect(() => {
        redeem.reset();
    }, []);

    return (
        <div className={"redeemPage"}>
            <Helmet>
                <title>{i18next.t("REDEEM_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("REDEEM_PAGE_DESC")}
                />
                <link rel="canonical" href={currentUrl} />
                <link
                    rel="alternate"
                    hrefLang={i18next.language}
                    href={currentUrl}
                />
            </Helmet>
            <Header />
            <div className={"contentSection"}>
                {redeem.data.isLoading ? (
                    <Loader absolute label={i18next.t("Przetwarzanie")} />
                ) : null}
                {renderStep()}
            </div>
            <Footer />
        </div>
    );
};

export default RedeemPage;
