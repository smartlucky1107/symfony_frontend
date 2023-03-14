import React, { useContext } from "react";

import { Link } from "react-router-dom";
import i18next from "i18next";

import { UserContext } from "../../../../../user/userContext";

import Infobox from "../../../../../ui/infobox/infobox";

import getRoute from "../../../../../routing/routingService";

import BusinessBankAccountData from "./depositsData/businessBankAccountData";
import UserBankAccountData from "./depositsData/userBankAccountData";

const DepositFiat = (props) => {
    const user = useContext(UserContext);

    const renderBankAccountData = () => {
        if (user.data.user.type === 3) {
            return (
                <BusinessBankAccountData
                    walletShortName={props.walletShortName}
                />
            );
        } else {
            return (
                <UserBankAccountData walletShortName={props.walletShortName} />
            );
        }
    };

    return (
        <>
            <p>
                {i18next.t(
                    "Aktualizacja stanu konta zależy od prędkości procesorów płatności oraz sesji bankowych banku z którego zlecany jest transfer. Wychodząc na przeciw wymaganiom KNF w zakresie działalności MIP wprowadziliśmy limit"
                )}{" "}
                {props.walletAmountDepositsLimit}{" "}
                {i18next.t(
                    "wpłat depozytowych. Więcej na ten temat dowiesz się w zakładce"
                )}{" "}
                <Link to={getRoute("help")}>{i18next.t("Pomoc")}</Link>
            </p>

            <p>
                {i18next.t(
                    "Aby zdeponować środki, musisz użyć danych podanych poniżej. "
                )}
            </p>

            <div className="depositInfo">
                <Infobox animation={"wobble"} icon={"info"} type={"info"}>
                    {i18next.t(
                        "Zawsze pamiętaj by wysyłać waluty FIAT używając dokładnie tej samej waluty co portfel docelowy, który chcesz uzupełnić. Waluty nie zgadzające się z walutą portfela docelowego będą automatycznie wymieniane przez bank odbiorcy lub nadawcy! Giełda Tokeneo nie ponosi odpowiedzialności za opłaty wymiany lub prowizje pobrane w wyniku wysłania niepoprawnej waluty na podany adres."
                    )}
                </Infobox>
            </div>

            {renderBankAccountData()}

            <div className="aditionalInfos">
                {i18next.t(
                    "Szacowany czas przetwarzania: międzynarodowe transfery SWIFT dla wszystkich walut FIAT 3-5 dni roboczych, transfery SEPA w EUR 1-3 dni roboczych, lokalne transfery w PLN 1-2 dni roboczych."
                )}
            </div>
        </>
    );
};

export default DepositFiat;
