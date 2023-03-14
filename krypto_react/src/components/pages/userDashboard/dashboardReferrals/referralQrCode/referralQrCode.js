import React from "react";
import "./referralQrCode.scss";
import QRCode from "qrcode.react";
import i18next from "i18next";

export const ReferralQrCode = ({ url }) => {
    return (
        <div className={"referralQrCode"}>
            <div className={"qrCodeTexts"}>
                <label>{i18next.t("twoje kod qr polecajacy")}</label>
                <div className={"qrCodeText"}>
                    {i18next.t(
                        "Kod QR Twojego linku polecającego. Wydrukuj go lub wyślij znajomym, by zdobyć jeszcze więcej poleconych."
                    )}
                </div>
                <div className={"qrCodeAditionalInfos"}>
                    {i18next.t(
                        "Kod QR możesz skopiować lub zapisać, klikając na niego prawym przyciskiem myszy."
                    )}
                </div>
            </div>
            <QRCode value={url} size={80} />
        </div>
    );
};
