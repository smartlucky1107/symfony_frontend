import React from "react";
import i18next from "i18next";

const getRoute = (name, isRoute) => {
    const appUrl = `${process.env.PUBLIC_URL}`;
    const apiUrl = `${process.env.REACT_APP_API_MAIN}`;
    let lang;
    lang = "/" + i18next.t("lang");

    if (isRoute) {
        lang = "/:lang";
    }
    if (document.location.pathname.search("/en") > -1) {
        i18next.changeLanguage("en");
    } else {
        lang = "";
    }
    // lang = ""; //tutaj podaje się język, jeśli jest jeden, jeśli jest kilka to używa się ifa wyżej

    switch (name) {
        case "api":
            return apiUrl;
            break;

        case "assets":
            return appUrl + "/assets";
            break;

        case "assets/currencies":
            return appUrl + "/assets/currencies/";
            break;

        case "main":
            return appUrl + lang + "/";
            break;

        case "login":
            return appUrl + lang + i18next.t("ROUTE_LOGIN");
            break;

        case "passwordreset":
            return appUrl + lang + i18next.t("ROUTE_PASSWORD_RESET");
            break;

        case "register":
            return appUrl + lang + i18next.t("ROUTE_REGISTER");
            break;

        case "referral":
            return appUrl + lang + i18next.t("ROUTE_REFERRAL");
            break;

        case "registerConfirm":
            return appUrl + lang + i18next.t("ROUTE_REGISTER_CONFIRM");
            break;

        case "howToRegister":
            return appUrl + lang + i18next.t("ROUTE_HOWTOREGISTER");
            break;

        case "howToBuy":
            return appUrl + lang + i18next.t("ROUTE_HOWTO");
            break;

        case "howToBuyBitcoin":
            return appUrl + lang + i18next.t("ROUTE_HOWTOBTC");
            break;

        case "howToBuyEthereum":
            return appUrl + lang + i18next.t("ROUTE_HOWTOETH");
            break;

        case "allCurrencies":
            return appUrl + lang + i18next.t("ROUTE_ALLCURRENCIES");
            break;

        case "redeem":
            return appUrl + lang + i18next.t("ROUTE_REDEEM");
            break;

        case "help":
            return appUrl + lang + i18next.t("ROUTE_HELP");
            break;

        case "contact":
            return appUrl + lang + i18next.t("ROUTE_CONTACT");
            break;

        case "forPartners":
            return appUrl + lang + i18next.t("ROUTE_PARTNERS");
            break;

        case "transactionBuy":
            return appUrl + lang + i18next.t("ROUTE_TRANSACTION_BUY");
            break;
        case "partnerBuy":
            return appUrl + lang + i18next.t("ROUTE_TRANSACTION_BUY_forPartner");
            break;

        case "transactionSell":
            return appUrl + lang + i18next.t("ROUTE_TRANSACTION_SELL");
            break;

        case "transactionExchange":
            return appUrl + lang + i18next.t("ROUTE_TRANSACTION_EXCHANGE");
            break;

        case "transactionStatus":
            return appUrl + lang + i18next.t("ROUTE_TRANSACTION_STATUS");
            break;

        case "aboutUs":
            return appUrl + lang + i18next.t("ROUTE_ABOUT_US");
            break;

        case "verification":
            return appUrl + lang + i18next.t("ROUTE_ABOUT_US");
            break;

        case "terms":
            return appUrl + lang + i18next.t("ROUTE_TERMS");
            break;

        case "warning":
            return appUrl + lang + i18next.t("ROUTE_WARNING");
            break;

        case "cookiePolicy":
            return appUrl + lang + i18next.t("ROUTE_COOKIE_POLICY");
            break;

        case "privacyPolicy":
            return appUrl + lang + i18next.t("ROUTE_PRIVACY_POLICY");
            break;

        case "fees":
            return appUrl + lang + i18next.t("ROUTE_FEES");
            break;

        case "userDashboardWelcome":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARD");
            break;

        case "userDashboardHistory":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDHISTORY");
            break;

        case "userDashboardWorkers":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDWORKERS");
            break;

        case "userDashboardWorkspace":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDWORKSPACE");
            break;
        case "cryptocurrencydirectory":
            return appUrl + lang + i18next.t("ROUTE_TRANSACTION_CRYPTOCURRENCYDIRECTORY");
            break;

        case "userDashboardReferral":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDREFERRAL");
            break;

        case "userDashboardSettings":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDSETTINGS");
            break;

        case "userDashboardVerification":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDVERIFICATION");
            break;

        case "userDashboardWallets":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDWALLETS");
            break;

        case "userDashboardPaymentcards":
            return appUrl + lang + i18next.t("ROUTE_USERDASHBOARDPAYMENTCARDS");
            break;

        case "404":
            return appUrl + lang + i18next.t("ROUTE_404");
            break;

        case "":
            return appUrl + lang;
            break;
    }

    return appUrl + lang;
};

export default getRoute;
