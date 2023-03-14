import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./businessRegisterForm.scss";

import i18next from "i18next";

import PostThis from "../../../../scripts/post";
import getRoute from "../../../routing/routingService";
import getCookie, { setCookie } from "../../../../scripts/cookies";

import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";
import Select from "../../../ui/select/select";
import Infobox from "../../../ui/infobox/infobox";
import Loader from "../../../ui/loader/loader";

import ReCAPTCHA from "react-google-recaptcha";

import SuccessImg from "./../../../../img/mail.svg";
import Tooltip from "../../../ui/tooltip/tooltip";

const BusinessRegisterForm = (props) => {
    const recaptchaRef = useRef();
    const [companyType, setCompanyType] = useState({
        value: 0,
        name: i18next.t("Wybierz rodzaj działalności"),
    });
    const [passInfo, setPassInfo] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        companyName: "",
        password: "",
        repassword: "",
        nip: "",
        email: "",
        type: "",
        ref: getCookie("ref") ?? "",
        terms: false,
        policyPrivacy: false,
        marketing: false,
    });
    const [formDataErrors, setFormDataErrors] = useState(null);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [registerSuccess, setRegisterSuccess] = useState(false);

    useEffect(() => {
        if (props?.match?.params?.refCode) {
            setCookie("ref", props?.match?.params?.refCode, 7);
            updateFormData("ref", props?.match?.params?.refCode);
        }
    }, []);

    const updateFormData = (elementId, value) => {
        setFormData((prevState) => {
            return {
                ...formData,
                [elementId]: value,
            };
        });
    };

    const onReCaptchaChange = (key) => {
        console.log("Captcha value: " + key);
        setRecaptchaValue(key);
    };

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setFormDataErrors(null);
        setLoading(true);

        let type;
        if (companyType.value < 10 && companyType.value >= 1) {
            type = 3;
        } else if (companyType.value === 10) {
            type = 2;
        }

        const registerData = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            companyType: formData.companyType,
            companyName: formData.companyName,
            nip: formData.nip,
            email: formData.email,
            type: type,
            businessType: companyType.value,
            password: formData.password,
            repassword: formData.repassword,
            statementMarketing: formData.marketing,
            statementPolicyPrivacy: formData.policyPrivacy,
            statementRegulations: formData.terms,
            statementTeoshare: formData.terms,
            statementUserData: formData.terms,
            ref: formData.ref,
            ["g-recaptcha-response"]: recaptchaValue,
        };
        const response = await PostThis("/register", "POST", registerData, "");
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setRegisterSuccess(true);
                props.updateUserEmail(formData.email);
                props.setRegisterSuccess();
            } else {
                setError(response?.data?.message);
                setFormDataErrors(response?.data);
                if (recaptchaRef.current !== null) {
                    recaptchaRef.current.reset();
                }
            }
        }
        setLoading(false);
    };

    const goToMailbox = () => {
        let mailbox = formData.email.split("@")[1];
        window.open("http://" + mailbox, "_blank");
    };

    if (!registerSuccess) {
        return (
            <form className={"registerForm"} onSubmit={handleSubmitForm}>
                <Select
                    options={[
                        {
                            value: 0,
                            name: i18next.t("Wybierz rodzaj działalności"),
                        },
                        {
                            value: 10,
                            name: i18next.t(
                                "Jednoosobowa działalność gospodarcza"
                            ),
                        },
                        {
                            value: 1,
                            name: i18next.t("Spółka jawna"),
                        },
                        {
                            value: 2,
                            name: i18next.t("Spółka partnerska"),
                        },
                        {
                            value: 3,
                            name: i18next.t("Spółka komandytowa"),
                        },
                        {
                            value: 4,
                            name: i18next.t("Spółka komandytowo-akcyjna"),
                        },
                        {
                            value: 5,
                            name: i18next.t("Spółka z.o.o."),
                        },
                        {
                            value: 6,
                            name: i18next.t("Spółka akcyjna"),
                        },
                        {
                            value: 7,
                            name: i18next.t("Prosta spółka akcyjna"),
                        },
                        {
                            value: 8,
                            name: i18next.t("Spółka cywilna"),
                        },
                        {
                            value: 9,
                            name: i18next.t("Inne"),
                        },
                    ]}
                    label={i18next.t("Wybierz rodzaj działalności")}
                    required
                    activeElement={companyType}
                    onChangeActiveElement={(e) => setCompanyType(e)}
                    id={"companyType"}
                />

                {companyType.value === 10 ? (
                    <>
                        <Input
                            id={"firstName"}
                            value={formData.firstName}
                            error={formDataErrors?.firstName}
                            onChange={updateFormData}
                            label={i18next.t("Imię")}
                            required
                        />
                        <Input
                            id={"lastName"}
                            value={formData.lastName}
                            error={formDataErrors?.lastName}
                            onChange={updateFormData}
                            label={i18next.t("Nazwisko")}
                            required
                        />
                    </>
                ) : (
                    ""
                )}
                <Input
                    id={"companyName"}
                    value={formData.companyName}
                    error={formDataErrors?.companyName}
                    onChange={updateFormData}
                    label={i18next.t("Nazwa firmy")}
                    required
                />
                <Input
                    id={"nip"}
                    type={"number"}
                    value={formData.nip}
                    error={formDataErrors?.nip}
                    onChange={updateFormData}
                    label={i18next.t("Nip")}
                    required
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

                {companyType.value === 10 ? (
                    <>
                        <Input
                            id={"password"}
                            type={"password"}
                            value={formData.password}
                            error={formDataErrors?.password}
                            onChange={updateFormData}
                            label={i18next.t("Hasło")}
                            onFocus={() => setPassInfo(true)}
                            onBlur={() => setPassInfo(false)}
                            required
                        />
                        {passInfo ? (
                            <Infobox
                                animation={"slide-in-top"}
                                icon={"info"}
                                type={"info"}
                            >
                                {i18next.t(
                                    "Hasło powinno zawierać przynajmniej jedną dużą literę, jeden znak specjalny, jedną cyfrę, oraz mieć długość minimum 8 znaków."
                                )}
                            </Infobox>
                        ) : null}
                        <Input
                            id={"repassword"}
                            type={"password"}
                            value={formData.repassword}
                            error={formDataErrors?.repassword}
                            onChange={updateFormData}
                            label={i18next.t("Powtórz hasło")}
                            required
                        />
                    </>
                ) : (
                    ""
                )}
                <Input
                    id={"ref"}
                    type={"text"}
                    value={formData.ref}
                    error={formDataErrors?.ref}
                    onChange={updateFormData}
                    label={i18next.t("Kod polecający")}
                    helpTooltip={i18next.t(
                        "Jeśli znajomy polecił Ci nasz serwis, możesz tutaj wprowadzić KOD POLECAJĄCY, który wysłała Ci polecająca osoba. Kod uzupełniany jest automatycznie, jeśli ktoś wysłał Ci link polecający."
                    )}
                />
                <Input
                    id={"terms"}
                    type={"checkbox"}
                    value={formData.terms}
                    error={formDataErrors?.terms}
                    onChange={updateFormData}
                    label={
                        <>
                            {i18next.t("Zapoznałem się z treścią")}{" "}
                            <Link to={getRoute("terms")}>
                                {i18next.t("regulaminu")}
                            </Link>
                            ,{" "}
                            {i18next.t(
                                "akceptuję zawarte w nim warunki oraz zobowiązuję się do ich przestrzegania."
                            )}
                        </>
                    }
                    required
                />
                <Input
                    id={"policyPrivacy"}
                    type={"checkbox"}
                    value={formData.policyPrivacy}
                    error={formDataErrors?.policyPrivacy}
                    onChange={updateFormData}
                    label={
                        <>
                            {i18next.t("Zapoznałem się z treścią")}{" "}
                            <Link to={getRoute("privacyPolicy")}>
                                {i18next.t("polityki prywatności")}
                            </Link>
                            ,{" "}
                            {i18next.t(
                                "i wyrażam zgodę na przetwarzanie moich danych osobowych w zakresie wskazanym w Polityce Prywatności."
                            )}
                        </>
                    }
                    required
                />
                <Input
                    id={"marketing"}
                    type={"checkbox"}
                    value={formData.marketing}
                    error={formDataErrors?.marketing}
                    onChange={updateFormData}
                    label={
                        <>
                            {i18next.t(
                                "Wyrażam zgodę na świadczenie przez Partneria Sp. z o.o. usług drogą elektroniczną w zakresie przekazywania informacji handlowych i marketingowych na adres elektronicznej skrzynki pocztowej."
                            )}
                        </>
                    }
                />

                <div className={`reCaptchaBox ${formData.terms ? "" : "hide"}`}>
                    <ReCAPTCHA
                        className={"recaptchaContainer"}
                        ref={recaptchaRef}
                        sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
                        onChange={onReCaptchaChange}
                    />
                </div>

                {/*<Input
                    id={"ref"}
                    type={"hidden"}
                    value={formData.ref}
                    error={formDataErrors?.ref}
                    onChange={updateFormData}
                    label={i18next.t("Kod polecającego")}
                />*/}

                {error ? (
                    <Infobox
                        animation={"wobble"}
                        icon={"sync_problem"}
                        type={"error"}
                    >
                        {error}
                    </Infobox>
                ) : null}

                <Button
                    type={"submit"}
                    blue
                    big
                    disabled={
                        formData.terms === false ||
                        formData.policyPrivacy === false
                            ? true
                            : false
                    }
                >
                    {i18next.t("Załóż konto")}
                </Button>
                {isLoading ? (
                    <Loader
                        absolute
                        label={i18next.t("Przesyłanie formularza")}
                    />
                ) : null}
            </form>
        );
    } else {
        return null;
    }
};

export default BusinessRegisterForm;
