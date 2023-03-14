import React, {useContext, useEffect} from "react";
import Header from "../../../head/header";
import TransactionTypeSelector from "../transactionTypeSelector/transactionTypeSelector";
import Footer from "../../../foot/footer";
import "./../allTransactionPages.scss";
import "./sellTransactionPage.scss";
import InitialSellContainer from "../../../transaction/sliderSellBuy/initialSellContainer";
import IsNotLoggedIn from "../../loginPage/isNotLoggedIn/isNotLoggedIn";
import {TransactionContext} from "../../../transaction/transactionContext";
import {UserContext} from "../../../user/userContext";
import SellFinalization from "../../../transaction/sellFinalization/sellFinalization";
import i18next from "i18next";
import {Helmet} from "react-helmet";
import {VerificationChecker} from "../../../user/verificationChecker/verificationChecker";

const SellTransactionPage = (props) => {
    const user = useContext(UserContext);
    const transaction = useContext(TransactionContext);

    useEffect(() => {
     return () => {
         transaction.reset();
     }
    }, [])

    const renderView = () => {
        switch (transaction.data.sellTransactionStep){
            case 1:
                return <InitialSellContainer  {...props}/>;
                break;

            case 2:
                if(user.data?.user === null) {
                    return <IsNotLoggedIn alert={'toContinue'}/>;
                }else{
                    return <VerificationChecker><SellFinalization /></VerificationChecker>;
                }
                break;

            default:
                return null;
                break;
        }
    }
    return(
        <div className={'transactionPage'}>
            <Helmet>
                <title>{i18next.t("SELL_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("SELL_PAGE_DESC")}
                />
            </Helmet>
            <Header/>
            <div className={'container minHeightContainer'}>
                <div className={'narrowContainer transactionContainer'}>
                    <TransactionTypeSelector active={2} />

                    <div className={'buySellContainer sell'}>
                        {renderView()}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default SellTransactionPage;
