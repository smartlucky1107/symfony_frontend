import React from "react";
import { Redirect } from "react-router-dom";

import i18next from "i18next";
import { Helmet } from "react-helmet";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import "./forPartners.scss";

import Button from "../../ui/button/button";

// import ref1 from "../../../img/ref1.svg";
import ref1 from "../../../img/referal.png";
// import ref3 from "../../../img/ref3.svg";
import ref3 from "../../../img/worth.png";
// import contactImg from "../../../img/pageImg/contact.svg";
import contactImg from "../../../img/customersupport.png";

const ForPartners = () => {
    return (
        <>
            <Helmet>
                <title>{i18next.t("FOR_PARTNERS_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("FOR_PARTNERS_PAGE_DESC")}
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
            <div className="container subPage forPartnersPage">
                <h1>{i18next.t("Partnerstwo")}</h1>

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
                        <img src={ref1} className="imgOffset" alt="" />
                    </div>
                    <div className="col col-xl-6 order order-xl-2 alignCenter textCenter">
                        <div>
                            <h3 className="themecolor">
                                {i18next.t(
                                    "Najlepsze miejsce kupna i sprzedaży kryptowalut"
                                )}
                            </h3>
                            <p>
                                {i18next.t(
                                    "Dołącz do sieci kantorów kryptowaluty.pl. Błyskawicznie sprzedawaj oraz kupuj najpopularniejsze kryptowaluty w punktach stacjonarnych."
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6 ">
                        <div>
                            <h3 className="themecolor">
                                {i18next.t(
                                    "Kto może zostać partnerem kryptowaluty.pl?"
                                )}
                            </h3>
                            <p>
                                {i18next.t(
                                    "Jesteś właścicielem kantoru lub innego punktu stacjonarnego? Wyprzedź konkurencję, wdrażając innowacyjną technologię."
                                )}
                            </p>
                            <p>
                                {i18next.t(
                                    "Poszerz swoją ofertę wymiany walut o topowe kryptowaluty. Dbamy o kwestie bezpieczeństwa – przeprowadzamy procedurę KYC, dzięki zautomatyzowanemu systemowi."
                                )}
                            </p>
                            <p>
                                {i18next.t(
                                    "Sama transakcja wymiany realizowana jest w ciągu kilku minut. Na każdym etapie jesteśmy do Twojej dyspozycji w razie bardziej szczegółowych pytań. Przeprowadzamy przez cały proces implementacji, a później świadczymy kompleksowe wsparcie. "
                                )}
                            </p>
                        </div>
                    </div>
                    <div className="col col-xl-6">
                        <h3 className="themecolor">{i18next.t("Jak wygląda proces wdrożenia?")}</h3>
                        <p>
                            {i18next.t(
                                "Jest on bardzo prosty! Do Twojej dyspozycji jest indywidualny konsultant, który przeprowadza Cię krok po kroku przez cały proces implementacji technologii."
                            )}
                        </p>
                        <p>
                            {i18next.t(
                                "Do obsługi aplikacji potrzebujesz jedynie urządzenia z dostępem do internetu oraz konta na platformie kryptowaluty.pl. Dostarczone oprogramowanie otrzymujesz od nas zupełnie bezpłatnie."
                            )}
                        </p>

                        <p>
                            {i18next.t(
                                "Obsługa systemu do wymiany jest przyjazna użytkownikowi i nie sprawia żadnych problemów. Dodatkowo przed uruchomieniem infrastruktury przesyłamy materiały instruktażowe oraz gwarantujemy wsparcie techniczne naszego supportu."
                            )}
                        </p>
                    </div>
                </div>
                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6 alignCenter">
                        <div>
                            <h3 className="themecolor">
                                {i18next.t(
                                    "Dlaczego warto postawić na kryptowaluty.pl?"
                                )}
                            </h3>
                            <ul className="customList numberList">
                                <li>
                                    <span>1</span>
                                    {i18next.t(
                                        "wymiana kryptowalut na tradycyjne waluty"
                                    )}
                                </li>
                                <li>
                                    <span>2</span>
                                    {i18next.t(
                                        "korzystać z bezpiecznego konta na stronie"
                                    )}
                                </li>
                                <li>
                                    <span>3</span>
                                    {i18next.t(
                                        "przechowuj krypto na darmowym portfelu krypto"
                                    )}
                                </li>
                                <li>
                                    <span>4</span>
                                    {i18next.t(
                                        "przeprowadzaj automatyczną weryfikację"
                                    )}
                                </li>
                                <li>
                                    <span>5</span>
                                    {i18next.t(
                                        "realizuj transakcje do kilku minut"
                                    )}
                                </li>
                                <li>
                                    <span>6</span>
                                    {i18next.t(
                                        "wdróż infrastrukturę zupełnie za darmo"
                                    )}
                                </li>
                                <li>
                                    <span>7</span>
                                    {i18next.t(
                                        "skorzystaj z pomocy konsultanta oraz supportu"
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col col-xl-6">
                        <img src={ref3} className="imgOffset" alt="" />
                    </div>
                </div>
                <div className="row rowBox offsetTop">
                    <div className="col col-xl-6 order order-2 order-xl-1">
                        <img src={contactImg} className="imgOffset" alt="" />
                    </div>
                    <div className="col col-xl-6 order order-xl-2 alignCenter textCenter">
                        <div>
                            <h3 className="themecolor">
                                {i18next.t(
                                    "Skontaktuj się z nami i nawiąż współpracę!"
                                )}
                            </h3>
                            <p>
                                {i18next.t(
                                    "Dołącz do sieci kantorów kryptowaluty.pl i sprzedawaj najpopularniejsze kryptowaluty w punktach stacjonarnych."
                                )}
                            </p>
                            <p>
                                {i18next.t(
                                    "Wystarczy, że wyślesz wiadomość poprzez zakładkę Kontakt. Nasz specjalista odezwie się do Ciebie tak szybko jak to możliwe, aby ustalić szczegóły współpracy."
                                )}
                            </p>

                            <Button to={getRoute("contact")} rightIcon={"send"}>
                                {i18next.t("Wyślij zgłoszenie")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ForPartners;
