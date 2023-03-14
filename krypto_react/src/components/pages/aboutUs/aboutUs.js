import React from "react";
import "./aboutUs.scss";
import "./../subPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import onass from "../../../img/onass.png";

const AboutUsPage = () => {
    return (
        <>
            <Helmet>
                <title>{i18next.t("ABOUTUS_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("ABOUTUS_PAGE_DESC")}
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
            <div className={"container subPage aboutUs"}>
                <h1 className="mb0">{i18next.t("O nas")}</h1>
                <div className="aboutusimg">
                  <img src={onass} className="imgOffset" alt="" />
                </div>
                <div className={"subPage_SectionText"}>
                    <div className={"sectionText_defaultSection"}>
                        <p>
                            {i18next.t(
                                "Być może myślałeś o inwestycji w kryptowaluty, ale zagadnienie to wydało Ci się zbyt skomplikowane? A może słyszałeś o wielkim boomie na Bitcoina, który właśnie się odbywa i chciałbyś wziąć w nim udział? Może uważasz, że już za późno na zakup “cyfrowego złota”?"
                            )}
                        </p>
                        <p>
                            {i18next.t(
                                "Nic bardziej mylnego! Poznaj kryptowaluty.pl – biznes wykorzystujący potencjał polskiego rynku wymiany walut cyfrowych."
                            )}
                        </p>
                        <p>
                            {i18next.t(
                                "Kantor online kryptowaluty.pl umożliwia zakup najpopularniejszych walut wirtualnych w kilku prostych krokach przy wykorzystaniu kart płatniczych czy błyskawicznych przelewów. Zarówno kantory stacjonarne jak i online są obsługiwane przez wykwalifikowany polski zespół, do którego przywiązujemy olbrzymią wagę."
                            )}
                        </p>
                    </div>
                    <div className={"sectionText_miniSection"}>
                        <header>
                            {i18next.t(
                                "Dlaczego warto postawié na kantor online?"
                            )}
                        </header>
                        <p>
                            {i18next.t(
                                "Największą barierą przy wkroczeniu na rynek kryptowalutowy jest brak edukacji oraz skomplikowany proces zakupu kryptowalut. Z tego powodu proces wymiany walut wirtualnych został przez nas maksymalnie uproszczony, między innymi  dzięki intuicyjnemu interfejsowi. W skrócie"
                            ) +
                                ":" +
                                i18next.t(
                                    "szybkość, łatwość i bezpieczeństwo transakcji są dla nas najważniejsze."
                                )}
                        </p>
                    </div>
                    {/* <div className={"subPage_ImportantText"}>
                        {i18next.t("Postaw na kryptowaluty.pl!")}
                    </div> */}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AboutUsPage;
