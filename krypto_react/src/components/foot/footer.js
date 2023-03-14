import React from "react";
import { Link } from "react-router-dom";

import i18next from "i18next";
import getRoute from "../routing/routingService";
import RoundIcon from "../ui/roundicon/roundIcon";
import "./footer.scss";

import fbIcon from "../../img/social-fb.svg";
import twIcon from "../../img/social-twitter.svg";
import teIcon from "../../img/social-telegram.svg";
import linked from "../../img/linkedin.png";
import send from "../../img/send.png";
import twitter from "../../img/twitter.png";

const Footer = (props) => {
    // const MAIN_PAGE_TITLE = i18next.t("MAIN_PAGE_TITLE");

    let year = new Date();
    year = year.getFullYear();

    return (
        <>
            {/* <div className="footerExtension"> */}
            <div className="footerExtension">
                <div className="container">
                    <div className="row wrapflex">
                        <div className="col">
                            {/* <div className="contentBox">
                                <div className="contentIconBox">
                                    <RoundIcon btype="Dashed" icon="lock" />
                                </div>
                                <p>
                                    {i18next.t(
                                        "Portal kryptowaluty.pl dba o wygodę i bezpieczeństwo swoich klientów, dlatego funkcjonuje zgodnie z wyznaczonymi normami bezpieczeństwa finansowego oraz korzysta z szeregu systemów szyfrujących dane (HTTPS, TLS, algorytmy szyfrujące). Dodatkowo Partneria sp. z.o.o. właściciel serwisu kryptowaluty.pl jest podmiotem regulowanym przez Urząd Komisji Nadzoru Finansowego wpisanym do rejestru Małych Instytucji Płatniczych pod numerem MIP88/2021. Dokonując transakcji na platformie kryptowaluty.pl masz pewność, że Twoje środki są bezpieczne."
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="col">
                            <nav className="footerNavigation">
                                <ul className="navList">
                                    <li>
                                        <Link to={getRoute("aboutUs")}>
                                            {i18next.t("O nas")}
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to={getRoute("verification")}>
                                            {i18next.t("Weryfikacja")}
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to={getRoute("howToBuyBitcoin")}>
                                            {i18next.t("Jak kupić bitcoina?")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={getRoute("contact")}>
                                            {i18next.t("Kontakt")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={getRoute("help")}>
                                            {i18next.t("Pomoc")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={getRoute("fees")}>
                                            {i18next.t("Tabela opłat")}
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to={getRoute("terms")}>
                                            {i18next.t("Regulamin")}
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to={getRoute("warning")}>
                                            {i18next.t("Ostrzeżenie")}
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to={getRoute("cookiePolicy")}>
                                            {i18next.t("Polityka cookies")}
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link to={getRoute("privacyPolicy")}>
                                            {i18next.t("Polityka prywatności")}
                                        </Link>
                                    </li>
                                </ul>
                            </nav> */}


                                      
                        <Link className="footerLink" to={getRoute("aboutUs")}>
                                {i18next.t("O nas")}
                        </Link>
                        </div>
                        <div className="col">
                           <Link className="footerLink" to={getRoute("howToBuyBitcoin")}>
                                {i18next.t("Jak kupić bitcoina?")}
                            </Link>
                         </div>
                        <div className="col">
                        <Link className="footerLink" to={getRoute("contact")}>
                              {i18next.t("Kontakt")}
                          </Link>
                        </div>
                       
                        <div className="col">
                            <Link className="footerLink" to={getRoute("terms")}>
                               {i18next.t("Regulamin")}
                            </Link>
                        </div>
                        <div className="col">
                        <Link className="footerLink" to={getRoute("fees")}>
                             {i18next.t("Tabela opłat")}
                        </Link>
                       
                        </div>
                        <div className="col">
                           <Link className="footerLink" to={getRoute("help")}>
                                {i18next.t("Pomoc")}
                           </Link>
                        </div>
                        <div className="col">
                        {/* {i18next.t("Polityka prywatności")} */}
                        <Link className="footerLink" to={getRoute("privacyPolicy")}>
                            {i18next.t("Polityka prywatności")}
                        </Link>
                        </div>
                      
                        

                </div>
               

 <div className="row footer">
    <ul className="icon">
     <li class=""><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
        </svg>
    </li>

    <li><img src={linked} className="imgOffset" alt="" /></li>

     <li><img src={twitter} className="imgOffset" alt="" /></li>

    <li><img src={send} className="imgOffset" alt="" /></li>

   </ul>
                    
  </div>


     </div>
</div>
{/* 
            <footer className="container mainFooter">
                <div className="row">
                    <div className="col">
                        <p>Copyright &#169; {year}</p>
                    </div>
                    <div className="col">
                        <ul className="socialMediaList">
                            <li>
                                <a
                                    href="https://www.facebook.com/PLKryptowaluty"
                                    about={"_blank"}
                                    title={"Facebook kryptowaluty.pl"}
                                >
                                    <span class="material-icons">facebook</span>
                                    <img
                                        src={fbIcon}
                                        alt="facebook-kryptowaluty.pl"
                                    />
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://twitter.com/pl_kryptowaluty"
                                    title={"Twitter kryptowaluty.pl"}
                                    about={"_blank"}
                                >
                                    <img
                                        src={twIcon}
                                        alt="twitter-kryptowaluty.pl"
                                    />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer> 
 */}



            
        </>
    );
};

export default Footer;
