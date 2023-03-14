import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import i18next from "i18next";
import { UserContext } from "../../../user/userContext";
import UserDashboard from "./../userDashboard";

import ReferralSection from "./referralSection/referralSection";
import ReferralEarnings from "./referralEarnings/referralEarnings";
import ConfirmedReferralList from "./confirmedReferralList/confirmedReferralList";

import InputCopyFrom from "../../../ui/inputCopyFrom/inputCopyFrom";
import Button from "../../../ui/button/button";
import BoxPlaceholder from "../../../ui/boxPlaceholder/boxPlaceholder";
import PostThis from "../../../../scripts/post";

// import ImgS1 from "../../../../img/ref1.svg";
import ImgS1 from "../../../../img/referal.png";
import ImgS2 from "../../../../img/transaction.png";
import ImgS3 from "../../../../img/laptop.png";

import {ReferralQrCode} from "./referralQrCode/referralQrCode";
import {ReferralCodeOnly} from "./referralCodeOnly/referralCodeOnly";
import "./dashboardReferrals.scss";

const DashboardReferrals = () => {
    const user = useContext(UserContext);
    const [referralLink, setReferralLink] = useState();
    const [showReferralLinkGenerator, setShowReferralLinkGenerator] = useState(
        false
    );
    const [
        boxPlaceholderReferralLink,
        setBoxPlaceholderReferralLink,
    ] = useState(false);

    const handleReferralLink = async (cancelToken) => {
        setBoxPlaceholderReferralLink(true);
        const response = await PostThis(
            "/api/users/me/referral-link",
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user.authToken,
            },
            "",
            cancelToken
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setReferralLink(
                    `${window.location.origin}/ref/${response.data.referralLink.link}`
                );
                setShowReferralLinkGenerator(false);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setShowReferralLinkGenerator(true);
            }

            setBoxPlaceholderReferralLink(false);
        }
    };

    const handleGenerateReferralLink = async (cancelToken) => {
        const response = await PostThis(
            "/api/users/me/referral-link",
            "POST",
            "",
            {
                Authorization: "Bearer " + user.data.user.authToken,
            },
            "",
            cancelToken
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setShowReferralLinkGenerator(false);
                return setReferralLink(
                    `${window.location.origin}/ref/${response.data.referralLink.link}`
                );
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        handleReferralLink(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <UserDashboard>
            <section className="dashboardReferrals">
                <h1 className="stdDashboardHeader mb15">
                    {i18next.t("Program poleceń")}
                </h1>
                <div className="bg-w ptl0">
                    <div className="dashboardIntroduce">
                        <p>
                            {i18next.t(
                                "Weź udział w programie poleceń i zarabiaj! To bardzo proste – pozyskane osoby rejestrują się z Twojego unikalnego linku. Wystarczy jedynie, że Twoi poleceni kupią, wymienią lub sprzedadzą kryptowaluty na naszej platformie."
                            )}
                        </p>
                    </div>

                    <div>
                    <h3 className="title">
                            {i18next.t("Podziel się swoim linkiem")}
                        </h3>
                        <p>
                            {i18next.t(
                                "Udostępnij unikalny link znajomym w social media lub umieść go na swojej stronie internetowej. Później przekonaj ludzi, aby zarejestrowali się i zweryfikowali na platformie kryptowaluty.pl."
                            )}
                        </p>
                    </div>

                    <ReferralSection contentSide="right" img={ImgS1}>
                        {/* <h3 className="title">
                            {i18next.t("Podziel się swoim linkiem")}
                        </h3>
                        <p>
                            {i18next.t(
                                "Udostępnij unikalny link znajomym w social media lub umieść go na swojej stronie internetowej. Później przekonaj ludzi, aby zarejestrowali się i zweryfikowali na platformie kryptowaluty.pl."
                            )}
                        </p> */}
                        <BoxPlaceholder
                            type={"walletPlaceholder"}
                            count={1}
                            show={boxPlaceholderReferralLink}
                        />
                        <div className="reflink">
                        <label>{i18next.t("twoj link polecajacy")}:</label>
                        {referralLink ? (
                            <InputCopyFrom
                                value={referralLink}
                                rightIcon={"add_to_photos"}
                            />
                        ) : (
                            ""
                        )}
                        </div>

                        {showReferralLinkGenerator ? (
                            <Button
                                rightIcon={"create"}
                                onClick={() => handleGenerateReferralLink()}
                            >
                                {i18next.t("Wygeneruj link")}
                            </Button>
                        ) : (
                            ""
                        )}

                        {referralLink ?
                            <ReferralCodeOnly referralLink={referralLink}/>
                            : null}

                        {referralLink ?
                            <ReferralQrCode url={referralLink}/>
                            :
                            null
                        }
                    </ReferralSection>
                    {/* <ReferralSection className="pad" img={ImgS2}>
                        <h3 className="title">
                            {i18next.t("Twoi poleceni dokonują transakcji")}
                        </h3>
                        <p>
                            {i18next.t(
                                "Osoby polecone przechodzą proces rejestracji i weryfikacji. Następnie przeprowadzają transakcje, a Ty otrzymujesz 25% z prowizji, którą pobieramy. System rejestruje KAŻDY rodzaj transakcji."
                            )}
                        </p>
                    </ReferralSection>
                    <ReferralSection contentSide="left" img={ImgS3}>
                        <h3 className="title">
                            {i18next.t(
                                "Zarabiasz 25% z prowizji każdej transakcji"
                            )}
                        </h3>
                        <p>
                            {i18next.t(
                                "Gotowe! Otrzymujesz 25% z prowizji od każdej transakcji dokonanej przez Twoją osobę poleconą. Im więcej aktywnych poleconych, tym więcej zarabiasz!"
                            )}
                        </p>
                    </ReferralSection> */}
                    <div className="row rowBox">
                        <div className="col col-xl-6">
                            <ReferralEarnings />
                        </div>
                        <div className="col col-xl-6">
                            <ConfirmedReferralList />
                        </div>
                    </div>
                </div>
            </section>
        </UserDashboard>
    );
};
export default DashboardReferrals;
