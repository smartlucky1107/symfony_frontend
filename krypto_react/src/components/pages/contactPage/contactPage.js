import React from "react";
import "./contactPage.scss";
import i18next from "i18next";
import { Helmet } from "react-helmet";
import { Redirect } from "react-router-dom";
import getRoute from "../../routing/routingService";
import Header from "../../head/header";
import Footer from "../../foot/footer";
import ContactComponent from "./contactComponent/contactComponent";

const ContactPage = () => {
    //return <Redirect to={getRoute('main')}/>
    return (
        <>
            <Helmet>
                <title>{i18next.t("CONTACT_PAGE_TITLE")}</title>
                <meta
                    name="description"
                    content={i18next.t("CONTACT_PAGE_DESC")}
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
            <div className={"container subPage contactPage"}>
                <h1>{i18next.t("Skontaktuj się z nami")}</h1>           
                <ContactComponent renderAditional />
              
             </div>
             

          
            <Footer />
        </>
    );
};

export default ContactPage;
