import React, { useContext, useState } from "react";
import "./../redeemTemplate.scss";
import "./secondSmsCode.scss";
// import SmsImg from "../../../../img/sms2.svg";
import i18next from "i18next";
import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";
import { RedeemContext } from "../redeemContext";
import PostThis from "../../../../scripts/post";

const SecondSmsCode = (props) => {
    const redeem = useContext(RedeemContext);
    const [transferSmsCode, setTransferSmsCode] = useState("");
    const [error, setError] = useState(null);
    const [isSmsCodeResent, setSmsCodeResent] = useState(null);

    const handleSmsCodeChange = (targetId, value) => {
        setError(null);
        setTransferSmsCode(value);
    };

    const checkSmsCode = async (e) => {
        e.preventDefault();
        redeem.update({
            isLoading: true,
        });
        if (transferSmsCode.length < 4) {
            setError(i18next.t("ERROR_SMS_CODE_TOO_SHORT"));
        } else {
            if (redeem.data.redeemType === 0) {
                //redeem inside
                const response = await redeemToInternal();
                if (response) {
                    redeem.update({
                        currentStep: redeem.data.currentStep + 1,
                    });
                }
            } else {
                //redeem outside
                //redeem outside
                const response = await redeemToExternal();

                if (response.status === 200) {
                    redeem.update({
                        currentStep: redeem.data.currentStep + 1,
                        POSOrder: response?.data?.POSOrder,
                    });
                } else {
                    setError(i18next.t("Wystąpił błąd odpowiedzi od serwera"));
                }
            }
        }
        redeem.update({
            isLoading: false,
        });
    };

    const resendSmsCode = async () => {
        redeem.update({
            isLoading: true,
        });
        const response = await PostThis(
            `/api-public/pos/redeem/transfer-code`,
            "PATCH",
            {
                signature: props.match.params.signature,
                redeemHash: props.match.params.redeemHash,
                code: redeem.data.smsCode,
            },
            ""
        );
        if (response?.status === 204) {
            setSmsCodeResent(true);
        }
        redeem.update({
            isLoading: false,
        });
    };

    const renderSmsCodeResendInfo = () => {
        switch (isSmsCodeResent) {
            case true:
                return (
                    <div className={"info"}>
                        {i18next.t("Kod SMS został wysłany ponownie.")}
                    </div>
                );
                break;

            case false:
                return (
                    <div className={"info error"}>
                        {i18next.t(
                            "Wystąpił błąd podczas wysyłania kodu. Spróbuj ponownie później, a jeśli problem nadal występuje - skontaktuj się z naszym wsparciem technicznym."
                        )}
                    </div>
                );
                break;

            case null:
                return null;
                break;
        }
    };

    const renderError = () => {
        if (error !== null) {
            return <div className={"info error"}>{error}</div>;
        }

        return null;
    };

    const redeemToExternal = async () => {
        console.log("redeemToExternal");
        const response = await PostThis(
            `/api-public/pos/redeem/transfer/external`,
            "POST",
            {
                signature: props.match.params.signature,
                redeemHash: props.match.params.redeemHash,
                transferSmsCode,
            },
            ""
        );
        console.log(response.status);
        if (response.status === 200) {
            return response;
        } else {
            return false;
        }
    };

    const redeemToInternal = async () => {
        console.log("redeemToInternal");
        const response = await PostThis(
            `/api-public/pos/redeem/transfer/internal`,
            "PATCH",
            {
                signature: props.match.params.signature,
                redeemHash: props.match.params.redeemHash,
                transferSmsCode,
            },
            ""
        );

        if (response.status === 200) {
            redeem.update({
                currentStep: redeem.data.currentStep + 1,
            });
        } else {
            return false;
        }
    };

    const handleGoToChooseRedeemType = () => {
        redeem.update({
            currentStep: 2,
        });
    };

    return (
        <div className={"container smsCodeWrapper"}>
            <div className={"narrowContainer"}>
                <div className={"imgContainer"}>
                    <img src={props.mainImg} />
                </div>
                <div className={"topSection"}>
                    <div className={"container"}>
                        <div className={"aditionalText"}>
                            {i18next.t(
                                "Na Twój numer telefonu został wysłany drugi kod potwierdzający, dzięki czemu mamy pewność, że Twoje kryptowaluty są bezpieczne."
                            )}
                        </div>
                    </div>
                </div>
                <div className={"smsCodeContainer"}>
                    <form
                        className={"inputContainer"}
                        onSubmit={(e) => checkSmsCode(e)}
                    >
                        <Input
                            id={"smsCode"}
                            value={transferSmsCode}
                            label={i18next.t("Kod z SMS")}
                            onChange={handleSmsCodeChange}
                            autocomplete={false}
                        />
                        {renderError()}
                        <Button
                            type={"submit"}
                            blue
                            rightIcon={"check"}
                            className={"redeemBtn"}
                        >
                            {i18next.t("Odbierz kryptowaluty")}
                        </Button>

                        <div className={"notReceivedSms"}>
                            <a onClick={resendSmsCode}>
                                {i18next.t("Nie otrzymałem kodu SMS")}
                            </a>
                            {renderSmsCodeResendInfo()}
                        </div>
                    </form>
                </div>
                <Button leftIcon={"undo"} onClick={handleGoToChooseRedeemType}>
                    {i18next.t("Powrót do sposobu odbioru")}
                </Button>
            </div>
        </div>
    );
};

export default SecondSmsCode;
