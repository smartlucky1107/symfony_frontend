import React, { useState, useContext } from "react";
import i18next from "i18next";

import "./createEmployee.scss";
import { UserContext } from "../../../../user/userContext";

import PostThis from "./../../../../../scripts/post";

import Button from "./../../../../ui/button/button";
import Input from "./../../../../ui/input/input";
import Infobox from "./../../../../ui/infobox/infobox";
import Error from "./../../../../ui/errorBox/error";
import Preloader from "./../../../../ui/preloader/preloader";

const CreateEmployee = (props) => {
    const user = useContext(UserContext);
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    const [firstNameErrorMsg, setFirstNameErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);
    const [lastNameErrorMsg, setLastNameErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [pinEmployee, setPinEmployee] = useState("");
    const [pinEmployeeError, setPinEmployeeError] = useState(false);
    const [pinEmployeeErrorMsg, setPinEmployeeErrorMsg] = useState(
        i18next.t("Pole obowiązkowe")
    );
    const [showFormMsg, setShowFormMsg] = useState(false);
    const [formStatus, setFormStatus] = useState(false);
    const [formMsg, setFormMsg] = useState("");
    const [preloader, setPreloader] = useState(false);

    const handleFirstNameChange = (inputId, value) => {
        setFirstName(value);
    };
    const handleLastNameChange = (inputId, value) => {
        setLastName(value);
    };
    const handlePinChange = (inputId, value) => {
        setPinEmployee(value);
    };

    const handleCreateNewWokerForm = async (e) => {
        e.preventDefault();
        setFirstNameError(false);
        setLastNameError(false);
        setPinEmployeeError(false);
        setPreloader(true);

        const response = await PostThis(
            "/api/users/me/pos/employee",
            "POST",
            {
                firstName: firstName,
                lastName: lastName,
                pin: pinEmployee,
            },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            setPreloader(false);
            if (response.status >= 200 && response.status < 300) {
                setShowFormMsg(true);
                setFormStatus("success");
                setFormMsg(i18next.t("Pracownik został utworzony"));
                setFirstName("");
                setLastName("");
                setPinEmployee("");
                setTimeout(() => {
                    props.handleClosePopup();
                }, 3000);
            } else if (response.status === 403) {
                user.logout();
            } else {
                if (response.data) {
                    let errorField = response.data.message.split(".");

                    if (errorField[errorField.length - 1] === "[firstName]") {
                        setFirstNameError(true);
                        setFirstNameErrorMsg(
                            i18next.t("Nieprawidłowa wartość pola")
                        );
                        setTimeout(() => {
                            setFirstNameError(false);
                        }, 5000);
                    } else if (
                        errorField[errorField.length - 1] === "[lastName]"
                    ) {
                        setLastNameError(true);
                        setLastNameErrorMsg(
                            i18next.t("Nieprawidłowa wartość pola")
                        );
                        setTimeout(() => {
                            setLastNameError(false);
                        }, 5000);
                    } else if (errorField[errorField.length - 1] === "[pin]") {
                        setPinEmployeeError(true);
                        setPinEmployeeErrorMsg(
                            i18next.t("Nieprawidłowa wartość pola.") +
                                errorField[0]
                        );
                        setTimeout(() => {
                            setPinEmployeeError(false);
                        }, 10000);
                    }
                }
                setShowFormMsg(true);
                setFormStatus("warning");
                setFormMsg(i18next.t("Uzupełnij brakujące pola"));
            }
        }
    };

    return (
        <>
            <div className="createEmployee">
                <div className="textCenter">
                    <h3>{i18next.t("Tworzenie nowego pracownika")}</h3>
                </div>
                {showFormMsg ? (
                    <Infobox icon={"info"} type={formStatus}>
                        {formMsg}
                    </Infobox>
                ) : (
                    ""
                )}

                <form
                    onSubmit={(e) => handleCreateNewWokerForm(e)}
                    className="preloaderWrapper"
                >
                    <Preloader show={preloader} />

                    <Input
                        id={"firstName"}
                        value={firstName}
                        type={"text"}
                        onChange={handleFirstNameChange}
                        label={i18next.t("Imię")}
                        required
                    ></Input>
                    {firstNameError ? (
                        <Error
                            msg={firstNameErrorMsg}
                            rel="firstNameError"
                            side="top"
                        ></Error>
                    ) : (
                        ""
                    )}
                    <Input
                        id={"lastName"}
                        value={lastName}
                        type={"text"}
                        onChange={handleLastNameChange}
                        label={i18next.t("Nazwisko")}
                        required
                    ></Input>
                    {lastNameError ? (
                        <Error
                            msg={lastNameErrorMsg}
                            rel="lastNameError"
                            side="top"
                        ></Error>
                    ) : (
                        ""
                    )}
                    <Input
                        id={"pinEmployee"}
                        value={pinEmployee}
                        type={"password"}
                        onChange={handlePinChange}
                        label={i18next.t("Pin")}
                        required
                    ></Input>
                    {pinEmployeeError ? (
                        <Error
                            msg={pinEmployeeErrorMsg}
                            rel="pinError"
                            side="top"
                        ></Error>
                    ) : (
                        ""
                    )}
                    <Button type="submit" rightIcon={"person_add"}>
                        {i18next.t("Dodaj pracownika")}
                    </Button>
                </form>
            </div>
        </>
    );
};

export default CreateEmployee;
