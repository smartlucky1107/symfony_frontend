import React, { useState, useContext, useEffect } from "react";
import i18next from "i18next";

import getCookie, { setCookie } from "../../../../../../scripts/cookies";
import PostThis from "../../../../../../scripts/post";
import { UserContext } from "../../../../../user/userContext";

import Button from "../../../../../ui/button/button";
import Infobox from "../../../../../ui/infobox/infobox";

// import instalPosImg from "../../../../../../img/install-pos.svg";
import instalPosImg from "../../../../../../img/pos.png";
import posIsInstalledImg from "../../../../../../img/pos-is-installed.svg";
import launch from "../../../../../../img/launch.png";

import "./workspacePosInstallation.scss";

const WorkspacePosInstallation = (props) => {
    const user = useContext(UserContext);
    const [isPosInstalled, setIsPosInstalled] = useState();
    const [workspaceApiKey, setWorkspaceApiKey] = useState();
    const [posInstallError, setPosInstallError] = useState(false);
    const [posInstallErrorType, setPosInstallErrorType] = useState("info");
    const [posInstallErrorMsg, setPosInstallErrorMsg] = useState();

    const handleCheckPosIsInstalled = () => {
        console.log("handleCheckPosIsInstalled");
        if (
            getCookie("workspaceApiKey") &&
            getCookie("workspaceApiKey") != "undefined" &&
            getCookie("savedWorkspaceName")
        ) {
            setIsPosInstalled(true);
            setWorkspaceApiKey(getCookie("workspaceApiKey"));
        } else handelGetPosApiKey();
    };

    const handelGetPosApiKey = async () => {
        const response = await PostThis("/api/users/me/pos-key", "GET", "", {
            authorization: "Bearer " + getCookie("authToken"),
        });
        if (response && response.status >= 200 && response.status < 300) {
            setWorkspaceApiKey(response.data.apiKey?.key ?? "undefined");
        } else if (response.status === 400) {
            props.setIsPosAllowed(false);
        } else if (response.status === 403) {
            user.logout();
        } else {
            setPosInstallError(true);
            setPosInstallErrorMsg(
                "Wystąpił błąd, odśwież stronę i spróbuj ponownie"
            );
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

    useEffect(() => {
        handleCheckPosIsInstalled();
    }, [props.activeTab]);
    return (
        <>
            <div className="workspacePosInstallation">
                <h1 className="stdDashboardHeader">{i18next.t("Punkt POS")}</h1>
                <div className="launchImg">
                  <img src={launch}/>
                </div>

                {/* <div className="dashboardIntroduce">
                    <p>{i18next.t("Panel zarządzania punktami POS")}</p>
                </div> */}
                {/* <div className="installPos">
                    <div className="row rowBox">
                        <div className="col col-md-4">
                            {!workspaceApiKey ||
                            workspaceApiKey === "undefined" ||
                            !isPosInstalled ? (
                                <img
                                    src={instalPosImg}
                                    className="workspacePosImg"
                                    alt=""
                                />
                            ) : (
                                <img
                                    src={posIsInstalledImg}
                                    className="workspacePosImg"
                                    alt=""
                                />
                            )}
                        </div>
                        <div className="col col-md-8 flexBox">
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
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
};

export default WorkspacePosInstallation;
