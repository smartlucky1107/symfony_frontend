import React, { useContext } from "react";
import i18next from "i18next";
import Button from "./../../../ui/button/button";
import getRoute from "./../../../routing/routingService";
import "./referralSection.scss";

import referralImg from "./../../../../img/program_partnerski_b.svg";

import blob1 from "../../../../img/blob1.svg";
import blob2 from "../../../../img/blob2.svg";
import blob3 from "../../../../img/blob3.svg";
import blob3ghost from "../../../../img/blob3ghost.svg";
import { ModalControllerContext } from "../../../modals/modalControllerContext";

const ReferralSection = (props) => {
    const modalController = useContext(ModalControllerContext);

    return (
        <>
            <section className="referralHomeSection">
                <img className="blob blob1" src={blob1} alt="blob" />
                <img className="blob blob2" src={blob2} alt="blob" />
                <img className="blob blob3" src={blob3} alt="blob" />
                <img className="blob blob3ghost" src={blob3ghost} alt="blob" />
                <img className="blob blob4" src={blob1} alt="blob" />

                <div className="leftSide">
                    <img src={referralImg} alt="" />
                </div>
                <div className="rightSide">
                    <div className="content">
                        <header>
                            <h1 className="stdHeader">
                                {/* {i18next.t("Zarabiaj")}
                                <br />
                                {i18next.t("dzięki programowi partnerskiemu")} */}
                                {i18next.t("Polecaj i zarabiaj!")}
                            </h1>
                        </header>

                        <p>
                            {/* {i18next.t(
                                "Skorzystaj z programu partnerskiego i czerp zyski z uzyskanej prowizji! Nasza platforma wymiany kryptowalut oferuje prosty oraz transparentny system poleceń. Jako polecający otrzymujesz procentowy zysk z każdej transakcji dokonanej przez osobę poleconą."
                            )} */}
                            {i18next.t(
                                "Nasza platforma wymiany kryptowalut oferuje prosty oraz transparentny system poleceń. Jako polecający otrzymujesz procentowy zysk z każdej transakcji dokonanej przez osobę poleconą. Dołącz do programu poleceń już dzisiaj i czerp zyski z uzyskanej prowizji!"
                            )}
                        </p>
                        <Button
                            to={getRoute("userDashboardReferral")}
                            rightIcon={"arrow_forward"}
                            // onClick={() =>
                            //     modalController.showDemoVersionModal()
                            // }
                        >
                            {i18next.t("Zacznij zarabiać")}
                        </Button>
                    </div>
                </div>
            </section>
            <section className="container moreQuestions">
                <div className="col ">
                    <h3 className="mediumHeader blue">
                        {i18next.t("Jak kupić Bitcoina?")}
                    </h3>
                    <p>
                        {i18next.t(
                            "Dowiedz się jak w łatwy sposób kupować, sprzedawać i wymieniać Bitcoina, Ethereum i inne kryptowaluty."
                        )}
                        <br />
                        {i18next.t("Sprawdź jakie to proste!")}
                    </p>
                    <Button
                        to={getRoute("howToBuyBitcoin")}
                        rightIcon={"more_horiz"}
                        // onClick={() => modalController.showDemoVersionModal()}
                    >
                        {i18next.t("Czytaj więcej")}
                    </Button>
                </div>
                <div className="col ">
                    <h3 className="mediumHeader">
                        {i18next.t("Potrzebujesz pomocy?")}
                    </h3>
                    <p>
                        {i18next.t(
                            "Nie znalazłeś odpowiedzi na swoje pytanie?"
                        )}
                        <br />
                        {i18next.t("Skontaktuj się z naszym supportem!")}
                        <br />
                        {i18next.t(
                            "Z pewnością rozwiejemy wszystkie Twoje wątpliwości."
                        )}
                    </p>
                    <Button
                        to={getRoute("contact")}
                        rightIcon={"send"}
                        // onClick={() => modalController.showDemoVersionModal()}
                    >
                        {i18next.t("Wyślij zgłoszenie")}
                    </Button>
                </div>
            </section>
        </>
    );
};
export default ReferralSection;
