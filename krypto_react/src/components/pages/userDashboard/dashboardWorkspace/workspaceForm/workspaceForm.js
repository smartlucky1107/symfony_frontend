import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";

import { UserContext } from "../../../../user/userContext";
import PostThis from "../../../../../scripts/post";
import getRoute from "../../../../routing/routingService";

import Input from "../../../../ui/input/input";
import Select from "../../../../ui/select/select";
import Button from "../../../../ui/button/button";
import Preloader from "../../../../ui/preloader/preloader";
import Infobox from "../../../../ui/infobox/infobox";
import Error from "../../../../ui/errorBox/error";

import infoImg from "../../../../../img/questions.svg";
import "./workspaceForm.scss";

const WorkspaceForm = () => {
    const user = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: "",
        currency: "",
        pin: "",
        companyNip: "",
        companyName: "",
        companyStreet: "",
        companyCity: "",
        companyPostcode: "",
        companyCountry: "",
    });

    const [formDataErrors, setFormDataErrors] = useState(null);

    const [currency, setCurrency] = useState({
        value: 0,
        name: i18next.t("Wybierz walutę"),
    });
    const [currencyError, setCurrencyError] = useState(false);
    const [currencyErrorMsg, setCurrencyErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );

    const [companyCountry, setCompanyCountry] = useState({
        value: 0,
        name: i18next.t("Wybierz kraj"),
    });
    const [companyCountryError, setCompanyCountryError] = useState(false);
    const [companyCountryErrorMsg, setCompanyCountryErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [preloader, setPreloader] = useState(false);
    const [formMsg, setFormMsg] = useState(null);
    const [formStatus, setFormStatus] = useState("success");
    const [formSend, setFormSend] = useState(false);

    const formRef = useRef();

    const updateFormData = (elementId, value) => {
        setFormData((prevState) => {
            return {
                ...formData,
                [elementId]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPreloader(true);
        const response = await PostThis(
            "/api/users/me/pos/workspace",
            "POST",
            {
                name: formData.name,
                currency: currency.value,
                pin: formData.pin,
                companyNip: formData.companyNip,
                companyName: formData.companyName,
                companyStreet: formData.companyStreet,
                companyCity: formData.companyCity,
                companyPostcode: formData.companyPostcode,
                companyCountry: companyCountry.value,
            },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            setPreloader(false);
            setCurrencyError(false);
            setCompanyCountryError(false);
            setFormDataErrors(null);
            setFormMsg(null);
            if (response.data.status >= 200 && response.data.status < 300) {
                setFormSend(true);
                setFormMsg(
                    i18next.t(
                        "Formularz przesłany. Dane zostały przekazane do weryfikacji."
                    )
                );
            } else if (response.status === 403) {
                user.logout();
            } else {
                setFormMsg(response?.data?.message);
                setFormSend(false);
                setFormStatus("warning");
                setFormDataErrors(response?.data);

                // let errorField = response.data.message.split(".");
                // if (errorField.length > 1) {
                //     switch (errorField[errorField.length - 1]) {
                //         case "[companyName]":
                //             setCompanyNameError(true);
                //             setCompanyNameErrorMsg(errorField[0]);
                //             setTimeout(() => {
                //                 setCompanyNameError(false);
                //             }, 10000);
                //             break;
                //         case "[companyCity]":
                //             setCompanyCityError(true);
                //             setCompanyCityErrorMsg(errorField[0]);
                //             setTimeout(() => {
                //                 setCompanyCityError(false);
                //             }, 10000);
                //         case "[companyCountry]":
                //             setCompanyCountryError(true);
                //             setCompanyCountryErrorMsg(errorField[0]);
                //             setTimeout(() => {
                //                 setCompanyCountryError(false);
                //             }, 10000);
                //             break;
                //         case "[companyNip]":
                //             setCompanyNipError(true);
                //             setCompanyNipErrorMsg(errorField[0]);
                //             setTimeout(() => {
                //                 setCompanyNipError(false);
                //             }, 10000);
                //             break;
                //         case "[companyPostcode]":
                //             setCompanyPostcodeError(true);
                //             companyPostcodeErrorMsg(errorField[0]);
                //             setTimeout(() => {
                //                 setCompanyPostcodeError(false);
                //             }, 10000);
                //             break;

                //         case "[companyStreet]":
                //             setCompanyStreetError(true);
                //             setCompanyStreetErrorMsg(errorField[0]);
                //             setTimeout(() => {
                //                 setCompanyStreetError(false);
                //             }, 10000);
                //             break;
                //         default:
                //             setFormMsg(i18next.t(`${response.data.message}`));
                //     }
                // } else {
                //     if (response.data.message === "Name is required") {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setNameError(true);
                //         // setNameErrorMsg()
                //         setTimeout(() => {
                //             setNameError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Currency is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCurrencyError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCurrencyError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Company name is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCompanyNameError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCompanyNameError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Company NIP is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCompanyNipError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCompanyNipError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Company street is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCompanyStreetError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCompanyStreetError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Company city is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCompanyCityError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCompanyCityError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Company postcode is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCompanyPostcodeError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCompanyPostcodeError(false);
                //         }, 10000);
                //     } else if (
                //         response.data.message === "Company country is required"
                //     ) {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //         setCompanyCountryError(true);
                //         // setCurrencyErrorMsg()
                //         setTimeout(() => {
                //             setCompanyCountryError(false);
                //         }, 10000);
                //     } else {
                //         setFormMsg(i18next.t(`${response.data.message}`));
                //     }
                // }
                formRef.current.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
    };

    return (
        <section className="workspaceForm  bg-w" ref={formRef}>
            {formMsg ? (
                <Infobox icon={"info"} type={formStatus}>
                    {formMsg}
                </Infobox>
            ) : (
                ""
            )}
            {!formSend ? (
                <>
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className="preloaderWrapper"
                    >
                        <Preloader show={preloader} />
                        <Select
                            options={[
                                {
                                    value: 0,
                                    name: i18next.t("Wybierz walutę"),
                                },
                                {
                                    value: "PLN",
                                    name: i18next.t("PLN"),
                                },
                                // {
                                //     value: "EUR",
                                //     name: i18next.t("EUR"),
                                // },
                            ]}
                            label={i18next.t(
                                "Wybierz walutę FIAT do której będą przeliczane kursy"
                            )}
                            required
                            activeElement={currency}
                            onChangeActiveElement={(e) => setCurrency(e)}
                        />
                        {currencyError ? (
                            <Error
                                msg={currencyErrorMsg}
                                rel="currencyError"
                                side="top"
                            ></Error>
                        ) : (
                            ""
                        )}

                        <div className="row rowBox">
                            <div className="col col-xl-6">
                                <Input
                                    id={"name"}
                                    value={formData.name}
                                    error={formDataErrors?.name}
                                    type={"text"}
                                    required
                                    onChange={updateFormData}
                                    label={i18next.t("Nazwa workspace")}
                                />
                            </div>
                            <div className="col col-xl-6">
                                <Input
                                    id={"pin"}
                                    value={formData.pin}
                                    error={formDataErrors?.pin}
                                    type={"password"}
                                    required
                                    onChange={updateFormData}
                                    label={i18next.t("Główny Pin do workspace")}
                                />
                            </div>
                        </div>

                        <Input
                            id={"companyName"}
                            value={formData.companyName}
                            error={formDataErrors?.companyName}
                            type={"text"}
                            required
                            onChange={updateFormData}
                            label={i18next.t("Nazwa firmy")}
                        />

                        <Input
                            id={"companyNip"}
                            value={formData.companyNip}
                            error={formDataErrors?.companyNip}
                            type={"text"}
                            required
                            onChange={updateFormData}
                            label={i18next.t("NIP")}
                        />

                        <Input
                            id={"companyStreet"}
                            value={formData.companyStreet}
                            error={formDataErrors?.companyStreet}
                            type={"text"}
                            required
                            onChange={updateFormData}
                            label={i18next.t("Ulica")}
                        />

                        <div className="row rowBox">
                            <div className="col col-xl-6">
                                <Input
                                    id={"companyPostcode"}
                                    value={formData.companyPostcode}
                                    error={formDataErrors?.companyPostcode}
                                    type={"text"}
                                    required
                                    onChange={updateFormData}
                                    label={i18next.t("Kod pocztowy")}
                                />
                            </div>
                            <div className="col col-xl-6">
                                <Input
                                    id={"companyCity"}
                                    value={formData.companyCity}
                                    error={formDataErrors?.companyCity}
                                    type={"text"}
                                    required
                                    onChange={updateFormData}
                                    label={i18next.t("Miasto")}
                                />
                            </div>
                        </div>
                        <Select
                            options={[
                                {
                                    value: 0,
                                    name: i18next.t("Wybierz kraj"),
                                },
                                {
                                    value: "Polska",
                                    name: i18next.t("Polska"),
                                },
                            ]}
                            label={i18next.t(
                                "Wybierz kraj prowadzenia działalności"
                            )}
                            required
                            activeElement={companyCountry}
                            onChangeActiveElement={(e) => setCompanyCountry(e)}
                        />
                        {companyCountryError ? (
                            <Error
                                msg={companyCountryErrorMsg}
                                rel="companyCountryError"
                                side="top"
                            ></Error>
                        ) : (
                            ""
                        )}

                        <Button blue big type="submit">
                            {i18next.t("Załóż konto firmowe")}
                        </Button>
                    </form>
                    <div className="processInfo">
                        <p>
                            {i18next.t(
                                "Ta zakładka przeznaczona jest dla przedsiębiorców którzy pragną w sposób stacjonarny przeprowadzać transakcje związane z kryptowalutami."
                            )}
                        </p>
                        <img
                            className="infoImg"
                            src={infoImg}
                            alt={i18next.t("Informacje dotyczące weryfikacji")}
                        />

                        <ul className="customList numberList">
                            <li>
                                <span>1</span>
                                {i18next.t(
                                    "Jeśli chcesz przystąpić do programu partnerskiego i posiadasz własną działalność uzupełnij formularz i prześlij swoje dane."
                                )}
                            </li>
                            <li>
                                <span>2</span>
                                {i18next.t(
                                    "W razie jakichkolwiek problemów skontaktuj się z działem pomocy pod adresem support@kryptowaluty.pl lub przejdź do zakładki"
                                )}{" "}
                                <Link to={getRoute("contact")}>
                                    {i18next.t("Pomoc")}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </>
            ) : (
                ""
            )}
        </section>
    );
};

export default WorkspaceForm;
