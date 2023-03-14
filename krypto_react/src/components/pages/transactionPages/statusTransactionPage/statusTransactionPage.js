import React from "react";
import "./statusTransactionPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import Header from "../../../head/header";
import Footer from "../../../foot/footer";
import StatusImg from "./../../../../img/redeem.svg";
import TransactionStatusComponent from "./transactionStatusComponent/transactionStatusComponent";

const StatusTransactionPage = (props) => {
    return (
        <>
            <Helmet>
                <title>{i18next.t("TRANSACTION_STATUS_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("TRANSACTION_STATUS_PAGE_DESC")}
                />
                <link
                    rel="canonical"
                    href={
                        window.location.href.includes("?")
                            ? window.location.href.split("?")[0]
                            : window.location.href
                    }
                />
                <link
                    rel="alternate"
                    hrefLang={"pl"}
                    href={`${process.env.PUBLIC_URL}`}
                />
            </Helmet>
            <Header />
            <div className={"container subPage statusPage  minHeightContainer"}>
                <div className={"narrowContainer"}>
                    <div className={"imgContainer"}>
                        <img src={StatusImg} />
                    </div>
                    <h1>{i18next.t("Status transakcji")}</h1>
                    <div className={"statusBox"}>
                        <TransactionStatusComponent
                            transactionId={props.match.params?.transactionId}
                            returnButton={true}
                        />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default StatusTransactionPage;
