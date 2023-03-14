import React, { useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { UserContext } from "../../../../user/userContext";
import { handleConvertDateFormat } from "../../../../../scripts/dateTransformations";
const AccountData = () => {
    const user = useContext(UserContext);
    const [idExpireSoon, setIdExpireSoon] = useState(false);

    useEffect(() => {
        let dateNow = new Date().getTime();
        let dateIdExpired = new Date(
            user.data.user?.identityExpirationDate
        ).getTime();
        dateIdExpired -= 5184000000; // Data wygaśniecia - 60 dni
        if (dateIdExpired < dateNow) {
            setIdExpireSoon(true);
        }
    });

    return (
        <div className="content">
            <h3 className="title">{i18next.t("Szczegóły konta")}</h3>
            <div className="flexTable">
                <div className="ftRow">
                    <div className="ftCol ftLeft">{i18next.t("E-mail")}</div>
                    <div className="ftCol ftRight">{user.data.user?.email}</div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">
                        {i18next.t("Rejestracja")}
                    </div>
                    <div className="ftCol ftRight">
                        {handleConvertDateFormat(user.data.user?.createdAt)}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">
                        {i18next.t("Weryfikacja")}
                    </div>
                    <div className="ftCol ftRight">
                        {user.data.user?.isTier2Approved
                            ? i18next.t("Zweryfikowany")
                            : i18next.t("Zweryfikuj konto")}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">
                        {i18next.t("Data ważności dokumentów")}
                    </div>
                    <div className="ftCol ftRight">
                        {idExpireSoon ? (
                            <>
                                <div className="errorBox">
                                    <span className="material-icons colorError">
                                        warning
                                    </span>{" "}
                                    {handleConvertDateFormat(
                                        user.data.user?.identityExpirationDate
                                    )}
                                </div>
                            </>
                        ) : (
                            handleConvertDateFormat(
                                user.data.user?.identityExpirationDate
                            )
                        )}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">
                        {i18next.t("Zgoda marketingowa")}
                    </div>
                    <div className="ftCol ftRight">
                        {user.data.user?.statementMarketingConfirmed
                            ? i18next.t("Tak")
                            : i18next.t("Nie")}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">
                        {i18next.t("Autoryzacja dwustopniowa (2FA)")}
                    </div>
                    <div className="ftCol ftRight">
                        {user.data.user?.isGAuthEnabled ? (
                            i18next.t("Aktywna")
                        ) : (
                            <div className="errorBox colorError">
                                <span className="material-icons ">warning</span>{" "}
                                {i18next.t("Wyłączona")}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountData;
