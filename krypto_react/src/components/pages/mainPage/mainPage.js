// import React, { useEffect } from "react";
// import getRoute from "../../routing/routingService";
// import Header from "../../head/header";
// import Footer from "../../foot/footer";
// import { SliderSellBuy } from "../../transaction/sliderSellBuy/sliderSellBuy";
// import i18next from "i18next";
// import { Helmet } from "react-helmet";
// import Button from "../../ui/button/button";
// import CryptocurrencyOverviewAllContainer from "./cryptocurrencyOverview/allContainer";
// import AdvantageSection from "./advantageSection/advantageSection";
// import ReferralSection from "./referralSection/referralSection";


import React,{useContext,useEffect,useState} from "react";
import { Redirect } from "react-router-dom";
import Input from "../../ui/input/input";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import getRoute from "../../routing/routingService";
import { Line } from "react-chartjs-2";
import Header from "../../head/header";
import PostThis from "../../../scripts/post";
import { render } from 'react-dom';
// import Toggle from './toogle';
import SellBuySidebar from "../../transaction/sliderSellBuy/sidebar/sidebar"
import CryptocurrencyOverviewAllContainer from "../mainPage/cryptocurrencyOverview/allContainer";
import Footer from "../../foot/footer";

import Select from "../../ui/select/select";
import CryptocurrencyOverviewSingleSmall from "../../../components/pages/mainPage/cryptocurrencyOverview/singleCryptoView";
import Button from "../../ui/button/button";
import { SelectedCurrencyTooltip } from "../../transaction/selectedCurrencyTooltip/selectedCurrencyTooltip";
import ref1 from "../../../img/ref1.svg";
import ref3 from "../../../img/laptop.png";
import contactImg from "../../../img/manon.png";
import kuk from "../../../img/image2.png";
import image3 from "../../../img/image3.png";
import image4 from "../../../img/image4.png";
import calender from "../../../img/calender.png";
import computericon from "../../../img/computericon.png";
import magnifying from "../../../img/magnifying.png";
import InitialBuyContainer from "../../transaction/sliderSellBuy/initialBuyContainer";
import InitialSellContainer from "../../transaction/sliderSellBuy/initialSellContainer";
import bitcoin1 from "../../../img/bitcoin.png";
import { TransactionContext } from "../../transaction/transactionContext";
import { AppContext } from "../../appContext";
import { getChartData, getChartOptions } from "../../../charts/charts";
import Search from "../../ui/search/search";




import "./mainPage.scss";

