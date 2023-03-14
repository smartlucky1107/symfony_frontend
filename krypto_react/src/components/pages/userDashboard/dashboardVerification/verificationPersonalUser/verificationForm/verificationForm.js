import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import getRoute from "../../../../../routing/routingService";
import i18next from "i18next";
import DateFnsUtils from "@date-io/date-fns";
import plLocale from "date-fns/locale/pl";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

import "./verificationForm.scss";

import { UserContext } from "../../../../../user/userContext";
import { ModalControllerContext } from "../../../../../modals/modalControllerContext";

import PostThis from "../../../../../../scripts/post";

import { handleConvertDateFormatFilter } from "../../../../../../scripts/dateTransformations";

import Input from "../../../../../ui/input/input";
import Select from "../../../../../ui/select/select";
import Textarea from "../../../../../ui/textarea/textarea";
import Button from "../../../../../ui/button/button";
import Loader from "../../../../../ui/loader/loader";
import Infobox from "../../../../../ui/infobox/infobox";
import Error from "../../../../../ui/errorBox/error";

import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import infoImg from "../../../../../../img/questions.svg";

const localeMap = {
    pl: plLocale,
};

const materialTheme = createMuiTheme({
    palette: {
        primary: {
            main: "#2684fe",
        },
    },
    overrides: {
        MuiIconButton: {
            root: {
                fontSize: "10px",
                padding: "0",
            },
        },

        MuiSvgIcon: {
            root: {
                fontSize: "18px",
            },
        },
        MuiInput: {
            input: {
                padding: "0",
            },
            underline: {
                marginTop: "5px",
                border: "2px",
                borderStyle: "solid",
                borderColor: "#f0f3f8",
                borderRadius: "5px",
                padding: "12px 14px",
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: "500",
                fontSize: "14px",
                boxSizing: "border-box",
                "&&&&:before": {
                    borderBottom: "0",
                },
                "&&&&:after": {
                    borderBottom: "0",
                },
            },
        },
    },
});

