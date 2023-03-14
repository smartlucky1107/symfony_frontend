import React from "react";
import Header from "../../../head/header";
import TransactionTypeSelector from "../transactionTypeSelector/transactionTypeSelector";
import InitialBuyContainer from "../../../transaction/sliderSellBuy/initialBuyContainer";
import Footer from "../../../foot/footer";
import "./../allTransactionPages.scss";
import "./exchangeTransactionPage.scss";

const ExchangeTransactionPage = (props) => {
    return(
        <div className={'transactionPage'}>
            <div className={'transactionPage'}>
                <Header/>
                <div className={'container minHeightContainer'}>
                    <div className={'transactionContainer'}>
                        <TransactionTypeSelector active={3} />

                        <div className={'buySellContainer exchange'}>
                            <InitialBuyContainer/>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default ExchangeTransactionPage;