const MainPage = (props) => {

    const fallingOrRising = parseFloat(props.change) < 0 ? "falling" : "rising";

    const chartData = getChartData(props.priceHistory);
    const chartOptions = getChartOptions();
    const transaction = useContext(TransactionContext);
    const app = useContext(AppContext);
    
    const {
        buyIWantCurrencyList,
        buyIHaveCurrencyList,
        currencyList,
        buyActivePair,
    } = transaction.data;
    const [activeTransactionType, setTransactionType] = useState(0);
    const currentActiveContainer =
    activeTransactionType === 0 ? (
        <InitialBuyContainer isHomepage={true} {...props} />
    ) : (
        <InitialSellContainer isHomepage={true} {...props} />
    );
    const changeTransactionType = (type) => {
        setTransactionType(type);
    };
    const onChangeCurrency = (iHaveORiWant, currencyObject) => {
        const iHaveCurrencyList = transaction.getIHaveCurrencyList(
            currencyObject
        );

        transaction.update({
            //buyLastActive: iHaveORiWant,
            buyActivePair: currencyObject,
            buyIWantAmount: parseFloat(
                parseFloat("0.01").toFixed(
                    currencyObject.currencyPair.baseCurrency.roundPrecision
                )
            ),
            ...iHaveCurrencyList,
        });
    };
    const [currencies, setCurrencies] = useState(null);

    const getCurrencyList = async () => {
        let currencyArray = [];
        try {
            const response = await PostThis(
                "/charting/currencies",
                "GET",
                "",
                ""
            );
            if (response.status >= 200 && response.status < 300) {
                Object.keys(response.data).map((shortName, key) => {
                    response.data[shortName].map((item, keyb) => {
                        currencyArray.push(item);
                    });
                });

                setCurrencies(currencyArray);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const onChangeAmount = (iHaveORiWant, value) => {
        transaction.update({
            buyLastActive: iHaveORiWant,
            [iHaveORiWant + "Amount"]: value,
        });
    };
    const isReadyToProceed = () => {
        if (
            transaction.data.buyIHaveLoading ||
            transaction.data.buyIWantLoading ||
            transaction.data.buyIWantValid !== true ||
            transaction.data.buyIWantAmount === null ||
            transaction.data.buyIHaveAmount === null
        ) {
            return false;
        } else {
            return true;
        }
    };
    
    const onBuyButtonClick = (e) => {
        e.preventDefault();
        if (isReadyToProceed()) {
            transaction.update({
                buyTransactionStep: transaction.data.buyTransactionStep + 1,
            });

            if (props.isHomepage) {
                props.history.push(getRoute("transactionBuy"));
            }
        }
    };
    const changeprops= ()=>{
// alert(1)
 
// props.staticContext ;
console.log(props)
// console.log(active)
    }

    useEffect(() => {
        transaction.update({
            initialBaseCurrency: props.match?.params?.baseCurrency ?? "",
            initialQuotedCurrency: props.match?.params?.quotedCurrency ?? "",
            transactionType: "buy",
            transactionComponentMounted: true,
        });
        getCurrencyList();
    }, []);






    return (
        <div className={"mainPage"}>
            <Helmet>
                <title>{i18next.t("MAIN_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("MAIN_PAGE_DESC")}
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
            {/* <Header roundedCorner /> */}
            <Header />
            
                                                    {/* old home page design strt */}


            {/* <SliderSellBuy {...props} /> */}
            {/* <div className={"mainContent"}>
                <CryptocurrencyOverviewAllContainer />
                <AdvantageSection />
                <ReferralSection />
            </div> */}

                                                    {/* old home page design end */}




{/* new HomePage */}

<div className="container subPage forPartnersPage">
                {/* <h1>{i18next.t("Partnerstwo")}</h1> */}

                {/* <h3 class="dashBrdHeader">
                    <span>
                        {i18next.t("Sprzedawaj kryptowaluty w swoim")}{" "}
                        <strong class="blue">
                            {i18next.t("sklepie stacjonarnym!")}
                        </strong>
                    </span>
                </h3> */}
                <div className="row rowBox">
                    <div className="col col-xl-6 order order-2 order-xl-1">
                        {/* <img src={ref1} className="imgOffset" alt="" /> */}
                        <div>
                            <h1>
                                {/* {i18next.t(
                                    "Sprzedawaj kryptowaluty w swoim sklepie stacjonarnym!"
                                )} */}
                                {i18next.t(
                                    "Najlepsze miejsce kupna i sprzedaży kryptowalut"
                                )}
                                
                            </h1>
                            <p>
                                {/* {i18next.t(
                                    "Korzystaj z błyskawicznych transakcji zakupu i sprzedaży Bitcoin. Wypłacaj środki w wygodny sposób, przelewem na konto. Szybko, łatwo i bezpiecznie, dzięki sprawdzonej platformie."
                                )} */}
                                {i18next.t(
                                    "Korzystaj z błyskawicznych transakcji zakupu i sprzedaży Bitcoin. Wypłacaj środki w wygodny sposób, przelewem na konto. Szybko, łatwo i bezpiecznie, dzięki sprawdzonej platformie."
                                )}
                            </p>
                            {/* <Button className="btn1">
                                {i18next.t("Załóż konto")}
                           </Button> */}
                             <Button className="btn1"
                                    to={getRoute("register")}
                                    rightIcon={"arrow_forward"}
                                >
                                    {i18next.t("Załóż konto")}
                                </Button>
                        </div>
                    </div>
                    <div className="col col-xl-6 order order-xl-2 alignCenter h-center" >
                        {/* <div>
                            <h3>
                                {i18next.t(
                                    "Sprzedawaj kryptowaluty w swoim sklepie stacjonarnym!"
                                )}
                            </h3>
                            <p>
                                {i18next.t(
                                    "Dołącz do sieci kantorów kryptowaluty.pl. Błyskawicznie sprzedawaj oraz kupuj najpopularniejsze kryptowaluty w punktach stacjonarnych."
                                )}
                            </p>
                        </div> */}

       <div className="tabss">          
            <SellBuySidebar
                         changeTransactionType={changeTransactionType}
                         activeTransactionType={activeTransactionType}
                       
                         transactionTypes={[
                            i18next.t("Kup"),
                            
                            i18next.t("Sprzedaj"),
                                ]}
                            />
        </div>
      <div>
            {currentActiveContainer}
      </div>
   
    </div>
        </div>
             <div className="row rowBox mt-4">
                    <div className="col col-xl-4">
                      <div className="mapcrypto">
                        <CryptocurrencyOverviewAllContainer />
                     </div>

                    </div>
                 
                    <div className="col col-xl-4">
                        <div>
                        <div>
                            
                       
                        </div>
                        </div>
                    </div>
                  
                </div>

                {/* <div class="row h-center offsetTop"><a class="kBtn " href="/cryptocurrency-list">
                    <div class="kBtnInner"><div class="text">Show all</div>
                    <div class="rightIcon"><span class="material-icons">more_horiz</span></div>
                    </div></a>
                 </div> */}


                <div className="row rowBox">
                    <div className="col col-xl-6">
                    <h1>
                         {i18next.t(
                            "Kup kryptowalut W 3 krokach"
                        )}
                     </h1>
                    <div className="row rowBox">
                      
                    <div className="col col-xl-3 alignCenter"> <img src={calender} className="imgOffset" alt="" /></div>
                      <div className="col col-xl-9">
                      <p> {i18next.t(
                             "Z dostępnej listy wybierz interesującą Cię kryptowalutę. Następnie wpisz liczbę wirtualnych tokenów lub kwotę, którą chcesz przeznaczyć na zakup. Kurs jest aktualizowany na bieżąco."
                          )}</p>
                      </div>
                    </div>
                    <div className="row rowBox mt1">
                      
                      <div className="col col-xl-3 alignCenter"> <img src={computericon} className="imgOffset" alt="" /></div>
                        <div className="col col-xl-9">
                        <p> {i18next.t(
                               "Uzupełnij dane szczegółowe swojej płatności. Pamiętaj, by podać poprawny adres porttfela kryptowalutowego oraz danych personalnych!"
                            )}</p>
                        </div>
                      </div>
                      <div className="row rowBox mt1">
                      
                      <div className="col col-xl-3 alignCenter"> <img src={magnifying} className="imgOffset" alt="" /></div>
                        <div className="col col-xl-9">
                           <p> {i18next.t(
                               "Kryptowaluty są wysyłane automatycznie na podany w formularzu adres portfela. Dodatkowo na adres e-mail otrzymasz wiadomość, pozwalającą Ci śledzić status transakcji na platformie."
                            )}</p>
                        </div>
                      </div>
                       
                    </div>
                    <div className="col col-xl-6 alignCenter">
                        <img src={ref3} className="imgOffset" alt="" />
                    </div>
                </div>
                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6 order order-2 order-xl-2">
                        <img src={contactImg} className="imgOffset" alt="" />
                    </div>
                    <div className="col col-xl-6 order order-xl-1 alignCenter ">
                        <div>
                            <h1>
                                {i18next.t(
                                    "Polecaj i zarabiaj!"
                                )}
                            </h1>
                            <p>
                                {i18next.t(
                                    "Nasza platforma wymiany kryptowalut oferuje prosty oraz transparentny system poleceń. Jako polecający otrzymujesz procentowy zysk z każdej transakcji dokonanej przez osobę poleconą. Dołącz do programu poleceń już dzisiaj i czerp zyskiz uzyskanej prowizji!"
                                )}
                            </p>
                            {/* <Button className="btn1">
                               {i18next.t("Zacznij zarabiać")}
                            </Button> */}
                             <Button className="btn1"
                            to={getRoute("userDashboardReferral")}
                            rightIcon={"arrow_forward"}    
                             >
                            {i18next.t("Zacznij zarabiać")}
                        </Button>
                        </div>
                    </div>
                </div>

                <div className="row rowBox offsetTop">          
                    <div className="col col-xl-6 order order-xl-2 alignCenter ">   
                        <div>               
                            <h1>
                                {i18next.t(
                                    "Korzystny kurs!"
                                )}
                            </h1>
                            <p>
                                {i18next.t(
                                    "W swoim portfolio mamy całą gamę najpopularniejszych kryptowalut. Zapewniamy najbardziej korzystne kursy sprzedaży i kupna. Dla Twojej wygody na bieżąco aktualizujemy kursy walut."
                                )}
                            </p>
                    </div>
                    </div> 
                    <div className="col col-xl-6 order order-2 order-xl-1">
                        <img src={kuk} className="imgOffset" alt="" />
                    </div>
                    
                </div>
                <div className="row rowBox offsetTop">          
                    <div className="col col-xl-6 order order-xl-1 alignCenter ">   
                        <div>               
                            <h1>
                                {i18next.t(
                                    "Błyskawiczne transackje"
                                )}
                            </h1>
                            <p>
                                {i18next.t(
                                    "Zakupione kryptowaluty od razu po odnotowaniu płatności są wysyłane na adres Twojego portfela. Transakcje realizowane są w najszybszy możliwy sposób przy użyciu zautomatyzowanego systemu."
                                )}
                            </p>
                    </div>
                    </div> 
                    <div className="col col-xl-6 order order-2 order-xl-2">
                        <img src={image3} className="imgOffset" alt="" />
                    </div>
                    
                </div>

                <div className="row rowBox offsetTop">          
                    <div className="col col-xl-6 order order-xl-1">   
                        <img src={image4} className="imgOffset" alt="" />
                    </div> 
                    <div className="col col-xl-6 order order-2 order-xl-2 alignCenter">                     
                        <div>               
                            <h1>
                                {i18next.t(
                                    "Gwarancja bezpieczeństwa"
                                )}
                            </h1>
                            <p>
                                {i18next.t(
                                    "Stawiamy na najnowocześniejsze zabezpieczenia technologiczne. Działamy legalnie, postępujemy zgodnie z wytyczonymi procedurami oraz posiadamy stosowne licencje. Twoje dane personalne są zabezpieczane w strzeżonym systemie."
                                )}
                            </p>
                            
                           
                      </div>
                     </div>                  
                </div>

                <div className="row rowBox offsetTop">          
                    <div className="col col-xl-6 order order-xl-1"> 
                    <h1>
                        {i18next.t(
                             "Wymieniaj gdziekolwiek jestes, kup Bitcoina juz dzis!"
                        )}
                    </h1>  
                      
                    </div> 
                    <div className="col col-xl-6 order order-2 order-xl-2 alignCenter just-center">     

                      {/* <Search placeholder={i18next.t("Wyszukaj...")} /> */}
                      <div class="sendMail"><input class="mailinput" type="text" placeholder="Give me e-mail address"/><button><span class="material-icons">arrow_forward</span></button></div>

                    </div>                  
                </div>



            </div>





            <Footer />
        </div>
    );
};

export default MainPage;
