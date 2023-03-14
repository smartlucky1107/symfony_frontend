import React, { useContext, useEffect } from "react";
import "./../redeemTemplate.scss";
import "./redeemOutside.scss";
import Key from "./../../../../img/key.svg";
import i18next from "i18next";
import Textarea from "../../../ui/textarea/textarea";
import Input from "../../../ui/input/input";
import PostThis from "../../../../scripts/post";
import { RedeemContext } from "../redeemContext";

const RedeemOutside = (props) => {
    const redeemObject = null;
    const redeem = useContext(RedeemContext);

    useEffect(() => {}, []);

    return (
        <div className={"redeemOutside"}>
            <div className={"redeemOutsideContent"}>
                <div className={"imgContent"}>
                    <img src={Key} />
                </div>
                <div className={"info"}>
                    {i18next.t(
                        "Poniższe dane są poufne i bardzo ważne, dlatego nie udostępniaj ich niepowołanym osobom, oraz zachowaj je w bezpiecznym miejscu."
                    )}
                </div>
                <div className={"redeemContent"}>
                    <Input
                        label={i18next.t("Klucz publiczny")}
                        id={"publicKey"}
                        value={redeem?.data?.POSOrder?.publicKey}
                        copyOnClick
                        hidden={i18next.t("Kliknij by skopiować klucz")}
                    />
                    <Input
                        label={i18next.t("Klucz prywatny")}
                        id={"privateKey"}
                        value={redeem?.data?.POSOrder?.privateKey}
                        resize={false}
                        copyOnClick
                        hidden={i18next.t("Kliknij by skopiować klucz")}
                    />
                </div>
            </div>
        </div>
    );
};

export default RedeemOutside;
