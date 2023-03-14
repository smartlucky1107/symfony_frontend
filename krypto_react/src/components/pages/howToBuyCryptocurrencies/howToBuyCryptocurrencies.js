import React from "react";
import "./howToBuyCryptocurrencies.scss";
import "./../subPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";

const HowToBuyCryptocurrenciesPage = () => {
    //return <Redirect to={getRoute('main')}/>
    return (
        <>
            <Helmet>
                <title>
                    {i18next.t("HOWTOBUYCRYPTOCURRENCIES_PAGE_TITLE")}
                </title>
                <meta
                    name="description"
                    content={i18next.t("HOWTOBUYCRYPTOCURRENCIES_PAGE_DESC")}
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
            <div className={"container subPage howToBuy"}>
                <h1>{i18next.t("Jak kupić kryptowaluty")}</h1>
                <div className={"subPage_ImportantText"}>
                    {i18next.t(
                        "Kupuj kryptowaluty po najkorzystniejszym kursie w naszym kantorze online. Wymieniaj kryptowaluty w kilku prostych krokach!"
                    )}
                </div>
                <div className={"subPage_SectionText"}>
                    <div className={"sectionText_defaultSection"}>
                        <header>
                            {i18next.t(
                                "Czego potrzebuję do zakupu lub sprzedaży kryptowalut?"
                            )}
                        </header>
                        <ul>
                            <li>
                                {i18next.t(
                                    "Konta na platformie kryptowaluty.pl"
                                )}
                            </li>
                            <li>
                                {i18next.t(
                                    "Dostępnych środków w portfelu kantorowym lub na Twoim koncie bankowym."
                                )}
                            </li>
                        </ul>
                    </div>

                    <div className={"sectionText_miniSection"}>
                        <header>{i18next.t("1. Kupuj lub sprzedawaj")}</header>
                        <p>
                            {i18next.t(
                                "W kantorze kryptowaluty.pl możesz kupować i sprzedawać kryptowaluty. Przed rozpoczęciem transakcji wybierz operację, którą chcesz wykonać."
                            )}
                        </p>
                    </div>
                    <div className={"sectionText_miniSection"}>
                        <header>{i18next.t("2. Wybierz kryptowalutę")}</header>
                        <p>
                            {i18next.t(
                                "Po prawej stronie interfejsu znajdują się dostępne kryptowaluty. W panelu możesz sprawdzić aktualną cenę kupna lub sprzedaży coina."
                            )}
                        </p>
                    </div>
                    <div className={"sectionText_miniSection"}>
                        <header>
                            {i18next.t("3. Wybierz walutę fiducjarną")}
                        </header>
                        <p>
                            {i18next.t(
                                "W panelu wybierz walutę fiducjarną, która będzie użyta do płatności lub wymieniona na kryptowalutę.."
                            )}
                        </p>
                    </div>
                    <div className={"sectionText_miniSection"}>
                        <header>
                            {i18next.t("4. Uzupełnij informacje o płatności")}
                        </header>
                        <p>
                            {i18next.t(
                                "Określ liczbę kryptowalut, które chcesz kupić lub sprzedać. Następnie podaj szczegóły swojej płatności."
                            )}
                        </p>
                    </div>
                    <div className={"sectionText_miniSection"}>
                        <header>{i18next.t("5. To wszystko!")}</header>
                        <p>
                            {i18next.t(
                                "Gotowe! Postępuj zgodnie z dalszymi wskazówkami na stronie operatora płatności. Ponadto na Twój adres e-mail zostanie wysłana wiadomość ze szczegółami zamówienia. Transakcja zostanie przetworzona przez zautomatyzowany system, dlatego Bitcoin znajdzie się błyskawicznie na Twoim portfelu."
                            )}
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HowToBuyCryptocurrenciesPage;
