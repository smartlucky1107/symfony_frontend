import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import i18next from "i18next";
import ReCAPTCHA from "react-google-recaptcha";

import "./workspaceData.scss";

import PostThis from "../../../../../scripts/post";
import { UserContext } from "../../../../user/userContext";
import appStoreImg from "./../../../../../img/appstore.svg";
import googlePlayImg from "./../../../../../img/googleplay.png";
import acctset from "./../../../../../img/accountsetting.png";
import emmp from "./../../../../../img/employee.png";
import getCookie, { setCookie } from "../../../../../scripts/cookies";
import Button from "../../../../ui/button/button";
import Preloader from "../../../../ui/preloader/preloader";
import Input from "../../../../ui/input/input";
import Error from "../../../../ui/errorBox/error";
import Infobox from "../../../../ui/infobox/infobox";
import Search from "./../../../../ui/search/search";
import CustomList from "./../../../../ui/customList/customList";
import { CustomListItem } from "./../../../../ui/customList/customList";

const WorkspaceData = (props) => {
    const user = useContext(UserContext);
    const [pinWorkspace, setPinWorkspace] = useState("");
    const [authCode, setAuthCode] = useState();
    const [workspaceApiKey, setWorkspaceApiKey] = useState();
    const [secretCode, setSecretCode] = useState();
    const [qrCodeUrl, setQrCodeUrl] = useState();
    const [pinWorkspaceFormMsg, setPinWorkspaceFormMsg] = useState();
    const [pinWorkspaceFormStatus, setPinWorkspaceFormStatus] = useState();
    const [pinWorkspacePreloader, setPinWorkspacePreloader] = useState(false);
    const [isPosInstalled, setIsPosInstalled] = useState();
   
    const [posInstallError, setPosInstallError] = useState(false);
    const [posInstallErrorType, setPosInstallErrorType] = useState("info");
    const [posInstallErrorMsg, setPosInstallErrorMsg] = useState();
    const [formError, setFormError] = useState();
    const [formErrorMsg, setFormErrorMsg] = useState(
        i18next.t("Nieprawidłowy kod Google Authenticator")
    );

    // const [workspaceData, setWorkspaceData] = useState(props.workspace);

    const [recaptchaReq, setRecaptchaReq] = useState();
  
    const [recaptchaValue, setRecaptchaValue] = useState();

    const recaptchaRef = useRef();
    const TWOFA = useRef(null);

    const handleGet2FAData = async (cancelToken) => {
        const response = await PostThis(
            "/api/users/me/pos/workspace/gauth",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            cancelToken
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setSecretCode(response.data.secret);
                setQrCodeUrl(response.data.qrUrl);
            } else if (response.status === 400) {
                props.setIsPosAllowed(false);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setFormErrorMsg(response.data.message);
            }
        }
    };

    const handleToggleClass = (ref, className) => {
        ref.current.classList.toggle(className);
        setTimeout(() => {
            ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 300);
    };

    const handleAuthCodeChange = (inputId, value) => {
        setAuthCode(value);
    };
    const handleInstallPosOnDevice = async (key) => {
        // workspaceApiKey
        //savedWorkspaceName

        if (key) {
            setCookie("workspaceApiKey", key, 365);
        } else {
            setCookie("workspaceApiKey", workspaceApiKey, 365);
        }
        setCookie("savedWorkspaceName", props.workspace.name, 365);
        setIsPosInstalled(true);
    };

    const handleRemovePos = async () => {
        // workspaceApiKey
        //savedWorkspaceName

        const response = await PostThis(
            `/api/users/me/pos-key/${workspaceApiKey}/deactivate`,
            "PATCH",
            "",
            {
                authorization: "Bearer " + getCookie("authToken"),
            }
        );
        if (response && response.status >= 200 && response.status < 300) {
            setCookie("workspaceApiKey", workspaceApiKey, -1);
            setCookie("savedWorkspaceName", props.workspace.name, -1);
            setIsPosInstalled(false);
            setWorkspaceApiKey("");
        } else if (response.status === 400) {
            if (response.data.message === "Api key already disabled") {
                setPosInstallError(true);
                setPosInstallErrorType("error");
                setPosInstallErrorMsg(response.data.message);
                setWorkspaceApiKey("");
                setIsPosInstalled(false);
                setCookie("workspaceApiKey", workspaceApiKey, -1);
                setCookie("savedWorkspaceName", props.workspace.name, -1);
                setTimeout(() => {
                    setPosInstallError(false);
                }, 3000);
            } else {
                setPosInstallError(true);
                setPosInstallErrorType("error");
                setPosInstallErrorMsg(response.data.message);
            }
            // props.setIsPosAllowed(false);
        } else if (response.status === 403) {
            user.logout();
        } else {
            setPosInstallError(true);
            setPosInstallErrorType("error");
            setPosInstallErrorMsg(
                "Wystąpił błąd, odśwież stronę i spróbuj ponownie"
            );
        }
    };
    const handlePinWorkspaceChange = (inputId, value) => {
        setPinWorkspace(value);
    };
    const onReCaptchaChange = (key) => {
        setRecaptchaValue(key);
    };
    const handleGoToPos = () => {
        if (
            window.location.hostname === "dev.kryptowaluty.pl" ||
            window.location.hostname === "localhost"
        ) {
            window.location.replace("https://devpos.kryptowaluty.pl/");
        } else {
            window.location.replace("https://pos.kryptowaluty.pl/");
        }
    };
    const handleGeneratePosApiKey = async () => {
        const response = await PostThis("/api/users/me/pos-key", "POST", "", {
            authorization: "Bearer " + getCookie("authToken"),
        });
        if (response.status >= 200 && response.status < 300) {
            setWorkspaceApiKey(response.data.apiKey.key);
            handleInstallPosOnDevice(response.data.apiKey.key);
        } else if (response.status === 400) {
            props.setIsPosAllowed(false);
        } else if (response.status === 403) {
            user.logout();
        } else {
            setPosInstallError(true);
            setPosInstallErrorMsg(response?.data?.message);
        }
    };
    const handleChangePinForm = async (e) => {
        e.preventDefault();

        if (recaptchaValue) {
            // { pin: pinWorkspace, "g-recaptcha-response": recaptchaValue },

            if (pinWorkspace && !isNaN(pinWorkspace)) {
                setPinWorkspacePreloader(true);
                const response = await PostThis(
                    "/api/users/me/pos/workspace/pin",
                    "PATCH",
                    { pin: pinWorkspace },
                    {
                        Authorization: "Bearer " + user.data.user?.authToken,
                    }
                );
                if (response) {
                    setPinWorkspacePreloader(false);
                    if (response.status >= 200 && response.status < 300) {
                        setPinWorkspace("");
                        setRecaptchaReq(false);
                        setPinWorkspaceFormStatus("success");
                        setPinWorkspaceFormMsg(
                            i18next.t("Pin został zmieniony.")
                        );
                    } else if (response.status === 400) {
                        props.setIsPosAllowed(false);
                    } else if (response.status === 403) {
                        user.logout();
                    } else {
                        setPinWorkspaceFormStatus("warning");
                        setPinWorkspaceFormMsg(
                            i18next.t(`${response.data.message}`)
                        );
                    }
                } else {
                    setPinWorkspaceFormStatus("error");
                    setPinWorkspaceFormMsg(
                        i18next.t("Wystąpił błąd, proszę spróbować później")
                    );
                    setTimeout(() => {
                        setPinWorkspaceFormStatus(null);
                    }, 5000);
                }
            } else {
                setPinWorkspaceFormStatus("warning");
                setPinWorkspaceFormMsg(
                    i18next.t("Pin musi składać się wyłącznie z cyfr")
                );
                setTimeout(() => {
                    setPinWorkspaceFormStatus(null);
                }, 5000);
            }
        } else {
            setPinWorkspacePreloader(false);
            setRecaptchaReq(true);
            setTimeout(() => {
                setRecaptchaReq(false);
            }, 5000);
        }
    };

    const handleGAuth = async (e) => {
        e.preventDefault();
        setFormError(false);
        const response = await PostThis(
            "/api/users/me/pos/workspace/gauth",
            "PATCH",
            { secret: secretCode, "g-auth-code": authCode },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                if (response.data?.message) {
                    setFormError(true);
                }
            } else if (response.status === 400) {
                props.setIsPosAllowed(false);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        // if (props.activeTab === "company") {
        const source = axios.CancelToken.source();
        handleGet2FAData(source.token);

        return () => {
            source.cancel();
        };
        // }

        // props.activeTab
    }, []);

    return (
        <section className="workspaceData">
            {/* <h1 className="stdDashboardHeader">{i18next.t("Dane firmy")}</h1> */}
            <h1 className="stdDashboardHeader">{i18next.t("Punkt pos")}</h1>
            <div className="dashboardIntroduce">
                <p>
                    {i18next.t(
                        "W tym panelu możesz sprawdzić dane swojej firmy, dodać autoryzację dwustopniową oraz zresetować swoje hasło. Szczególnie zalecamy używanie autoryzacji dwustopniowej, ponieważ znacząco zwiększa ona bezpieczeństwo Twojego konta."
                    )}
                </p>
            </div>
            <div className="row rowBox">
                <div className="col col-xl-6">
                    {/* <div className="greenFeel"> {i18next.t("POS aktywny na tym urzadzeniu")}</div>
                    <div>
                      <Button className="lightBtn">
                            {i18next.t("Przejdz do POS")}
                      </Button>
                      <Button className="lightBtn red ml5">
                            {i18next.t("Usun POS")}
                      </Button>
                    </div> */}
                     {/* <div className="col col-md-8 flexBox"> */}
                            <div className="alignMe">
                                {isPosInstalled ? (
                                    <>
                                        <Infobox
                                            icon={"thumb_up"}
                                            type={"success"}
                                        >
                                            {i18next.t(
                                                "POS został wykryty na tym urządzeniu"
                                            )}
                                        </Infobox>

                                        <Button
                                            rightIcon="exit_to_app"
                                            onClick={() => handleGoToPos()}
                                        >
                                            {i18next.t("Przejdź do POS")}
                                        </Button>
                                        <Button
                                            rightIcon="delete_forever"
                                            onClick={() => handleRemovePos()}
                                        >
                                            {i18next.t(
                                                "Usuń POS z tego urządzenia"
                                            )}
                                        </Button>
                                    </>
                                ) : (
                                    ""
                                )}

                                {!workspaceApiKey ||
                                workspaceApiKey === "undefined" ? (
                                    <Button
                                        rightIcon="create"
                                        onClick={() =>
                                            handleGeneratePosApiKey()
                                        }
                                    >
                                        {i18next.t(
                                            "Wygeneruj klucz i zainstaluj POS na tym urządzeniu"
                                        )}
                                    </Button>
                                ) : !isPosInstalled ? (
                                    <Button
                                        rightIcon="store"
                                        onClick={() =>
                                            handleInstallPosOnDevice()
                                        }
                                    >
                                        {i18next.t(
                                            "Zainstaluj POS na tym urządzeniu"
                                        )}
                                    </Button>
                                ) : (
                                    ""
                                )}

                                {posInstallError ? (
                                    <Infobox
                                        icon={"info"}
                                        type={posInstallErrorType}
                                    >
                                        {i18next.t(posInstallErrorMsg)}
                                    </Infobox>
                                ) : (
                                    ""
                                )}
                            </div>
                        {/* </div> */}

                    {/* <div className="content">
                        <h3 className="title">{i18next.t("Twoje dane")}</h3>
                        <div className="flexTable">
                            <div className="ftRow">
                                <div className="ftCol ftLeft">
                                    {i18next.t("Nazwa firmy")}
                                </div>
                                <div className="ftCol ftRight">
                                    {props.workspace?.companyName}
                                </div>
                            </div>
                            <div className="ftRow">
                                <div className="ftCol ftLeft">
                                    {i18next.t("NIP")}
                                </div>
                                <div className="ftCol ftRight">
                                    {props.workspace?.companyNip}
                                </div>
                            </div>

                            <div className="ftRow">
                                <div className="ftCol ftLeft">
                                    {i18next.t("Adres")}
                                </div>
                                <div className="ftCol ftRight">
                                    {i18next.t("ul.")}{" "}
                                    {props.workspace?.companyStreet}
                                    <br />
                                    {props.workspace?.companyPostcode}{" "}
                                    {props.workspace?.companyCity},
                                    <br />
                                    {props.workspace?.companyCountry}
                                </div>
                            </div>
                            <div className="ftRow">
                                <div className="ftCol ftLeft">
                                    {i18next.t("Wybrana waluta FIAT")}
                                </div>
                                <div className="ftCol ftRight">
                                    {
                                        props?.workspace?.defaultQuotedCurrency
                                            .fullName
                                    }
                                </div>
                            </div>
                            <div className="ftRow">
                                <div className="ftCol ftLeft">
                                    {i18next.t("Dane zweryfikowane")}
                                </div>
                                <div className="ftCol ftRight">
                                    {props?.workspace?.verified
                                        ? i18next.t("Tak")
                                        : i18next.t("Nie")}
                                </div>
                            </div>

                            <div className="ftRow">
                                <div className="ftCol ftLeft">
                                    {i18next.t(
                                        "Autoryzacja dwustopinowa (2FA)"
                                    )}
                                </div>
                                <div className="ftCol ftRight">
                                    {props?.workspace?.isGAuthEnabled ? (
                                        i18next.t("Aktywna")
                                    ) : (
                                        <div className="errorBox colorError">
                                            <span className="material-icons ">
                                                warning
                                            </span>{" "}
                                            {i18next.t("Wyłączona")}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="ftRow">
                                <form
                                    className="preloaderWrapper"
                                    onSubmit={(e) => {
                                        handleChangePinForm(e);
                                    }}
                                >
                                    {pinWorkspaceFormStatus ? (
                                        <Infobox
                                            icon={"info"}
                                            type={pinWorkspaceFormStatus}
                                        >
                                            {pinWorkspaceFormMsg}
                                        </Infobox>
                                    ) : (
                                        ""
                                    )}
                                    <Preloader show={pinWorkspacePreloader} />
                                    <div className="ftCol ftLeft">
                                        <Input
                                            id={"pinWorkspace"}
                                            value={pinWorkspace}
                                            type={"text"}
                                            onChange={handlePinWorkspaceChange}
                                            placeholder={i18next.t(
                                                "Podaj nowy pin"
                                            )}
                                        />
                                    </div>
                                    <div className="ftCol ftRight">
                                        <Button
                                            type="submit"
                                            rightIcon="security"
                                        >
                                            {i18next.t("Zmień pin")}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                            <div className="ftRow">
                                <ReCAPTCHA
                                    className={"recaptchaContainer"}
                                    ref={recaptchaRef}
                                    sitekey={
                                        process.env
                                            .REACT_APP_RECAPTCHA_PUBLIC_KEY
                                    }
                                    onChange={onReCaptchaChange}
                                />
                                {recaptchaReq ? (
                                    <Error
                                        msg={i18next.t("reCaptch wymagana")}
                                        side="top"
                                    ></Error>
                                ) : (
                                    ""
                                )}
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="col col-xl-6">
                    <img src={acctset}/>

                    {/* <div className="content">
                        <h3 className="title">
                            {i18next.t("Autoryzacja dwustopniowa (2FA)")}
                        </h3>
                        <p>
                            {i18next.t(
                                "Autoryzacja dwustopniowa generuje dodatkowy kod w aplikacji Google Authenticator na telefonie, którego używasz do logowania oraz potwierdzania transakcji."
                            )}
                        </p>
                        <Button
                            rightIcon="security"
                            onClick={(e) => handleToggleClass(TWOFA, "show")}
                        >
                            {i18next.t("Skonfiguruj autoryzację dwustopniową")}
                        </Button>
                    </div> */}
                </div>
            </div>

            <div className="row rowBox mt2">
                <div className="col col-xl-6">
                  <h3 className="title">
                     {i18next.t("Pracownicy")}
                  </h3>
                 
                    <Search                    
                        name={"searchWallet"}
                        placeholder={i18next.t("Wyszukaj...")}
                    />
                               
                                <div className="em-info-list mt-1"> 
                                         <CustomList>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>
                                                <CustomListItem > 
                                                   <div className="customListItemCol ">
                                                        11-1-2021
                                                    </div>
                                                    <div className="customListItemCol ">
                                                      11:00   
                                                    </div>
                                                    <div className="customListItemCol ">
                                                       3333.33 pLN
                                                    </div>
                                                    <div className="customListItemCol left green">
                                                       Realized
                                                    </div>
                                                </CustomListItem>                                         
                                               

                                          </CustomList>
                                     </div>

                    <div className="mt1">
                      <Button className="lightBtn red">
                            {i18next.t("Usun pracownika")}
                      </Button>
                    </div>              

                 </div>
                <div className="col col-xl-6">
                   <div className="text-right">
                      <Button rightIcon="add">
                        {i18next.t("Dodaj pracownika")}
                      </Button>
                   </div>
                   <div className="emmpimg">
                      <img src={emmp}/>
                    </div>
                     
                </div>
            </div>


            <div className="twoFactor" ref={TWOFA}>
                <div className="row">
                    <div className="col tfab1">
                        <div className="content">
                            <h3 className="title">
                                {i18next.t(
                                    "Skonfiguruj swoją autoryzację dwuetapową"
                                )}
                            </h3>

                            <ul className="customList numberList">
                                <li>
                                    <span>1</span>
                                    {i18next.t(
                                        "Pobierz aplikację Google Authenticator a swój smartfon"
                                    )}
                                    <div>
                                        <a
                                            href="https://apps.apple.com/pl/app/google-authenticator/id388497605"
                                            title="Pobierz Google Authenticator z App Store"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={appStoreImg}
                                                alt={i18next.t(
                                                    "Pobierz Google Authenticator z App Store"
                                                )}
                                            />
                                        </a>

                                        <a
                                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                                            title="Pobierz Google Authenticator z Google Play"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <img
                                                src={googlePlayImg}
                                                alt={i18next.t(
                                                    "Pobierz Google Authenticator z Google Play"
                                                )}
                                            />
                                        </a>
                                    </div>
                                </li>
                                <li>
                                    <span>2</span>
                                    {i18next.t(
                                        "Zeskanuj kod QR lub przepisz kod do swojej aplikacji"
                                    )}
                                </li>
                                <li>
                                    <span>3</span>
                                    {i18next.t(
                                        "W polu poniżej kodem QR, podaj kod wygenerowany przez aplikację Google Authenticator"
                                    )}
                                </li>
                                <li>
                                    <span>4</span>
                                    {i18next.t(
                                        "Kliknij Włącz 2FA - Jesteś gotów do używania swojej weryfikacji dwuetapowej (2FA)!"
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col">
                        <div className="content preloaderWrapper qr">
                            <Preloader />
                            <h3 className="title">
                                {i18next.t(
                                    "Zeskanuj kod QR lub użyj kodu tekstowego"
                                )}
                            </h3>

                            <div className="qrCode">
                                <img src={qrCodeUrl} alt="" />
                            </div>
                            <div className="secretCode">{secretCode}</div>
                            <form
                                className="authCode"
                                onSubmit={(e) => {
                                    handleGAuth(e);
                                }}
                            >
                                <Input
                                    id={"authCode"}
                                    value={authCode}
                                    type={"text"}
                                    onChange={handleAuthCodeChange}
                                    placeholder={i18next.t("2FA Kod")}
                                />
                                <Button type="submit" rightIcon="security">
                                    {i18next.t("Włącz 2FA")}
                                </Button>

                                {formError ? (
                                    <Error
                                        msg={formErrorMsg}
                                        side="top"
                                    ></Error>
                                ) : (
                                    ""
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WorkspaceData;
