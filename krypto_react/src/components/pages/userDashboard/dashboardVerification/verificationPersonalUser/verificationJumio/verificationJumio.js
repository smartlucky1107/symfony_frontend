import React, { useEffect, useState, useContext } from "react";
import i18next from "i18next";
import PostThis from "../../../../../../scripts/post";
import { UserContext } from "../../../../../user/userContext";

import "./verificationJumio.scss";

import StatusCompleted from "./statusCompleted/statusCompleted";
import StatusRetry from "./statusRetry/statusRetry";
import StatusError from "./statusError/statusError";
// import StatusMaintenance from "./statusMaintenance/statusMaintenance";

const VerificationJumio = () => {
    const user = useContext(UserContext);
    const [verificationData, setVerificationData] = useState();
    const [startInterval, setStartInterval] = useState(false);
    const [verificationStatus, setVerificationStatus] = useState("");
    const [verificationErrorMsg, setVerificationErrorMsg] = useState("");

    const handleGenerateVerification = async () => {
        let response;
        response = await PostThis(
            `/api/verification/initiate?locale=${i18next.t("Lang")}`,
            "POST",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setVerificationData(response.data.verification);
                setVerificationStatus("new");
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    const handleCheckRecentVerification = async () => {
        setVerificationStatus("");
        let response;
        response = await PostThis("/api/verification/recent", "GET", "", {
            Authorization: "Bearer " + user.data.user?.authToken,
        });

        if (response) {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                // const STATUS_NEW        = 1;
                // const STATUS_SUCCESS    = 2;
                // const STATUS_ERROR      = 3;
                setVerificationData(response.data.verification);
                if (response.data.verification.status === 1) {
                    handleIframeEvents();
                } else if (response.data.verification.status === 3) {
                    setVerificationStatus("retry");
                } else if (
                    response.data.verification.status === 2 &&
                    user.data.user.isTier2Approved !== true
                ) {
                    // console.log("Weryfikacja zakończona");
                    setVerificationStatus("completed");
                }
            } else if (response.status === 400) {
                handleGenerateVerification();
            } else if (response.status === 403) {
                user.logout();
            } else {
                // Błąd API
                setVerificationStatus("error");
            }
        }
    };

    const handleUpdateVerificationStatus = async (value) => {
        // console.log(verificationData);
        let response;
        response = await PostThis(
            `/api/verification/${verificationData?.id}/status/${value}`,
            "PUT",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setVerificationData(response.data.verification);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    const handleIframeEvents = () => {
        window.addEventListener("message", (item) => {
            let data = item.data;
            if (data) {
                try {
                    data = JSON.parse(data);
                    // console.log(data);
                } catch {
                    return false;
                }
                if (data.payload.value === "success") {
                    handleUpdateVerificationStatus("2");
                } else if (data.payload.value === "error") {
                    switch (data.payload.metainfo.code) {
                        case 9100:
                            // • 9100 (Error occurred on our server.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9200:
                            // • 9200 (Authorization token missing, invalid, or expired.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9210:
                            // • 9210 (Session expired after the user journey started.)
                            setVerificationStatus("retry");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9300:
                            // • 9300 (Error occurred transmitting image to our server.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9400:
                            // • 9400 (Error occurred during verification step.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9800:
                            // • 9800 (User has no network connection.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9801:
                            // • 9801 (Unexpected error occurred in the client.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9810:
                            // • 9810 (Problem while communicating with our server.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9820:
                            // • 9820 (File upload not enabled and camera unavailable.)
                            setVerificationStatus("retry");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9821:
                            // • 9821 (The 3D liveness face capture process failed after 3 attempts.)
                            setVerificationStatus("retry");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        case 9822:
                            // • 9822 (Browser does not support camera.)
                            setVerificationStatus("error");
                            setVerificationErrorMsg(
                                i18next.t(data.payload.metainfo.msg)
                            );
                            break;
                        case 9835:
                            // • 9835 (No acceptable submission in 3 attempts.)
                            setVerificationStatus("retry");
                            setVerificationErrorMsg(data.payload.metainfo.msg);
                            break;
                        default:
                            setVerificationStatus("error");
                    }
                }
            }
        });
    };

    useEffect(() => {
        handleCheckRecentVerification();
        // handleIframeEvents();
    }, []);

    useEffect(() => {
        if (startInterval) {
            const interval = setInterval(() => {
                // console.log("chcecking for changes");
                handleCheckRecentVerification();
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [startInterval]);

    return (
        <>
            <div className="verificationJumio">
                {/* <StatusMaintenance /> */}

                {verificationStatus === "completed" ? <StatusCompleted /> : ""}
                {verificationStatus === "retry" ? (
                    <StatusRetry
                        msg={verificationErrorMsg}
                        handleGenerateVerification={handleGenerateVerification}
                    />
                ) : (
                    ""
                )}
                {verificationStatus === "error" ? (
                    <StatusError
                        msg={verificationErrorMsg}
                        handleGenerateVerification={handleGenerateVerification}
                    />
                ) : (
                    ""
                )}
                <iframe
                    title={"jumio"}
                    allow="camera;fullscreen"
                    allowFullScreen
                    className={"verificationIframe"}
                    src={verificationData?.redirectUrl}
                ></iframe>
            </div>
        </>
    );
};

export default VerificationJumio;
