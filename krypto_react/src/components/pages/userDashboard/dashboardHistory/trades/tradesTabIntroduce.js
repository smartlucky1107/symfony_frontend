import React, { useRef } from "react";
import i18next from "i18next";

// import walletContentImg from "../../../../../img/wallet-content-img.svg";
import walletContentImg from "../../../../../img/wallets.png";
import buyWalletImg from "../../../../../img/buyWallet.jpg";
import Button from "../../../../ui/button/button";
import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../../ui/popup/popup";

import GenerateHistoryFile from "../generateHistoryFile/generateHistoryFile";

const TradesTabIntroduce = () => {
    const popupRef = useRef(null);

    return (
        <>
            <div className="row rowBox tabIntroduce">
                <div className="col col-xl-6">
                    <h3>
                        {i18next.t(
                            "Transakcje opłacone ze środków wewnętrznych"
                        )}
                    </h3>
                    <p>
                        {i18next.t(
                            "W poniższym panelu  możesz podejrzeć wszystkie transakcje przeprowadzone z wykorzystaniem środków zgromadzonych na Twoim portfelu wewnętrznym."
                        )}
                    </p>
                </div>
                <div className="col col-xl-6 contentImg txt-center">
                    <img
                        className="walletContentImg"
                        src={walletContentImg}
                        alt=""
                    />

                    {/* <img
                        className="walletContentImg2"
                        src={buyWalletImg}
                        alt=""
                    /> */}
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
                    <GenerateHistoryFile api={"/api/users/me/trades/history"} />
                </>
            </Popup>
        </>
    );
};

export default TradesTabIntroduce;