const VerificationForm = () => {
    const user = useContext(UserContext);
    const modalController = useContext(ModalControllerContext);

    const [firstName, setFirstName] = useState();
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [lastName, setLastName] = useState();
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [street, setStreet] = useState();
    const [streetError, setStreetError] = useState(false);
    const [streetErrorMsg, setStreetErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [building, setBuilding] = useState();
    const [buildingError, setBuildingError] = useState(false);
    const [buildingErrorMsg, setBuildingErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [apartment, setApartment] = useState();
    const [apartmentError, setApartmentError] = useState(false);
    const [apartmentErrorMsg, setApartmentErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [city, setCity] = useState();
    const [cityError, setCityError] = useState(false);
    const [cityErrorMsg, setCityErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [countryState, setCountryState] = useState();
    const [countryStateError, setCountryStateError] = useState(false);
    const [countryStateErrorMsg, setCountryStateErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [postalCode, setPostalCode] = useState();
    const [postalCodeError, setPostalCodeError] = useState(false);
    const [postalCodeErrorMsg, setPostalCodeErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [phone, setPhone] = useState();
    const [phoneError, setPhoneError] = useState(false);
    const [phoneErrorMsg, setPhoneErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [dateOfBirth, setDateOfBirth] = useState();
    const [minDateOfBirth, setMinDateOfBirth] = useState("");
    const [dateOfBirthError, setDateOfBirthError] = useState(false);
    const [dateOfBirthErrorMsg, setDateOfBirthErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );

    const [country, setCountry] = useState("");
    const [countryError, setCountryError] = useState(false);
    const [countryErrorMsg, setCountryErrorMsg] = useState();

    const [isPep, setIsPep] = useState({
        value: 0,
        name: i18next.t("Wybierz opcję"),
    });
    const [isPepError, setIsPepError] = useState(false);
    const [isPepErrorMsg, setIsPepErrorMsg] = useState(false);

    const [pep, setPep] = useState();
    const [pepName, setPepName] = useState();
    const [pepNameError, setPepNameError] = useState(false);
    const [pepNameErrorMsg, setPepNameErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [pesel, setPesel] = useState();
    const [peselError, setPeselError] = useState(false);
    const [peselErrorMsg, setPeselErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );

    // business

    const [nip, setNip] = useState("");
    const [nipError, setNipError] = useState(false);
    const [nipErrorMsg, setNipErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [companyName, setCompanyName] = useState("");
    const [companyNameError, setCompanyNameError] = useState(false);
    const [companyNameErrorMsg, setCompanyNameErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );

    const [businessStreet, setBusinessStreet] = useState("");
    const [businessStreetError, setBusinessStreetError] = useState(false);
    const [businessStreetErrorMsg, setBusinessStreetErrorMsg] = useState();

    const [businessBuilding, setBusinessBuilding] = useState("");
    const [businessBuildingError, setBusinessBuildingError] = useState(false);
    const [businessBuildingErrorMsg, setBusinessBuildingErrorMsg] = useState();

    const [businessApartment, setBusinessApartment] = useState();
    const [businessApartmentError, setBusinessApartmentError] = useState(false);
    const [
        businessApartmentErrorMsg,
        setBusinessApartmentErrorMsg,
    ] = useState();

    const [businessCity, setBusinessCity] = useState("");
    const [businessCityError, setBusinessCityError] = useState(false);
    const [businessCityErrorMsg, setBusinessCityErrorMsg] = useState();

    const [businessPostalCode, setBusinessPostalCode] = useState("");
    const [businessPostalCodeError, setBusinessPostalCodeError] = useState(
        false
    );
    const [
        businessPostalCodeErrorMsg,
        setBusinessPostalCodeErrorMsg,
    ] = useState();

    const [businessCountry, setBusinessCountry] = useState("");
    const [businessCountryError, setBusinessCountryError] = useState(false);
    const [businessCountryErrorMsg, setBusinessCountryErrorMsg] = useState();

    const [businessState, setBusinessState] = useState("");
    const [businessStateError, setBusinessStateError] = useState(false);
    const [businessStateErrorMsg, setBusinessStateErrorMsg] = useState();

    const [businessPKD, setBusinessPKD] = useState("");
    const [businessPKDError, setBusinessPKDError] = useState(false);
    const [businessPKDErrorMsg, setBusinessPKDErrorMsg] = useState();

    //
    const [formValid, setFormValid] = useState(false);
    //
    const [preloader, setPreloader] = useState(false);
    const [showFormMsg, setShowFormMsg] = useState();
    const [formMsg, setFormMsg] = useState();
    const [formStatus, setFormStatus] = useState("success");
    const [formSend, setFormSend] = useState(false);
    //

    const [locale, setLocale] = useState("pl");
    const localeCancelLabelMap = {
        en: "cancel",
        pl: "anuluj",
    };

    //
    const handleFirstNameChange = (inputId, value) => {
        setFirstName(value);
    };
    const handleLastNameChange = (inputId, value) => {
        setLastName(value);
    };
    const handleStreetChange = (inputId, value) => {
        setStreet(value);
    };
    const handleBuildingChange = (inputId, value) => {
        setBuilding(value);
    };
    const handleApartmentChange = (inputId, value) => {
        setApartment(value);
    };
    const handleCityChange = (inputId, value) => {
        setCity(value);
    };
    const handleCountryStateChange = (inputId, value) => {
        setCountryState(value);
    };
    const handlePostalCodeChange = (inputId, value) => {
        setPostalCode(value);
    };
    const handlePhoneChange = (inputId, value) => {
        setPhone(value);
    };
    const handleDateOfBirthChange = (inputId, value) => {
        setDateOfBirth(value);
    };
    const handleCountryChange = (inputId, value) => {
        setCountry(value);
    };
    const handlePeselChange = (inputId, value) => {
        setPesel(value);
    };
    const handlePepNameChange = (inputId, value) => {
        setPepName(value);
    };

    // business

    const handleNipChange = (inputId, value) => {
        setNip(value);
    };
    const handleCompanyNameChange = (inputId, value) => {
        setCompanyName(value);
    };

    const handleBusinessStreetChange = (inputId, value) => {
        setBusinessStreet(value);
    };
    const handleBusinessBuildingChange = (inputId, value) => {
        setBusinessBuilding(value);
    };
    const handleBusinessApartmentChange = (inputId, value) => {
        setBusinessApartment(value);
    };
    const handleBusinessCityChange = (inputId, value) => {
        setBusinessCity(value);
    };
    const handleBusinessPostalCodeChange = (inputId, value) => {
        setBusinessPostalCode(value);
    };
    const handleBusinessCountryChange = (inputId, value) => {
        setBusinessCountry(value);
    };
    const handleBusinessStateChange = (inputId, value) => {
        setBusinessState(value);
    };
    const handleBusinessPKDChange = (inputId, value) => {
        setBusinessPKD(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setPreloader(true);

        // modalController.showDemoVersionModal();

        if (isPep.value === 0) {
            setIsPepError(true);
            setIsPepErrorMsg(i18next.t("Pole wymagane"));
            setPreloader(false);
        } else {
            let response;
            response = await PostThis(
                "/api/users",
                "PUT",
                {
                    firstName: firstName,
                    lastName: lastName,
                    street: street,
                    building: building,
                    apartment: apartment,
                    city: city,
                    state: countryState,
                    postalCode: postalCode,
                    phone: phone,
                    dateOfBirth: handleConvertDateFormatFilter(dateOfBirth),
                    nip: nip,
                    pesel: pesel,
                    businessStreet: businessStreet,
                    businessBuilding: businessBuilding,
                    businessApartment: businessApartment,
                    businessCity: businessCity,
                    businessState: businessState,
                    businessPostalCode: businessPostalCode,
                    businessCountry: businessCountry,
                    businessPKD: businessPKD,
                    isPep: isPep,
                    pep: pep,
                    pepName: pepName,
                },
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                }
            );

            if (response) {
                setShowFormMsg(false);
                setFirstNameError(false);
                setLastNameError(false);
                setStreetError(false);
                setBuildingError(false);
                setApartmentError(false);
                setCityError(false);
                setCountryStateError(false);
                setPostalCodeError(false);
                setPhoneError(false);
                setDateOfBirthError(false);
                setPreloader(false);

                if (response.status >= 200 && response.status < 300) {
                    setShowFormMsg(true);
                    setFormSend(true);
                    setFormMsg(
                        i18next.t(
                            "Formularz przesłany. Dane zostały przekazane do weryfikacji."
                        )
                    );
                    setTimeout(() => {
                        window.location.reload(false);
                    }, 3000);
                } else if (response.status === 403) {
                    user.logout();
                } else {
                    if (response) {
                        if (response.data) {
                            const errorFields = Object.keys(response.data);
                            const errorMsgs = Object.values(response.data);
                            for (let i = 0; i < errorFields.length; i++) {
                                switch (errorFields[i]) {
                                    case "firstName":
                                        setFirstNameError(true);
                                        setFirstNameErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setFirstNameError(false);
                                        }, 10000);
                                        break;
                                    case "lastName":
                                        setLastNameError(true);
                                        setLastNameErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setLastNameError(false);
                                        }, 10000);
                                        break;
                                    case "street":
                                        setStreetError(true);
                                        setStreetErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setStreetError(false);
                                        }, 10000);
                                        break;
                                    case "building":
                                        setBuildingError(true);
                                        setBuildingErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setBuildingError(false);
                                        }, 10000);
                                        break;
                                    case "apartment":
                                        setApartmentError(true);
                                        setApartmentErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setApartmentError(false);
                                        }, 10000);
                                        break;

                                    case "city":
                                        setCityError(true);
                                        setCityErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setCityError(false);
                                        }, 10000);
                                        break;
                                    case "state":
                                        setCountryStateError(true);
                                        setCountryStateErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setCountryStateError(false);
                                        }, 10000);
                                        break;
                                    case "postalCode":
                                        setPostalCodeError(true);
                                        setPostalCodeErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setPostalCodeError(false);
                                        }, 10000);
                                        break;
                                    case "phone":
                                        setPhoneError(true);
                                        setPhoneErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setPhoneError(false);
                                        }, 10000);
                                        break;
                                    case "pesel":
                                        setPeselError(true);
                                        setPeselErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setPeselError(false);
                                        }, 10000);
                                        break;
                                    case "dateOfBirth":
                                        setDateOfBirthError(true);
                                        setDateOfBirthErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setDateOfBirthError(false);
                                        }, 10000);
                                        break;
                                    case "companyName":
                                        setCompanyNameError(true);
                                        setCompanyNameErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setCompanyNameError(false);
                                        }, 10000);
                                        break;
                                    case "nip":
                                        setNipError(true);
                                        setNipErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setNipError(false);
                                        }, 10000);
                                        break;
                                    case "businessStreet":
                                        setBusinessStreetError(true);
                                        setBusinessStreetErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setBusinessStreetError(false);
                                        }, 10000);
                                        break;
                                    case "businessApartment":
                                        setBusinessApartmentError(true);
                                        setBusinessApartmentErrorMsg(
                                            errorMsgs[i]
                                        );
                                        setTimeout(() => {
                                            setBusinessApartmentError(false);
                                        }, 10000);
                                        break;
                                    case "businessBuilding":
                                        setBusinessBuildingError(true);
                                        setBusinessBuildingErrorMsg(
                                            errorMsgs[i]
                                        );
                                        setTimeout(() => {
                                            setBusinessBuildingError(false);
                                        }, 10000);
                                        break;
                                    case "businessPostalCode":
                                        setBusinessPostalCodeError(true);
                                        setBusinessPostalCodeErrorMsg(
                                            errorMsgs[i]
                                        );
                                        setTimeout(() => {
                                            setBusinessPostalCodeError(false);
                                        }, 10000);
                                        break;
                                    case "businessCity":
                                        setBusinessCityError(true);
                                        setBusinessCityErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setBusinessCityError(false);
                                        }, 10000);
                                        break;
                                    case "businessState":
                                        setBusinessStateError(true);
                                        setBusinessStateErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setBusinessStateError(false);
                                        }, 10000);
                                        break;
                                    case "businessCountry":
                                        setBusinessCountryError(true);
                                        setBusinessCountryErrorMsg(
                                            errorMsgs[i]
                                        );
                                        setTimeout(() => {
                                            setBusinessCountryError(false);
                                        }, 10000);
                                        break;
                                    case "businessPKD":
                                        setBusinessPKDError(true);
                                        setBusinessPKDErrorMsg(errorMsgs[i]);
                                        setTimeout(() => {
                                            setBusinessPKDError(false);
                                        }, 10000);
                                        break;
                                    default:
                                        setFormMsg(
                                            i18next.t(`${"Pole wymagane"}`)
                                        );
                                }
                            }
                        }
                    }

                    setShowFormMsg(true);
                    setFormSend(false);
                    setFormStatus("error");
                    setFormMsg(
                        i18next.t(
                            "Błąd przesyłania! Sprawdź czy wszystkie pola są prwaidłowo wypełnione."
                        )
                    );
                }
            }
        }
    };

    useEffect(() => {
        setFirstName(user.data.user.firstName);
        setLastName(user.data.user.lastName);
        setCompanyName(user.data.user.companyName);
        setPhone(user.data.user.phone);
        setNip(user.data.user.nip);

        const dateNow = new Date();

        console.log(dateNow.getMonth() + 1);

        setMinDateOfBirth(
            `${
                dateNow.getMonth() + 1 < 10
                    ? `0${dateNow.getMonth() + 1}`
                    : dateNow.getMonth() + 1
            }-${
                dateNow.getDate() < 10
                    ? `0${dateNow.getDate()}`
                    : dateNow.getDate()
            }-${dateNow.getFullYear() - 18}`
        );
        setDateOfBirth(
            `${
                dateNow.getMonth() + 1 < 10
                    ? `0${dateNow.getMonth() + 1}`
                    : dateNow.getMonth() + 1
            }-${
                dateNow.getDate() < 10
                    ? `0${dateNow.getDate()}`
                    : dateNow.getDate()
            }-${dateNow.getFullYear() - 18}`
        );
    }, []);

    return (
        <>
            <div className="verificationForm preloaderWrapper ">
                {showFormMsg ? (
                    <Infobox icon={"info"} type={formStatus}>
                        {formMsg}
                    </Infobox>
                ) : (
                    ""
                )}

                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="preloaderWrapper"
                >
                    {preloader ? (
                        <Loader label={i18next.t("Przetwarzanie")} absolute />
                    ) : (
                        ""
                    )}
                    <div className="row">
                        <div className="col">
                            <Input
                                id={"firstName"}
                                value={firstName || ""}
                                type={"text"}
                                required
                                onChange={handleFirstNameChange}
                                label={i18next.t("Imię")}
                            />
                            {firstNameError ? (
                                <Error
                                    msg={firstNameErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <Input
                                id={"lastName"}
                                value={lastName || ""}
                                type={"text"}
                                required
                                onChange={handleLastNameChange}
                                label={i18next.t("Nazwisko")}
                            />
                            {lastNameError ? (
                                <Error
                                    msg={lastNameErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <p>{i18next.t("Adres zamieszkania")}:</p>
                    <div className="row">
                        <div className="col">
                            <Input
                                id={"street"}
                                value={street || ""}
                                type={"text"}
                                required
                                onChange={handleStreetChange}
                                label={i18next.t("Ulica")}
                            />
                            {streetError ? (
                                <Error
                                    msg={streetErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className="col col-20">
                            <Input
                                id={"building"}
                                value={building || ""}
                                type={"text"}
                                required
                                onChange={handleBuildingChange}
                                label={i18next.t("Budynek")}
                            />
                            {buildingError ? (
                                <Error
                                    msg={buildingErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col col-20">
                            <Input
                                id={"apartment"}
                                value={apartment || ""}
                                type={"text"}
                                onChange={handleApartmentChange}
                                label={i18next.t("Mieszkanie")}
                            />
                            {apartmentError ? (
                                <Error
                                    msg={apartmentErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Input
                                id={"postalCode"}
                                value={postalCode || ""}
                                type={"text"}
                                required
                                onChange={handlePostalCodeChange}
                                label={i18next.t("Kod pocztowy")}
                            />
                            {postalCodeError ? (
                                <Error
                                    msg={postalCodeErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <Input
                                id={"city"}
                                value={city || ""}
                                type={"text"}
                                required
                                onChange={handleCityChange}
                                label={i18next.t("Miasto")}
                            />
                            {cityError ? (
                                <Error
                                    msg={cityErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input
                                id={"phone"}
                                value={phone || ""}
                                type={"text"}
                                required
                                onChange={handlePhoneChange}
                                label={i18next.t("Telefon")}
                            />
                            {phoneError ? (
                                <Error
                                    msg={phoneErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <label className="kDatePicker">
                                {i18next.t("Data urodzenia")}
                                <div className="isRequired">
                                    <span className="material-icons">
                                        error
                                    </span>
                                    <div className="isRequiredText">
                                        {i18next.t("wymagane")}
                                    </div>
                                </div>
                                <div className="miDatepickerContainer">
                                    <MuiPickersUtilsProvider
                                        utils={DateFnsUtils}
                                        locale={localeMap[locale]}
                                    >
                                        <ThemeProvider theme={materialTheme}>
                                            <KeyboardDatePicker
                                                value={
                                                    dateOfBirth || "2000-01-01"
                                                }
                                                onChange={setDateOfBirth}
                                                maxDate={
                                                    minDateOfBirth ||
                                                    "2000-01-01"
                                                }
                                                format="dd-MM-yyyy"
                                                cancelLabel={
                                                    localeCancelLabelMap[locale]
                                                }
                                            />
                                        </ThemeProvider>
                                    </MuiPickersUtilsProvider>
                                </div>
                            </label>
                            {dateOfBirthError ? (
                                <Error
                                    msg={dateOfBirthErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <Input
                                id={"pesel"}
                                value={pesel || ""}
                                type={"number"}
                                required
                                onChange={handlePeselChange}
                                label={i18next.t("Pesel")}
                            />
                            {peselError ? (
                                <Error
                                    msg={peselErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="col">
                            <Input
                                id={"country"}
                                value={country || ""}
                                type={"text"}
                                required
                                onChange={handleCountryChange}
                                label={i18next.t("Kraj")}
                            />
                            {countryError ? (
                                <Error
                                    msg={countryErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                    <div>
                        <Select
                            options={[
                                {
                                    value: 0,
                                    name: i18next.t("Wybierz opcję"),
                                },
                                {
                                    value: 1,
                                    name: i18next.t("Tak"),
                                },
                                {
                                    value: 2,
                                    name: i18next.t("Nie"),
                                },
                            ]}
                            label={i18next.t(
                                "Czy Ty, ktoś w Twojej rodzinie, lub osoba z którą jesteś lub byłeś w bliskiej relacji profesjonalnej lub biznesowej, zajmuje eksponowane stanowisko polityczne (PEP)?"
                            )}
                            required
                            activeElement={isPep}
                            onChangeActiveElement={(e) => setIsPep(e)}
                            id={"isPep"}
                        />
                        {isPepError ? (
                            <Error
                                msg={isPepErrorMsg}
                                rel=""
                                side="top"
                            ></Error>
                        ) : (
                            ""
                        )}
                    </div>

                    {isPep.value === 1 ? (
                        <>
                            <Select
                                options={[
                                    {
                                        value: 0,
                                        name: i18next.t("Wybierz opcję"),
                                    },
                                    {
                                        value: 1,
                                        name: i18next.t(
                                            "Ja jestem osobą zajmującą eksponowane stanowisko polityczne (PEP)."
                                        ),
                                    },
                                    {
                                        value: 2,
                                        name: i18next.t(
                                            "Ja jestem osobą, która pełni/ła ważną funkcję publiczna na obszarze UE/EOG."
                                        ),
                                    },
                                    {
                                        value: 3,
                                        name: i18next.t(
                                            "Ktoś w mojej rodzinie zajmuje eksponowane stanowisko polityczne (PEP)."
                                        ),
                                    },
                                    {
                                        value: 4,
                                        name: i18next.t(
                                            "Ktoś z kim jestem lub byłem w biznesowej relacji zajmuje eksponowane stanowisko polityczne (PEP)."
                                        ),
                                    },
                                ]}
                                label={i18next.t(
                                    "Jaka relacja wiąże Cię z PEP??"
                                )}
                                multiple
                                required
                                activeElement={pep}
                                onChangeActiveElement={(e) => setPep(e)}
                                id={"pep"}
                            />
                            <Input
                                id={"pepName"}
                                value={pepName || ""}
                                type={"text"}
                                required
                                onChange={handlePepNameChange}
                                label={i18next.t(
                                    "Pełne imię i nazwisko i pozycja PEP"
                                )}
                            />
                            {pepNameError ? (
                                <Error
                                    msg={pepNameErrorMsg}
                                    rel=""
                                    side="top"
                                ></Error>
                            ) : (
                                ""
                            )}
                        </>
                    ) : (
                        ""
                    )}

                    {user.data.user.type === 2 ? (
                        <>
                            <h3>{i18next.t("Dane firmy")}</h3>
                            <div className="row">
                                <div className="col">
                                    <Input
                                        id={"NIP"}
                                        value={nip || ""}
                                        type={"number"}
                                        required
                                        onChange={handleNipChange}
                                        label={i18next.t("NIP")}
                                    />
                                    {nipError ? (
                                        <Error
                                            msg={nipErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <Input
                                        id={"companyName "}
                                        value={companyName || ""}
                                        type={"text"}
                                        required
                                        onChange={handleCompanyNameChange}
                                        label={i18next.t("Nazwa działalności")}
                                    />
                                    {companyNameError ? (
                                        <Error
                                            msg={companyNameErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Input
                                        id={"businessStreet "}
                                        value={businessStreet || ""}
                                        type={"text"}
                                        required
                                        onChange={handleBusinessStreetChange}
                                        label={i18next.t("Ulica")}
                                    />
                                    {businessStreetError ? (
                                        <Error
                                            msg={businessStreetErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col col-20">
                                    <Input
                                        id={"businessApartment"}
                                        value={businessApartment || ""}
                                        type={"text"}
                                        onChange={handleBusinessApartmentChange}
                                        label={i18next.t("Mieszkanie")}
                                    />
                                    {businessApartmentError ? (
                                        <Error
                                            msg={businessApartmentErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col col-20">
                                    <Input
                                        id={"businessBuilding"}
                                        value={businessBuilding || ""}
                                        type={"text"}
                                        required
                                        onChange={handleBusinessBuildingChange}
                                        label={i18next.t("Budynek")}
                                    />
                                    {businessBuildingError ? (
                                        <Error
                                            msg={businessBuildingErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Input
                                        id={"businessPostalCode"}
                                        value={businessPostalCode || ""}
                                        type={"text"}
                                        required
                                        onChange={
                                            handleBusinessPostalCodeChange
                                        }
                                        label={i18next.t("Kod pocztowy")}
                                    />
                                    {businessPostalCodeError ? (
                                        <Error
                                            msg={businessPostalCodeErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <Input
                                        id={"businessCity"}
                                        value={businessCity || ""}
                                        type={"text"}
                                        required
                                        onChange={handleBusinessCityChange}
                                        label={i18next.t("Miasto")}
                                    />
                                    {businessCityError ? (
                                        <Error
                                            msg={businessCityErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col">
                                    <Input
                                        id={"businessState"}
                                        value={businessState || ""}
                                        type={"text"}
                                        required
                                        onChange={handleBusinessStateChange}
                                        label={i18next.t("Województwo")}
                                    />
                                    {businessStateError ? (
                                        <Error
                                            msg={businessStateErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                                <div className="col">
                                    <Input
                                        id={"businessCountry"}
                                        value={businessCountry || ""}
                                        type={"text"}
                                        required
                                        onChange={handleBusinessCountryChange}
                                        label={i18next.t("Kraj")}
                                    />
                                    {businessCountryError ? (
                                        <Error
                                            msg={businessCountryErrorMsg}
                                            rel=""
                                            side="top"
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div>

                            <div className="col">
                                <Textarea
                                    id={"businessPKD"}
                                    value={businessPKD || ""}
                                    required
                                    onChange={handleBusinessPKDChange}
                                    label={i18next.t(
                                        "Główny przedmiot działalności (PKD)[opis]"
                                    )}
                                />
                                {businessPKDError ? (
                                    <Error
                                        msg={businessPKDErrorMsg}
                                        rel=""
                                        side="top"
                                    ></Error>
                                ) : (
                                    ""
                                )}
                            </div>
                        </>
                    ) : (
                        ""
                    )}

                    <Button blue big type="submit">
                        {i18next.t("Zatwierdź dane")}
                    </Button>
                </form>
                <div className="processInfo">
                    <img
                        className="infoImg"
                        src={infoImg}
                        alt={i18next.t("Informacje dotyczące weryfikacji")}
                    />
                    <p>
                        {i18next.t(
                            "Aby w pełni korzystać z możliwości serwisu konieczne jest podanie swoich danych w formularzu obok."
                        )}
                    </p>
                    <ul className="customList numberList">
                        <li>
                            <span>1</span>
                            {i18next.t(
                                "W razie jakichkolwiek problemów skontaktuj się z działem pomocy pod adresem support@kryptowaluty.pl lub przejdź do zakładki"
                            )}{" "}
                            <Link to={getRoute("contact")}>
                                {i18next.t("Pomoc")}
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default VerificationForm;
