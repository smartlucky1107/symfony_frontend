import React, { useContext } from "react";
import i18next from "i18next";

import { UserContext } from "../../../../user/userContext";
import { handleConvertDateFormat } from "../../../../../scripts/dateTransformations";

const UserData = () => {
    const user = useContext(UserContext);
    return (
        <div className="content">
            <h3 className="title">{i18next.t("Twoje dane")}</h3>
            <div className="flexTable">
                <div className="ftRow">
                    <div className="ftCol ftLeft">{i18next.t("Imię")}</div>
                    <div className="ftCol ftRight">
                        {user.data.user?.firstName}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">{i18next.t("Nazwisko")}</div>
                    <div className="ftCol ftRight">
                        {user.data.user?.lastName}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">
                        {i18next.t("Data urodzenia")}
                    </div>
                    <div className="ftCol ftRight">
                        {handleConvertDateFormat(user.data.user?.dateOfBirth)}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">{i18next.t("Adres")}</div>
                    <div className="ftCol ftRight">
                        {user.data.user.street ||
                        user.data.user.building ||
                        user.data.user.apartment ||
                        user.data.user.postalCode ||
                        user.data.user.city ? (
                            <>
                                {i18next.t("ul.")} {user.data.user?.street}{" "}
                                {user.data.user?.building}
                                {user.data.user.apartment
                                    ? `/${user.data.user.apartment}`
                                    : ""}
                                ,
                                <br />
                                {user.data.user?.postalCode}{" "}
                                {user.data.user?.city},
                                <br />
                            </>
                        ) : (
                            ""
                        )}
                        {user.data.user?.country.name}
                    </div>
                </div>
                <div className="ftRow">
                    <div className="ftCol ftLeft">{i18next.t("Telefon")}</div>
                    <div className="ftCol ftRight">{user.data.user?.phone}</div>
                </div>
            </div>
        </div>
    );
};

export default UserData;
