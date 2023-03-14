import React, {useContext, useEffect, useState} from "react";
import Header from "../../../head/header";
import Footer from "../../../foot/footer";
import {TransactionContext} from "../../../transaction/transactionContext";
import InitialBuyContainer from "../../../transaction/sliderSellBuy/initialBuyContainer";
import "./../allTransactionPages.scss";
import "./buyTransactionPage.scss";
import TransactionTypeSelector from "../transactionTypeSelector/transactionTypeSelector";
import IsNotLoggedIn from "../../loginPage/isNotLoggedIn/isNotLoggedIn";
import {UserContext} from "../../../user/userContext";
import PaymentSelector from "../../../transaction/paymentSelector/paymentSelector";
import i18next from "i18next";
import {Helmet} from "react-helmet";
import {VerificationChecker} from "../../../user/verificationChecker/verificationChecker";

const BuyTransactionPage = (props) => {
    const transaction = useContext(TransactionContext);
    const user = useContext(UserContext);

    useEffect(() => {
        return () => {
            transaction.reset();
        }
    }, []);

    const renderView = () => {
        switch (transaction.data.buyTransactionStep){
            case 1:
                return <InitialBuyContainer {...props}/>;
                break;

            case 2:
                if(user.data?.user === null) {
                    return <IsNotLoggedIn alert={'toContinue'}/>;
                }else{
                    return <VerificationChecker><PaymentSelector /></VerificationChecker>;
                }
                break;

            default:
                return null;
                break;
        }
    }
    const currentUrl = window.location.href.includes("?")
        ? window.location.href.split("?")[0]
        : window.location.href;

    return (
        <div className={'transactionPage'}>
            <Helmet>
                <title>{i18next.t("BUY_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("BUY_PAGE_DESC")}
                />
                <link
                    rel="canonical"
                    href={currentUrl}
                />
                <link
                    rel="alternate"
                    hrefLang={i18next.language}
                    href={currentUrl}
                />
            </Helmet>
            <Header/>
            <div className={'container minHeightContainer'}>
                <div className={'narrowContainer transactionContainer'}>
                    <TransactionTypeSelector active={1} />
                    <div className={'buySellContainer buy'}>
                        {renderView()}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default BuyTransactionPage;
