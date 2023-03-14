import React, { useState, useEffect } from "react";
import i18next from "i18next";

import Input from "../../ui/input/input";

import "./newsletterModal.scss";
import img from "./img.svg";

import { setCookie, getCookie } from "../../../scripts/cookies";
import PostThis from "../../../scripts/post";

const NewsletterModal = React.forwardRef((props, ref) => {
    // HOW TO USE
    // Zaimportować
    //     NewsletterModal, {
    //     handleCloseNewsletterModal,
    //     handleShowNewsletterModal,
    // }
    // Stworzyć ref:
    // const newsletterModalRef = useRef(null);
    //
    // Implementacja
    // <NewsletterModal
    //             handleCloseNewsletterModal={handleCloseNewsletterModal}
    //             ref={newsletterModalRef}
    //         />

    const [email, setEmail] = useState();
    const [agreement, setAgreement] = useState();
    const [newsletterModalStatus, setNewsletterModalStatus] = useState(true);

    const handleEmailChange = (inputId, value) => {
        setEmail(value);
    };
    const handleAgreementChange = (inputId, value) => {
        setAgreement(value);
    };

    const handleSaveToNewsletter = async (e) => {
        e.preventDefault();

        let response;
        response = await PostThis("/newsletter", "POST", {
            email: email,
        });
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setCookie("newsletterModal", true, 30);
            } else {
            }
        }
    };

    useEffect(() => {
        if (getCookie("newsletterModal") === "true") {
            setNewsletterModalStatus(false);
        }
    }, []);

    return (
        <>
            {newsletterModalStatus ? (
                <div className="newsletterModalWrapper" ref={ref}>
                    <div className="newsletterModalBody">
                        <div
                            className="closeNewsletterModalBtn"
                            onClick={() => {
                                props.handleCloseNewsletterModal(ref);
                            }}
                        >
                            <span className="material-icons">add</span>
                        </div>
                        <div className="textContent">
                            <div className="textContentHelper">
                                <h3 className="newsletterModalSmallHeader">
                                    {i18next.t(
                                        "Zapisz się na newsletter i odbierz darmowy poradnik"
                                    )}
                                </h3>
                                <h3 className="newsletterModalBigHeader">
                                    {i18next.t("Kryptowaluty - jak zacząć")}
                                </h3>
                                <p>{i18next.t("a w nim")}:</p>
                                <ul>
                                    <li>
                                        {i18next.t("Czym są kryptowaluty?")}
                                    </li>
                                    <li>
                                        {i18next.t(
                                            "Gdzie kupować kryptowaluty?"
                                        )}
                                    </li>
                                    <li>
                                        {i18next.t(
                                            "Na co zwrócić wagę przy wyborze giełdy?"
                                        )}
                                    </li>
                                    <li>
                                        {i18next.t(
                                            "W jakie kryptowaluty inwestować?"
                                        )}
                                    </li>
                                    <li>
                                        {i18next.t(
                                            "Gdzie trzymać kryptowaluty?"
                                        )}
                                    </li>
                                </ul>
                                <form
                                    id="newsletterModalForm"
                                    onSubmit={(e) => {
                                        handleSaveToNewsletter(e);
                                    }}
                                >
                                    <Input
                                        id={"email"}
                                        value={email || ""}
                                        type={"email"}
                                        required
                                        onChange={handleEmailChange}
                                        placeholder={i18next.t(
                                            "Twój adres e-mail"
                                        )}
                                    />
                                    <Input
                                        id={"agreement"}
                                        value={agreement || ""}
                                        type={"checkbox"}
                                        required
                                        onChange={handleAgreementChange}
                                        label={i18next.t(
                                            "Zgadzam się na przetwarzanie moich danych osobowych przez TOKENEO TEO OÜ w celu realizacji usługi newsletter, a tym samym wysyłania mi informacji o usługach, promocjach lub nowościach zgodnie z polityką prywatności. Wiem, że zgodę tę mogę w każdej chwili cofnąć."
                                        )}
                                    />
                                    <button
                                        className="newsletterModalSubmitBtn"
                                        type="submit"
                                    >
                                        {i18next.t("Zapisz mnie!")}
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="imgContent">
                            <img
                                src={img}
                                alt={i18next.t("Zapisz się do newslettera")}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </>
    );
});

export default NewsletterModal;

export const handleCloseNewsletterModal = (ref) => {
    if (ref.current) {
        ref.current.classList.remove("show");
        setCookie("newsletterModal", true, 30);
    }
};
export const handleShowNewsletterModal = (ref) => {
    if (ref.current) {
        ref.current.classList.add("show");
    }
};
