import React, { useState, useRef } from "react";
import i18next from "i18next";

import "./contactForm.scss";

import PostThis from "../../../../scripts/post";

import Infobox from "../../../ui/infobox/infobox";
import Button from "../../../ui/button/button";
import Input from "../../../ui/input/input";
import Textarea from "../../../ui/textarea/textarea";
import Select from "../../../ui/select/select";

import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
    const [contactCategory, setContactCategory] = useState({
        value: 0,
        name: i18next.t("Wybierz temat wiadomości"),
    });
    const [error, setError] = useState(null);
    const [formDataErrors, setFormDataErrors] = useState(null);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const recaptchaRef = useRef();

    const onReCaptchaChange = (key) => {
        setRecaptchaValue(key);
    };

    const updateFormData = (elementId, value) => {
        setFormData((prevState) => {
            return {
                ...formData,
                [elementId]: value,
            };
        });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        setFormDataErrors(null);

        if (contactCategory.value !== 0) {
            const response = await PostThis(
                "",
                "POST",
                {
                    name: formData.name,
                    category: contactCategory.name,
                    email: formData.email,
                    message: formData.message,
                    ["g-recaptcha-response"]: recaptchaValue,
                },
                "",
                ""
            );

            if (response) {
                if (response.status >= 200 && response.status < 300) {
                } else {
                    setError(response?.data?.message);
                    setFormDataErrors(response?.data);
                    if (recaptchaRef.current !== null) {
                        recaptchaRef.current.reset();
                    }
                }
            }
        } else {
            setError(i18next.t("Wybierz temat wiadomośći"));
            // setFormDataErrors(response?.data);
            // if (recaptchaRef.current !== null) {
            //     recaptchaRef.current.reset();
            // }
        }
    };

    return (
        <>
            <form className="contactForm" onSubmit={(e) => submitForm(e)}>
                <div className="textCenter">
                    <h3>Formularz kontaktowy</h3>
                </div>
                <Select
                    options={[
                        {
                            value: 0,
                            name: i18next.t("Wybierz temat wiadomości"),
                        },
                        {
                            value: 1,
                            name: i18next.t("Weryfikacja"),
                        },
                        {
                            value: 2,
                            name: i18next.t("Problemy z logowaniem"),
                        },
                        {
                            value: 3,
                            name: i18next.t("Przelewy kryptowalu"),
                        },
                        {
                            value: 4,
                            name: i18next.t("Wpłaty / wypłaty FIAT"),
                        },
                        {
                            value: 5,
                            name: i18next.t("Transakcje / prowizje / historia"),
                        },
                        {
                            value: 6,
                            name: i18next.t("Program afiliacyjny"),
                        },
                        {
                            value: 7,
                            name: i18next.t("Współpraca i sugestie"),
                        },
                        {
                            value: 8,
                            name: i18next.t("Problemy techniczne"),
                        },
                        {
                            value: 9,
                            name: i18next.t("Zmiana danych"),
                        },
                        {
                            value: 10,
                            name: i18next.t("Inne"),
                        },
                    ]}
                    label={i18next.t("Wybierz temat wiadomości")}
                    required
                    activeElement={contactCategory}
                    onChangeActiveElement={(e) => setContactCategory(e)}
                    id={"contactCategory"}
                />
                <Input
                    id={"email"}
                    type={"email"}
                    value={formData.email}
                    error={formDataErrors?.email}
                    onChange={updateFormData}
                    label={i18next.t("Adres e-mail")}
                    required
                />
                <Textarea
                    id={"message"}
                    value={formData.message || ""}
                    required
                    onChange={updateFormData}
                    label={i18next.t("Treść wiadomości")}
                />

                <div className={`reCaptchaBox ${formData.terms ? "" : "hide"}`}>
                    <ReCAPTCHA
                        className={"recaptchaContainer"}
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
                        onChange={onReCaptchaChange}
                    />
                </div>

                {error ? (
                    <Infobox
                        animation={"wobble"}
                        icon={"sync_problem"}
                        type={"error"}
                    >
                        {error}
                    </Infobox>
                ) : null}
                <div className="textCenter">
                    <Button type="submit">
                        {i18next.t("Wyślij formularz")}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default ContactForm;
