import React, { useState, useEffect, useContext, useRef } from "react";
import i18next from "i18next";
import { UserContext } from "../../../user/userContext";
import "../walletsAgreementNotification/walletsAgreementNotification.scss";

import PostThis from "../../../../scripts/post";

import agreementImg from "../../../../img/agreement.svg";

import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../ui/popup/popup";
import Button from "../../../ui/button/button";

import DefaultApiErrorModal from "../../../modals/defaultApiErrorModal/defaultApiErrorModal";

const WalletsAgreementNotification = () => {
    // const VIRTUAL_WALLET_NOT_DECIDED    = NULL;
    // const VIRTUAL_WALLET_INSTANT        = 1;
    // const VIRTUAL_WALLET_NOT_INSTANT    = 2;

    const user = useContext(UserContext);
    const [walletsAgreeValue, setWalletsAgreeValue] = useState();
    const [defaultApiError, setDefaultApiError] = useState(false);

    const popupRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        handleClosePopup(popupRef);

        let response;
        response = await PostThis(
            `/api/users/me/virtual-wallet/${walletsAgreeValue}`,
            "PATCH",
            {},
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                user.reload();
            } else if (response.status === 403) {
                user.logout();
            } else {
                setDefaultApiError(true);
            }
        }
    };

    useEffect(() => {
        handleShowPopup(popupRef);
    }, []);

    return (
        <>
            <Popup disableClose={true} ref={popupRef}>
                <form
                    className={"walletsAgreeForm"}
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="textCenter">
                        <img
                            className="agreementImg"
                            src={agreementImg}
                            alt=""
                        />
                    </div>
                    <h3>{i18next.t("Drogi użytkowniku!")}</h3>
                    <p>
                        {i18next.t(
                            "Zgodnie z prawem przysługuje Ci ustawowe prawo,"
                        )}{" "}
                        <strong>{i18next.t("odstąpienia od umowy")}</strong>{" "}
                        {i18next.t(
                            "której przedmiotem jest świadczenie usług portfela wirtualnego. Po upływie"
                        )}{" "}
                        <strong>{i18next.t("14-dniowego terminu")}</strong>{" "}
                        {i18next.t(
                            "odstąpienia od umowy rozpocznie się świadczenie usługi portfela wirtualnego. "
                        )}
                    </p>
                    <p>
                        {i18next.t("Również przysługuje Ci prawo żądania")}{" "}
                        <strong>
                            {i18next.t("wcześniejszego rozpoczęcia")}
                        </strong>{" "}
                        {i18next.t(
                            "świadczenia usługi portfela wirtualnego. Jeśli zdecydujesz się na ten krok,"
                        )}{" "}
                        <strong>
                            {i18next.t(
                                "utracisz prawo do odstąpienia od umowy."
                            )}
                        </strong>
                    </p>
                    <div className="kInput">
                        <input
                            type="radio"
                            id="before"
                            name="agree"
                            value="1"
                            required
                            onChange={(e) =>
                                setWalletsAgreeValue(e.target.value)
                            }
                        />
                        <label htmlFor="before">
                            {i18next.t(
                                "Rozpoczynam korzystanie z wirtualnego portfela"
                            )}{" "}
                            <strong>{i18next.t("natychmiast")}</strong>{" "}
                            {i18next.t("i rozumiem, że")}{" "}
                            <strong>
                                {i18next.t("nie będę mógł odstąpić od umowy")}
                            </strong>{" "}
                            {i18next.t(
                                "w zakresie usługi portfela wirtualnego."
                            )}
                        </label>
                    </div>

                    <div className="kInput">
                        <input
                            type="radio"
                            id="after"
                            name="agree"
                            value="2"
                            required
                            onChange={(e) =>
                                setWalletsAgreeValue(e.target.value)
                            }
                        />
                        <label htmlFor="after">
                            {i18next.t(
                                "Rozpocznę korzystanie z portfela wirtualnego po upływie"
                            )}{" "}
                            <strong>{i18next.t("14 dni.")}</strong>
                        </label>
                    </div>

                    <div className="textCenter">
                        <Button blue type="submit">
                            {i18next.t("Potwierdzam")}
                        </Button>
                    </div>
                </form>
            </Popup>
            {defaultApiError ? <DefaultApiErrorModal /> : ""}
        </>
    );
};

export default WalletsAgreementNotification;

// V1
// <form
// className={"walletsAgreeForm"}
// onSubmit={(e) => handleSubmit(e)}
// >
// <div className="textCenter">
//     <img
//         className="agreementImg"
//         src={agreementImg}
//         alt=""
//     />
// </div>
// <p>
//     {i18next.t(
//         "Zgodnie z art. 27 ust. 1 ustawy o prawach konsumenta (Dz. U. 2014, poz. 827) przysługuje Panu/Pani ustawowe prawo odstąpienia od umowy, której przedmiotem jest świadczenie usługi portfela wirtualnego. Świadczenie usługi portfela wirtualnego rozpocznie się po upływie czternastodniowego terminu do odstąpienia od umowy. Jednakże, zgodnie z art. 38 pkt 13 ww. ustawy przysługuje Panu/Pani prawo żądania wcześniejszego rozpoczęcia świadczenia usługi portfela wirtualnego, co jednak będzie wiązało się z utratą prawa do odstąpienia od tej umowy."
//     )}
// </p>

// <div className="kInput">
//     <input
//         type="radio"
//         id="after"
//         name="agree"
//         value="2"
//         required
//         onChange={(e) =>
//             setWalletsAgreeValue(e.target.value)
//         }
//     />
//     <label htmlFor="after">
//         {i18next.t(
//             "Chcę, aby rozpoczęcie świadczenia usług portfela wirtualnego nastąpiło po upływie terminu do odstąpienia od umowy w zakresie tej usługi."
//         )}
//     </label>
// </div>
// <div className="kInput">
//     <input
//         type="radio"
//         id="before"
//         name="agree"
//         value="1"
//         required
//         onChange={(e) =>
//             setWalletsAgreeValue(e.target.value)
//         }
//     />
//     <label htmlFor="before">
//         {i18next.t(
//             "Chcę, aby rozpoczęcie świadczenia usług portfela wirtualnego nastąpiło niezwłocznie i rozumiem, że skutkować to będzie utratą prawa do odstąpienia od umowy w zakresie usługi portfela wirtualnego."
//         )}
//     </label>
// </div>
// <div className="textCenter">
//     <Button blue type="submit">
//         {i18next.t("Potwierdzam")}
//     </Button>
// </div>
// </form>
