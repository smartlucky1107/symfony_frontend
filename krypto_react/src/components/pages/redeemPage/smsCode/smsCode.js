import React, { useContext, useState } from "react";
import "./../redeemTemplate.scss";
import "./smsCode.scss";
// import SmsImg from "../../../../img/sms.svg";
import i18next from "i18next";
import Input from "../../../ui/input/input";
import Button from "../../../ui/button/button";
import { RedeemContext } from "../redeemContext";
import PostThis from "../../../../scripts/post";
import { ModalControllerContext } from "../../../modals/modalControllerContext";

const SmsCode = (props) => {
    const redeem = useContext(RedeemContext);
    const [smsCode, setSmsCode] = useState("");
    const [error, setError] = useState(null);
    const [isSmsCodeResent, setSmsCodeResent] = useState(null);
    const modal = useContext(ModalControllerContext);

    const handleSmsCodeChange = (targetId, value) => {
        setError(null);
        setSmsCode(value);
    };

    const checkSmsCode = async (e) => {
        console.log("checkSmsCode");
        redeem.update({
            isLoading: true,
        });
        e.preventDefault();
        // modal.showDemoVersionModal();

        if (smsCode.length < 4) {
            setError(i18next.t("ERROR_SMS_CODE_TOO_SHORT"));
        } else {
            const response = await getRedeemInfos();

            if (response) {
                if (response.status === 100) {
                    redeem.update({
                        currentStep: redeem.data.currentStep + 1,
                        redeemInfo: response,
                        smsCode: smsCode,
                    });
                } else {
                    setError(i18next.t(response?.data?.message));
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
            `/api-public/pos/redeem/code`,
            "PATCH",
            {
                signature: props.match.params.signature,
                redeemHash: props.match.params.redeemHash,
            },
            ""
        );
        if (response?.status === 204) {
            setSmsCodeResent(true);
        } else {
            setSmsCodeResent(false);
        }
        redeem.update({
            isLoading: false,
        });
    };

    const getRedeemInfos = async () => {
        const response = await PostThis(
            `/api-public/pos/redeem`,
            "POST",
            {
                signature: props.match.params.signature,
                redeemHash: props.match.params.redeemHash,
                code: smsCode,
            },
            ""
        );
        if (response.status === 200) {
            return response?.data?.POSOrder;
        } else {
            return response;
        }
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

    return (
        <div className={"container smsCodeWrapper"}>
            <div className={"narrowContainer"}>
                <div className={"imgContainer"}>
                    <img src={props.mainImg} />
                </div>
                <div className={"topSection"}>
                    <div>
                        <div className={"aditionalText"}>
                            {i18next.t(
                                "Aby odebrać swoje kryptowaluty podaj kod SMS wysłany na Twój numer telefonu."
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
                            value={smsCode}
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
            </div>
        </div>
    );
};

export default SmsCode;
