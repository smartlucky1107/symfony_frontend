import React, { useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { UserContext } from "../../../../user/userContext";
import VerificationForm from "./verificationForm/verificationForm";
import VerificationJumio from "./verificationJumio/verificationJumio";
import VerificationSuccess from "../verificationSuccess/verificationSuccess";
import VerificationInProgress from "../verificationInProgress/verificationInProgress";

import ProgressBar from "../../../../ui/progressBar/progressBar";
import ProgressBarPoint from "../../../../ui/progressBar/progressBarPoint/progressBarPoint";

const VerificationPersonalUser = () => {
    const user = useContext(UserContext);

    const [progress, setPregress] = useState(0);
    const [progressBarColor, setPregressBarColor] = useState(0);
    const [progressPointColor, setPregressPointColor] = useState(0);

    const handleSetProgressBar = (barLength) => {
        setPregress(barLength);
    };

    useEffect(() => {
        if (user.data.user.isTier3Approved) {
            handleSetProgressBar(100);
            setTimeout(() => {
                setPregressBarColor("success");
                setPregressPointColor("success");
            }, 2000);
        } else if (user.data.user.isTier2Approved) {
            handleSetProgressBar(76);
        } else if (user.data.user.isTier1Approved) {
            handleSetProgressBar(51);
        } else {
            handleSetProgressBar(26);
        }
    }, [user.data]);

    return (
        <>
            <ProgressBar progressLenght={progress} barColor={progressBarColor}>
                <ProgressBarPoint
                    pointPositon={-1}
                    startPoint={true}
                    pointName={i18next.t("Start")}
                    pointColor={progressPointColor}
                ></ProgressBarPoint>
                <ProgressBarPoint
                    pointPositon={25}
                    pointName={i18next.t("Formularz weryfikacyjny")}
                    pointColor={progressPointColor}
                    pointDesc={i18next.t(
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    )}
                ></ProgressBarPoint>
                <ProgressBarPoint
                    pointPositon={50}
                    pointName={i18next.t("Weryfikacja tożsamości")}
                    pointColor={progressPointColor}
                    pointDesc={i18next.t(
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    )}
                ></ProgressBarPoint>
                <ProgressBarPoint
                    pointPositon={75}
                    pointName={i18next.t("Potwierdzenie tożsamości")}
                    pointColor={progressPointColor}
                    pointDesc={i18next.t(
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    )}
                ></ProgressBarPoint>
                <ProgressBarPoint
                    pointPositon={99}
                    pointName={i18next.t("Weryfikacja zakończona")}
                    endPoint={true}
                    pointColor={progressPointColor}
                    pointDesc={i18next.t(
                        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,"
                    )}
                ></ProgressBarPoint>
            </ProgressBar>

            {!user.data.user.isTier1Approved ? <VerificationForm /> : ""}
            {user.data.user.isTier1Approved &&
            !user.data.user.isTier2Approved ? (
                <VerificationJumio />
            ) : (
                ""
            )}
            {user.data.user.isTier1Approved &&
            user.data.user.isTier2Approved &&
            !user.data.user.isTier3Approved ? (
                <VerificationInProgress />
            ) : (
                ""
            )}

            {user.data.user.isTier1Approved &&
            user.data.user.isTier2Approved &&
            user.data.user.isTier3Approved ? (
                <VerificationSuccess />
            ) : (
                ""
            )}
        </>
    );
};

export default VerificationPersonalUser;
