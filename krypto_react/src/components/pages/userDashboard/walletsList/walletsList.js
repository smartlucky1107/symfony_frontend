import React, { useState, useEffect, useContext } from "react";
import i18next from "i18next";
import "./walletsList.scss";

import { UserContext } from "../../../user/userContext";

import SingleWallet from "./singleWallet/singleWallet";
import BoxPlaceholder from "./../../../ui/boxPlaceholder/boxPlaceholder";
import Error from "./../../../ui/errorBox/error";

import WalletsAgreementNotification from "../walletsAgreementNotification/walletsAgreementNotification";
import WalletsDeniedNotification from "../walletsDeniedNotification/walletsDeniedNotification";

const WalletsList = (props) => {
    const user = useContext(UserContext);
    const [walletsList, setWalletsList] = useState();

    const handleBuildList = (list) => {
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <SingleWallet
                        name={item.currency.fullName}
                        shortName={item.currency.shortName}
                        amount={item.amount}
                        freeAmount={item.freeAmount}
                        key={index}
                        type={item.isFiat ? "FIAT" : "CRYPTO"}
                        handleWalletLimit={props.handleWalletLimit}
                        showWalletLimit={props.showWalletLimit}
                        showAddFunds={
                            item.currency?.isDepositAllowed ||
                            props?.showAddFunds ||
                            false
                        }
                        showWidthdrowFunds={props.showWidthdrowFunds}
                        showBuy={item.isFiat !== true && props.showBuy}
                    />
                );
            });

            if (dom) {
                setWalletsList(dom);
            }
        }

        props.setBoxPlaceholder(false);
    };

    useEffect(() => {
        handleBuildList(props.walletsList);
    }, [props.walletsList]);

    useEffect(() => {}, [user]);
    return (
        <div className="walletsBox">
            {user.data.user.isVirtualWalletAllowed === true ? (
                <>
                    <div className="walletsListHeader">
                        <div className="wrapper">
                            <div className="walletName">
                                {i18next.t("Nazwa waluty")}
                            </div>
                            <div className="walletAmount">
                                {i18next.t("Dostępne środki")}
                            </div>
                        </div>
                    </div>
                    <div ref={props.listRef} className="walletsList">
                        <BoxPlaceholder
                            type={"walletPlaceholder"}
                            count={8}
                            show={props.boxPlaceholder}
                        />
                        {walletsList}
                        {props.walletsListError ? (
                            <Error msg={props.walletsListErrorMsg}></Error>
                        ) : (
                            ""
                        )}
                    </div>
                </>
            ) : (
                ""
            )}

            {user.data.user.virtualWalletStatus === null ? (
                <WalletsAgreementNotification />
            ) : (
                ""
            )}

            {user.data.user.isVirtualWalletAllowed === false &&
            (user.data.user.virtualWalletStatus !== null ||
                user.data.user.virtualWalletStatus === 2) ? (
                <WalletsDeniedNotification />
            ) : (
                ""
            )}
        </div>
    );
};

export default WalletsList;
