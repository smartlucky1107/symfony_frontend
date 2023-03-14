import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import i18next from "i18next";

import { UserContext } from "../../../user/userContext";
import { ModalControllerContext } from "../../../modals/modalControllerContext";

import "./dashboardSingleWorker.scss";
import UserDashboard from "./../userDashboard";

import PostThis from "../../../../scripts/post";

import SingleCurrencyPair from "./../singleCurrencyPair/singleCurrencyPair";
import Error from "../../../ui/errorBox/error";
import Infobox from "../../../ui/infobox/infobox";
import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";

import SearchBar from "../searchBar/searchBar";
import WalletsList from "../walletsList/walletsList";
import Tooltip from "../../../ui/tooltip/tooltip";
import Loader from "../../../ui/loader/loader";

const DashboardSingleWorker = () => {
    const user = useContext(UserContext);
    const modalController = useContext(ModalControllerContext);
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isEnabled, setIsEnabled] = useState();
    const [pin, setPin] = useState("");
    const [workerDataPreloader, setWorkerDataPreloader] = useState(false);
    const [pinPreloader, setPinPreloader] = useState(false);

    const [pinFormMsg, setPinFormMsg] = useState();
    const [pinFormStatus, setPinFormStatus] = useState();

    const [currenciesList, setCurrenciesList] = useState();
    const [currenciesListError, setCurrenciesListError] = useState(false);
    const [currenciesListErrorMsg, setCurrenciesListErrorMsg] = useState(
        i18next.t("Brak wyników")
    );
    const [currenciesListPreloader, setCurrenciesListPreloader] = useState(
        false
    );
    const [boxPlaceholder, setBoxPlaceholder] = useState(false);
    const [walletsList, setWalletsList] = useState();
    const [walletsListError, setWalletsListError] = useState();

    const [walletsListErrorMsg, setWalletsListErrorMsg] = useState(
        i18next.t("Brak wyników")
    );
    const [walletsListPreloader, setwalletsListPreloader] = useState(false);

    const [filter, setFilter] = useState({
        value: 0,
        name: i18next.t("Wszystkie waluty"),
    });

    const [recaptchaValue, setRecaptchaValue] = useState();
    const [recaptchaReq, setRecaptchaReq] = useState();

    const recaptchaRef = useRef();
    const listRef = useRef();

    // Zmień pin input
    const handlePinChange = (inputId, value) => {
        setPin(value);
    };

    // Zmień pin pracownika formularz
    const handleChangePinForm = async (e) => {
        e.preventDefault();

        if (recaptchaValue) {
            if (pin && !isNaN(pin)) {
                setPinPreloader(true);

                // { pin: pin, "g-recaptcha-response": recaptchaValue },
                const response = await PostThis(
                    `/api/users/me/pos/employee/${id}/pin`,
                    "PATCH",
                    { pin: pin },
                    {
                        Authorization: "Bearer " + user.data.user?.authToken,
                    }
                );

                if (response) {
                    setPinPreloader(false);
                    if (response.status >= 200 && response.status < 300) {
                        setPin("");
                        setRecaptchaReq(false);
                        setPinFormStatus("success");
                        setPinFormMsg(i18next.t("Pin został zmieniony."));
                    } else if (response.status === 403) {
                        user.logout();
                    } else {
                        setPinFormStatus("warning");
                        setPinFormMsg(i18next.t(`${response.data.message}`));
                    }
                } else {
                    setPinFormStatus("error");
                    setPinFormMsg(
                        i18next.t("Wystąpił błąd, proszę spróbować później")
                    );
                    setTimeout(() => {
                        setPinFormStatus(null);
                    }, 5000);
                }
            } else {
                setPinFormStatus("warning");
                setPinFormMsg(
                    i18next.t("Pin musi składać się wyłącznie z cyfr")
                );
                setTimeout(() => {
                    setPinFormStatus(null);
                }, 5000);
            }
        } else {
            setPinPreloader(false);
            setRecaptchaReq(true);
            setTimeout(() => {
                setRecaptchaReq(false);
            }, 5000);
        }
    };
    // Zablokuj pracownika
    const handleBlockWorker = async (inputId, value) => {
        const response = await PostThis(
            `/api/users/me/pos/employee/${id}/disable`,
            "PATCH",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            ""
        );

        if (response) {
            if (response.status === 204) {
                console.log(response.data);
                getWorkerData(id);
            } else {
                console.log(response);
            }
        }
        // setBlockWorker(value);
    };

    // Odblokuj pracownika pracownika
    const handleUnblockWorker = async (inputId, value) => {
        const response = await PostThis(
            `/api/users/me/pos/employee/${id}/enable`,
            "PATCH",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            ""
        );

        if (response) {
            if (response.status === 204) {
                getWorkerData(id);
            } else {
                console.log(response);
            }
        }
    };

    // Zablokuj parę
    const handleBlockCurrency = () => {
        // Prace nad blokowaniem transakcji na danej walucie zostały wstrzymane na polecenie CTO
    };
    // Zezwól na trensakcję bez weryfikacji sms
    const handleAllowWithoutAuth = () => {
        // Prace nad zezwoleniem transakcji bez weryfikacji sms  zostały wstrzymane na polecenie CTO
    };

    // Ustaw limit waluty dla pracownika
    const handleWalletLimit = () => {
        console.log(
            "Ustawienie limitu transakcji dla pracownika - Nie ma endpointa, czekam na back-end. AS"
        );
    };

    const onReCaptchaChange = (key) => {
        setRecaptchaValue(key);
    };

    // Pobieranie danych pracownika
    const getWorkerData = async (id, cancelToken) => {
        setWorkerDataPreloader(true);
        const response = await PostThis(
            `/api/users/me/pos/workspace/employees/${id}`,
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
                setName(response?.data?.firstName);
                setLastName(response?.data?.lastName);
                setIsEnabled(response?.data?.isEnabled);
                // setCurrenciesList(response.data.result);
            } else if (response.status === 403) {
                user.logout();
            } else {
                console.log("Błąd pobierania danych pracownika");
            }
        }
        setWorkerDataPreloader(false);
    };
    //Pobieranie listy portfeli
    const getWalletsList = async (cancelToken) => {
        setBoxPlaceholder(true);
        const response = await PostThis(
            "/api/users/me/wallets?pageSize=0",
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
                // setWalletsListError();
                // setWalletsListErrorMsg();

                setWalletsList(response.data.result);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }

            setBoxPlaceholder(false);
        }
    };
    //Pobieranie listy dostępnych par walut
    const getCurrenciesList = async (cancelToken) => {
        setCurrenciesListPreloader(true);

        const response = await PostThis(
            "/public-api/homepage-data",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            },
            "",
            cancelToken
        );
        if (response) {
            setCurrenciesListPreloader(false);
            if (response.status >= 200 && response.status < 300) {
                // setCurrenciesListError(false);
                // setCurrenciesListErrorMsg();
                return setCurrenciesList(response.data.currencyPairs);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        let urlId = window.location.pathname.split("/");

        setId(urlId[urlId.length - 1]);

        const source = axios.CancelToken.source();
        getWalletsList(source.token);
        getWorkerData(urlId[urlId.length - 1], source.token);
        getCurrenciesList(source.token);

        return () => {
            source.cancel();
        };
    }, []);

    return (
        <UserDashboard>
            <section className="dashboardSingleWorker">
                <h1 className="stdDashboardHeader">{i18next.t("Pracownik")}</h1>

                <div className="row rowBox">
                    <div className="col col-xl-6">
                        <div className="content ">
                            <h3 className="title">
                                {i18next.t("Dane pracownika")}
                            </h3>
                            <div className="flexTable preloaderWrapper">
                                {workerDataPreloader ? (
                                    <Loader
                                        absolute
                                        label={i18next.t("Przetwarzanie")}
                                    />
                                ) : (
                                    ""
                                )}
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Id pracownika")}
                                    </div>
                                    <div className="ftCol ftRight">{id}</div>
                                </div>
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Imię")}
                                    </div>
                                    <div className="ftCol ftRight">{name}</div>
                                </div>
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Nazwisko")}
                                    </div>
                                    <div className="ftCol ftRight">
                                        {lastName}
                                    </div>
                                </div>
                                <div className="ftRow">
                                    <div className="ftCol ftLeft">
                                        {i18next.t("Pracownik zablokowany")}
                                    </div>
                                    <div className="ftCol ftRight">
                                        <Input
                                            id={"isEnabled"}
                                            value={!isEnabled}
                                            type={"checkbox"}
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                                <div className="ftRow">
                                    <form
                                        className="preloaderWrapper"
                                        id="changePinForm"
                                        onSubmit={(e) => {
                                            handleChangePinForm(e);
                                        }}
                                    >
                                        {pinFormStatus ? (
                                            <Infobox
                                                icon={"info"}
                                                type={pinFormStatus}
                                            >
                                                {pinFormMsg}
                                            </Infobox>
                                        ) : (
                                            ""
                                        )}

                                        {pinPreloader ? (
                                            <Loader
                                                absolute
                                                label={i18next.t(
                                                    "Przetwarzanie"
                                                )}
                                            />
                                        ) : (
                                            ""
                                        )}
                                        <div className="ftCol ftLeft">
                                            <Input
                                                id={"pin"}
                                                value={pin}
                                                type={"text"}
                                                onChange={handlePinChange}
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
                        </div>
                    </div>
                    <div className="col col-xl-6">
                        <div className="content ">
                            <div className="disableEmployeeButtonBox">
                                {isEnabled ? (
                                    <Button
                                        rightIcon={"block"}
                                        onClick={() => handleBlockWorker()}
                                    >
                                        {i18next.t("Zablokuj pracownika")}
                                    </Button>
                                ) : (
                                    <Button
                                        rightIcon={"check"}
                                        onClick={() => handleUnblockWorker()}
                                    >
                                        {i18next.t("Odblokuj pracownika")}
                                    </Button>
                                )}
                            </div>
                            {/* <h3 className="title">
                                {i18next.t("Lista dostępnych par")}
                            </h3>
                            <div className="currenciesList">
                                <div className="currenciesListHeader">
                                    <div className="form">
                                        <div className="checkboxNames">
                                            <div className={"tooltipWrapper"}>
                                                <span className="material-icons">
                                                    cancel
                                                </span>
                                                <Tooltip
                                                    text={i18next.t(
                                                        "Zablokuj parę"
                                                    )}
                                                    side="left"
                                                />
                                            </div>
                                            <div className={"tooltipWrapper"}>
                                                <span className="material-icons">
                                                    lock_open
                                                </span>
                                                <Tooltip
                                                    text={i18next.t(
                                                        "Brak autoryzacji"
                                                    )}
                                                    side="left"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="currenciesListBody preloaderWrapper">
                                  {currenciesListPreloader ? (
                                    <Loader
                                        absolute
                                        label={i18next.t("Przetwarzanie")}
                                    />
                                ) : (
                                    ""
                                )}


                                    {currenciesList?.map((item, index) => {
                                        return (
                                            <SingleCurrencyPair
                                                name={item.pairShortName}
                                                key={index}
                                            />
                                        );
                                    })}
                                    {currenciesListError ? (
                                        <Error
                                            msg={i18next.t("Brak wyników")}
                                        ></Error>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>

                <SearchBar
                    listRef={listRef}
                    filter={filter}
                    setFilter={setFilter}
                />

                {/* <WalletsList
                    walletsList={walletsList}
                    listRef={listRef}
                    walletsListError={walletsListError}
                    walletsListErrorMsg={walletsListErrorMsg}
                    // walletsListPreloader={walletsListPreloader}
                    boxPlaceholder={boxPlaceholder}
                    setBoxPlaceholder={setBoxPlaceholder}
                    handleWalletLimit={handleWalletLimit}
                    showWalletLimit={false}
                    showAddFunds={true}
                    showWidthdrowFunds={false}
                /> */}
                <WalletsList
                    walletsList={walletsList}
                    listRef={listRef}
                    walletsListError={walletsListError}
                    walletsListErrorMsg={walletsListErrorMsg}
                    // showAddFunds={true}
                    showWidthdrowFunds={true}
                    boxPlaceholder={boxPlaceholder}
                    setBoxPlaceholder={setBoxPlaceholder}
                    showBuy={true}
                />
            </section>
        </UserDashboard>
    );
};

export default DashboardSingleWorker;
