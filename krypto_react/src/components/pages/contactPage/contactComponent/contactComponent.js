import React, { useRef } from "react";
import "./contactComponent.scss";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../ui/popup/popup";

import ContactForm from "../contactForm/contactForm";
import contacts from "../../../../img/contacts.png";

const ContactComponent = (props) => {
    const popupRef = useRef(null);

    const renderAditional = () => {
        if (props.renderAditional === true)
            return (
                <div className={"contactOption aditionalInfos"}>
                    <div className={"contactOptionDesc"}>
                        <div className={"contactInfos"}>
                            <div className={"contactOptionName"}>
                                {i18next.t("Dane kontaktowe")}
                            </div>
                            {i18next.t(
                                "Masz dodatkowe pytania lub chciałbyś nawiązać współpracę? Zachęcamy do kontaktu z nami"
                            ) + ":"}
                            <br />
                            <br />
                            <strong>{i18next.t("COMPANY_PHONE_NUMBER")}</strong>
                            <br />
                            {i18next.t("COMPANY_EMAIL_ADDRESS")}
                            <br />
                            <br />
                            {i18next.t(
                                "Jesteśmy do Państwa dyspozycji w dniach "
                            )}
                            {i18next.t("COMPANY_CONTACT_DAYS")}
                            {i18next.t(" w godzinach ")}
                            {i18next.t("COMPANY_CONTACT_HOURS")}
                            <br />
                            {i18next.t(
                                "Na wiadomości otrzymane poza wyznaczonymi godzinami pracy udzielamy odpowiedzi w następnym dniu roboczym."
                            )}

                            {/* {i18next.t(
                                "Odpowiadamy na Państwa zgłoszenia w podanych przedziałach czasowych"
                            ) + ":"}
                            <br />
                            {i18next.t("COMPANY_CONTACT_DAYS")}
                            <br />
                            {i18next.t("COMPANY_CONTACT_HOURS")} */}
                        </div>

                <div className="contactimgBlock mt-4">
                    <div className="size5">
                        
                        <div className={"companyInfos"}>
                            <div className={"contactOptionName"}>
                                {i18next.t("Dane firmy")}
                            </div>
                            {i18next.t("COMPANY_INFOS_LINE1")}
                            <br />
                            {i18next.t("COMPANY_INFOS_LINE2")}
                            <br />
                            {i18next.t("COMPANY_INFOS_LINE3")}
                            <br />
                            <br />
                            {i18next.t("COMPANY_INFOS_LINE4")}
                            <br />
                            {i18next.t("COMPANY_INFOS_LINE5")}
                            <br />
                            {i18next.t("COMPANY_INFOS_LINE6")}
                        </div>                 

                    </div>

                    <div className="size5 imgContact">
                        <img src={contacts} className="imgOffset" alt="" />                  
                    </div>
                </div>



                    </div>
                </div>
            );
    };

    return (
        <div className={"contactComponent"}>
            {/*
            <div className={"contactOptions"}>
                <div
                    className={"contactOption"}
                    onClick={() => handleShowPopup(popupRef)}
                >
                    <div className={"contactOptionName"}>
                        {i18next.t("Wyślij zgłoszenie")}
                    </div>
                    <div className={"contactOptionDesc"}>
                        {i18next.t(
                            "Wypełnij formularz kontaktowy, a nasz zespół obsługi klienta odpowie na pytania tak szybko jak jest to możliwe. "
                        )}
                    </div>
                    <div className={"contactOptionBtns"}>
                        <Button blue rightIcon={"send"}>
                            {i18next.t("Wyślij zgłoszenie")}
                        </Button>
                    </div>
                </div>

                <div className={"contactOption"}>
                    <div className={"contactOptionName"}>
                        {i18next.t("Czat online")}
                    </div>
                    <div className={"contactOptionDesc"}>
                        {i18next.t(
                            "Porozmawiaj bezpośrednio przez komunikator online z supportem. Jest to najszybszy sposób na uzyskanie odpowiedzi."
                        )}
                    </div>
                    <div className={"contactOptionBtns"}>
                        <Button blue rightIcon={"chat"}>
                            {i18next.t("Rozpocznij czat")}
                        </Button>
                    </div>
                </div>
            </div>
            */}
            {renderAditional()}
            <Popup
                handleClosePopup={() => handleClosePopup(popupRef)}
                ref={popupRef}
            >
                <ContactForm />
            </Popup>
        </div>
    );
};

export default ContactComponent;
