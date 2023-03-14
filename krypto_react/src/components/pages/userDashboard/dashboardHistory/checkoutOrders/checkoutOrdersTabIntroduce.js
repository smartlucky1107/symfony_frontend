import React, { useRef } from "react";
import i18next from "i18next";
import Button from "../../../../ui/button/button";

import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../../ui/popup/popup";

import GenerateHistoryFile from "../generateHistoryFile/generateHistoryFile";

// import paymentcardsContentImg from "../../../../../img/paymentcards-content-img.svg";
import paymentcardsContentImg from "../../../../../img/transactions.png";

// import mastercardLogo from "../../../../../img/paymentMethods/paymentCards/mastercard-logo.jpg";
// import visaLogo from "../../../../../img/paymentMethods/paymentCards/visa-logo.jpg";

// import dotpayLogo from "../../../../img/paymentMethods/paymentProcessors/dotpay-logo.jpg";
// import paypalLogo from "../../../../img/paymentMethods/paymentProcessors/paypal-logo.jpg";
// import payuLogo from "../../../../img/paymentMethods/paymentProcessors/payu-logo.jpg";
// import przelewy24Logo from "../../../../img/paymentMethods/paymentProcessors/przelewy24-logo.jpg";
// import simplexLogo from "../../../../img/paymentMethods/paymentProcessors/simplex-logo.jpg";
// import stripeLogo from "../../../../img/paymentMethods/paymentProcessors/stripe-logo.jpg";

// import Tooltip from "../../../ui/tooltip/tooltip";

const CheckoutOrdersTabIntroduce = () => {
    const popupRef = useRef(null);
    return (
        <>
            <div className="row rowBox tabIntroduce">
                <div className="col col-xl-6">
                    <h3>
                        {i18next.t(
                            "Transakcje opłacone innymi metodami płatności"
                        )}
                    </h3>
                    <p>
                        {i18next.t(
                            "W poniższym panelu możesz podejrzeć wszystkie transakcje przeprowadzone z wykorzystaniem kart płatniczych oraz innych metod płatności."
                        )}
                        {/* Wystarczy, że określisz zakres czasowy dokonanej płatności lub wybierzesz odpowiednią walutę. */}
                    </p>
                </div>
                <div className="col col-xl-6 contentImg text-center">
                    <img
                        className="paymentcardsContentImg"
                        src={paymentcardsContentImg}
                        alt=""
                    />
                    <div className="paymentProcessors">
                        {/* <img className="active" src={mastercardLogo} alt="" />
                        <img className="active" src={visaLogo} alt="" /> */}
                        {/* <div className="tooltipWrapper">
                        <img src={dotpayLogo} alt="" />
                        <Tooltip
                            text={i18next.t("Wkrótce dostępne")}
                            side="bottom"
                        />
                    </div>
                    <div className="tooltipWrapper">
                        <img src={paypalLogo} alt="" />
                        <Tooltip
                            text={i18next.t("Wkrótce dostępne")}
                            side="bottom"
                        />
                    </div>
                    <div className="tooltipWrapper">
                        <img src={payuLogo} alt="" />
                        <Tooltip
                            text={i18next.t("Wkrótce dostępne")}
                            side="bottom"
                        />
                    </div>
                    <div className="tooltipWrapper">
                        <img src={przelewy24Logo} alt="" />
                        <Tooltip
                            text={i18next.t("Wkrótce dostępne")}
                            side="bottom"
                        />
                    </div>
                    <div className="tooltipWrapper">
                        <img src={simplexLogo} alt="" />
                        <Tooltip
                            text={i18next.t("Wkrótce dostępne")}
                            side="bottom"
                        />
                    </div>
                    <div className="tooltipWrapper">
                        <img src={stripeLogo} alt="" />
                        <Tooltip
                            text={i18next.t("Wkrótce dostępne")}
                            side="bottom"
                        />
                    </div> */}
                    </div>
                </div>
                <div className="col col-xl-12">
                    <Button
                        rightIcon="file_download"
                        onClick={() => handleShowPopup(popupRef)}
                    >
                        {i18next.t("Pobierz historię")}
                    </Button>
                </div>
            </div>
            <Popup
                handleClosePopup={() => handleClosePopup(popupRef)}
                ref={popupRef}
            >
                <>
                    <GenerateHistoryFile
                        api={"/api/users/me/checkout-orders/history"}
                    />
                </>
            </Popup>
        </>
    );
};

export default CheckoutOrdersTabIntroduce;
