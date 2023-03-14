import React, {useEffect,useState} from "react";
import FlexTable from "../../ui/flexTable/flexTable";
import i18next from "i18next";
import "../../ui/flexTable/flexTable.scss";
import Search from "../../ui/search/search";
import  "./cryptocurrencydirectory.scss";

const CryptoCurrencyDirectory = (props) => {

     const { tableClass, headItems, bodyItems } = props;
     const [walletWithdrawHistory, setWalletWithdrawHistory] = useState();
        return (
            <>
            <div className="container subPage forPartnersPage">
            <div className="cryptoCurTable">
            <div className="topPart">    
            <h3>
               {i18next.t("Katalog Kryptowalut")}
            </h3>

            <Search
                    // filterIn={allCurrenciesRef}
                    id={"searchWallet"}
                    name={"searchWallet"}
                    placeholder={i18next.t("Wyszukaj...")}
                />
            </div>

             <FlexTable 
                            headItems={[
                                {
                                    name: "name",
                                    value: i18next.t("Nazwq"),
                                },
                                {
                                    name: "volumen",
                                    value: i18next.t("Volumen"),
                                },
                                {
                                    name: "price",
                                    value: i18next.t("Cena"),
                                },
                                {
                                    name: "change",
                                    value: i18next.t("Zmiana"),
                                },
                                {
                                    name: "buy",
                                    value: i18next.t("Kup"),
                                },
                                {
                                    name: "sell",
                                    value: i18next.t("Sprzedaj"),
                                },
                            ]}
                            bodyItems={walletWithdrawHistory}
                        ></FlexTable>
               </div>
              </div>
             
            </>
        );
    };
    
  
   
  

export default CryptoCurrencyDirectory;
