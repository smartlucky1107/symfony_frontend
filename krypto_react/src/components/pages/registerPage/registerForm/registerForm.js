import React, { useEffect, useRef, useState } from "react";
import "./registerForm.scss";
import Input from "../../../ui/input/input";
import Select from "../../../ui/select/select";
import i18next from "i18next";
import Button from "../../../ui/button/button";
import getRoute from "../../../routing/routingService";
import { Link } from "react-router-dom";
import Infobox from "../../../ui/infobox/infobox";
import PostThis from "../../../../scripts/post";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../../../ui/loader/loader";
import SuccessImg from "./../../../../img/mail.svg";
import getCookie, { setCookie } from "../../../../scripts/cookies";

const RegisterForm = (props) => {
    const recaptchaRef = useRef();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repassword: "",
        ref: getCookie("ref") ?? "",
        terms: false,
        policyPrivacy: false,
        marketing: false,
    });
    const [formDataErrors, setFormDataErrors] = useState(null);
    const [recaptchaValue, setRecaptchaValue] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [passInfo, setPassInfo] = useState(false);
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

        const registerData = {
            type: 1,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
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

    if (!registerSuccess) {
        return (
            <form className={"registerForm"} onSubmit={handleSubmitForm}>
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
                <Input
                    id={"email"}
                    type={"email"}
                    value={formData.email}
                    error={formDataErrors?.email}
                    onChange={updateFormData}
                    label={i18next.t("Adres e-mail")}
                    required
                />
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
                                {i18next.t("Polityki Prywatności")}
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
                    <Loader absolute label={i18next.t("Tworzenie konta")} />
                ) : null}
            </form>
        );
    } else {
        return null;
    }
};

export default RegisterForm;
