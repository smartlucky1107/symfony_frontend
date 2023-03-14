import React, { useContext, useEffect, useState } from "react";
import "./../redeemTemplate.scss";
import "./chooseRedeemType.scss";
// import RedeemImg from "../../../../img/redeem.svg";
import i18next from "i18next";
import { RedeemContext } from "../redeemContext";
import PostThis from "../../../../scripts/post";

const ChooseRedeemType = (props) => {
    const redeem = useContext(RedeemContext);
    const [redeemInfo, setRedeemInfo] = useState({
        id: "1",
        status: "1",
        amount: "0.001",
        totalPrice: "4500",
        amountCurrency: {
            shortName: "BTC",
            fullName: "Bitcoin",
        },
        priceCurrency: {
            shortName: "PLN",
            fullName: "Polski złoty",
        },
    });

    const nextStep = (val) => {
        redeem.update({
            currentStep: 3,
            redeemType: val,
        });
    };

    console.log(redeem.data.redeemInfo.workspace);

    return (
        <div className={"container smsCodeWrapper"}>
            <div className={"narrowContainer"}>
                <div className={"imgContainer"}>
                    <img src={props.mainImg} />
                </div>
                <div className={"redeemInfo"}>
                    <div className={"infoRow"}>
                        <div className={"leftCol"}>
                            {i18next.t("Kryptowaluta")}
                        </div>
                        <div className={"rightCol important"}>
                            {redeem.data.redeemInfo.amountCurrency.fullName}
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <div className={"leftCol"}>{i18next.t("Ilość")}</div>
                        <div className={"rightCol important"}>
                            {redeem.data.redeemInfo.amount}
                            <small>
                                {
                                    redeem.data.redeemInfo.amountCurrency
                                        .shortName
                                }
                            </small>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <div className={"leftCol"}>
                            {i18next.t("Zapłacono")}
                        </div>
                        <div className={"rightCol important"}>
                            {redeem.data.redeemInfo.totalPrice}
                            <small>
                                {redeem.data.redeemInfo.priceCurrency.shortName}
                            </small>
                        </div>
                    </div>
                    <div className={"infoRow"}>
                        <div className={"leftCol"}>
                            {i18next.t("Sprzedawca")}
                        </div>
                        <div className={"rightCol important flex"}>
                            <div className={"text trunc"}>
                                {
                                    redeem.data?.redeemInfo?.workspace
                                        ?.companyName
                                }
                            </div>
                            <div className={"moreInfos"}>
                                <span className="material-icons">info</span>
                                <div className={"details"}>
                                    <strong>
                                        {
                                            redeem.data?.redeemInfo?.workspace
                                                ?.companyName
                                        }
                                    </strong>
                                    <br />
                                    {
                                        redeem.data?.redeemInfo?.workspace
                                            ?.companyStreet
                                    }
                                    <br />
                                    {
                                        redeem.data?.redeemInfo?.workspace
                                            ?.companyCity
                                    }{" "}
                                    {
                                        redeem.data?.redeemInfo?.workspace
                                            ?.companyPostcode
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={"topSection"}>
                    <div>
                        <div className={"aditionalText"}>
                            {i18next.t(
                                "Wybierz sposób odbioru swoich kryptowalut."
                            )}
                        </div>
                    </div>
                </div>
                <div className={"redeemTypeContainer"}>
                    <button
                        className={"chooseRedeemBtn"}
                        onClick={() => nextStep(0)}
                    >
                        <div className={"iconBox"}>
                            <span className="material-icons">security</span>
                        </div>
                        <div className={"textBox"}>
                            <div className={"importantText"}>
                                {i18next.t(
                                    "Odbierz na portfel kryptowaluty.pl"
                                )}
                            </div>
                            <div className={"smallText"}>
                                {i18next.t(
                                    "Bezpieczny i szybki portfel kryptowalutowy"
                                )}
                            </div>
                        </div>
                    </button>
                    <button
                        className={"chooseRedeemBtn"}
                        onClick={() => nextStep(1)}
                    >
                        <div className={"iconBox"}>
                            <span className="material-icons">vpn_key</span>
                        </div>
                        <div className={"textBox"}>
                            <div className={"importantText"}>
                                {i18next.t("Odbierz na zewnętrzny portfel")}
                            </div>
                            <div className={"smallText"}>
                                {i18next.t(
                                    "Kryptowaluty dostępne w postaci klucza publicznego i prywatnego"
                                )}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChooseRedeemType;
