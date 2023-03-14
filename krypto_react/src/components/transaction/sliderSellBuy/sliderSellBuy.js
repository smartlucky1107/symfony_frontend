import React, {useContext, useState} from "react";

import "./sliderSellBuy.scss";
import i18next from "i18next";
import Button from "../../ui/button/button";
import getRoute from "../../routing/routingService";
import CircleLeft from "../../../img/circle-left.svg";
import { TransactionContext } from "../transactionContext";
import InitialBuyContainer from "./initialBuyContainer";
import SellBuySidebar from "./sidebar/sidebar";
import InitialSellContainer from "./initialSellContainer";
import blob1 from "../../../img/blob1.svg";
import blob2 from "../../../img/blob2.svg";
import blob3 from "../../../img/blob3.svg";
import blob3ghost from "../../../img/blob3ghost.svg";

export const SliderSellBuy = (props) => {
    const transaction = useContext(TransactionContext);
    const [activeTransactionType, setTransactionType] = useState(0);

    const changeTransactionType = (type) => {
        setTransactionType(type);
    };

    const currentActiveContainer =
        activeTransactionType === 0 ? (
            <InitialBuyContainer isHomepage={true} {...props} />
        ) : (
            <InitialSellContainer isHomepage={true} {...props} />
        );

    return (
        <div className={"sliderSellBuyWrapper"}>
            <div className={"blobContainer blob1"}>
                <img className="blob" src={blob1} alt="blob" />
                <img className="blobghost" src={blob1} alt="blobghost" />
            </div>

            <div className={"blobContainer blob2"}>
                <img className="blob" src={blob2} alt="blob" />
                <img className="blobghost" src={blob2} alt="blobghost" />
            </div>

            <div className={"blobContainer blob3"}>
                <img className="blob" src={blob3} alt="blob" />
                <img className="blobghost" src={blob3} alt="blobghost" />
            </div>

            <div className={"blobContainer blob4"}>
                <img className="blob" src={blob2} alt="blob" />
                <img className="blobghost" src={blob2} alt="blobghost" />
            </div>

            <div className={"blobContainer blob5"}>
                <img className="blob" src={blob1} alt="blob" />
                <img className="blobghost" src={blob1} alt="blobghost" />
            </div>

            <div className={"sliderSellBuy"}>
                <div className={"container"}>
                    <div className={"leftText"}>
                        <div className={"contentFlex"}>
                            <div className={"content"}>
                                <header>
                                    <h1 className="stdHeader">
                                        {i18next.t("Wymieniaj")}
                                        <br />
                                        {i18next.t(
                                            " kryptowaluty w mgnieniu oka!"
                                        )}
                                    </h1>
                                </header>
                                <p>
                                    {i18next.t(
                                        "Najkorzystniejszy kurs wymiany, dostępność najpopularniejszych kryptowalut oraz automatyczny proces transakcji to tylko trzy z licznych zalet kantoru kryptowaluty.pl. Wykorzystaj okazję i kup topowe krypto już teraz!"
                                    )}
                                </p>
                                <Button
                                    to={getRoute("register")}
                                    rightIcon={"arrow_forward"}
                                >
                                    {i18next.t("Załóż konto")}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={"buyContainer"}>
                        <img className={"circleLeft"} src={CircleLeft} />
                        <div className={"insideCircle"}>
                            <SellBuySidebar
                                changeTransactionType={changeTransactionType}
                                activeTransactionType={activeTransactionType}
                                transactionTypes={[
                                    i18next.t("Kup"),
                                    i18next.t("Sprzedaj"),
                                ]}
                            />
                            <div className={"insideCircleContent"}>
                                {currentActiveContainer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
