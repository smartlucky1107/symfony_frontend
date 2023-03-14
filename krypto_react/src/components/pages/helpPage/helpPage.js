import React, { useEffect, useRef } from "react";
import "./../subPage.scss";
import "./helpPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import FaqComponent from "./faqComponent/faqComponent";
import ContactComponent from "../contactPage/contactComponent/contactComponent";

const HelpPage = () => {
    //return <Redirect to={getRoute('main')}/>
    return (
        <>
            <Helmet>
                <title>{i18next.t("HELP_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("HELP_PAGE_DESC")}
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
            <div className={"container subPage helpPage"}>
                {/* <h1>{i18next.t("Potrzebujesz pomocy?")}</h1> */}
                {/* <div className={"contentSection"}>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut diam purus, luctus ac metus eleifend, accumsan
                        imperdiet nisl. Nunc tempus, purus in blandit faucibus,
                        dui eros maximus purus, at condimentum diam ipsum nec
                        nisl. Vestibulum ante ipsum primis in faucibus orci
                        luctus et ultrices posuere cubilia curae; Etiam accumsan
                        pretium eros. In hac habitasse platea dictumst. Quisque
                        gravida vehicula neque, et placerat justo porta in.
                        Pellentesque sed justo augue. Nullam malesuada maximus
                        sapien a ullamcorper. Aenean sit amet augue tellus.
                        Donec et porttitor tellus. Mauris imperdiet iaculis
                        nisi, ac fringilla diam suscipit vitae.
                    </p>
                </div>
                <div className={"contentSection"}>
                    <p>
                        In posuere nulla erat, non ultrices tortor aliquet at.
                        Sed varius, nulla eget condimentum accumsan, dolor mi
                        blandit diam, eget accumsan erat felis placerat est. Nam
                        bibendum vitae ligula iaculis blandit. Proin et ligula
                        ac tellus ultricies hendrerit. Vestibulum id interdum
                        mi, at dapibus ligula. Curabitur nec ultrices est.
                        Quisque quis ipsum sagittis, suscipit quam non, posuere
                        nisl. Pellentesque nec leo tellus. Nam volutpat semper
                        aliquam. Quisque sed nunc mauris. Donec ornare fringilla
                        mattis.
                    </p>
                </div> */}

                <FaqComponent />

                <div className={"needContact"}>
                    <h1>{i18next.t("Nadal potrzebujesz pomocy?")}</h1>
                    <ContactComponent renderAditional={true} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default HelpPage;
