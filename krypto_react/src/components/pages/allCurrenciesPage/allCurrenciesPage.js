import React, {useRef} from "react";
import "./allCurrenciesPage.scss";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import i18next from "i18next";
import {AllCurrenciesList} from "./allCurrenciesList/allCurrenciesList";
import Search from "../../ui/search/search";

const AllCurrenciesPage = (props) => {
    //return <Redirect to={getRoute('main')}/>
    const allCurrenciesRef = useRef(null);

    return(
        <div className={'allCryptocurrenciesPage'}>
            <Header/>
            <div className={'container subPage cryptocurrenciesList searchBox'}>
                <div className="topBtnSearch">
                <h1>{i18next.t('Znajdź kryptowalutę')}</h1>
                <Search 
                    filterIn={allCurrenciesRef}
                    id={"searchWallet"}
                    name={"searchWallet"}
                    placeholder={i18next.t("Wyszukaj...")}
                />
                </div>
                <div className="listCurrencyTable">
                  <AllCurrenciesList ref={allCurrenciesRef}/>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default AllCurrenciesPage;
