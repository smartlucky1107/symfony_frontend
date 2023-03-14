import React, { useState, useRef, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";
import axios from "axios";
import getRoute from "./../../../../routing/routingService";

import "./walletsToggleList.scss";
import { UserContext } from "../../../../user/userContext";

import SingleWallet from "../../walletsList/singleWallet/singleWallet";

import PostThis from "../../../../../scripts/post";
import Tooltip from "../../../../ui/tooltip/tooltip";

import BoxPlaceholder from "../../../../ui/boxPlaceholder/boxPlaceholder";

const WalletsToggleList = () => {
    const user = useContext(UserContext);
    const [walletsAmount, setWalletsAmount] = useState("");
    const [walletsAmountFiat, setWalletsAmountFiat] = useState("PLN");
    const [walletsList, setWalletsList] = useState();
    const [walletsListError, setWalletsListError] = useState();
    const [walletsListErrorMsg, setWalletsListErrorMsg] = useState();
    const [listToggleStatus, setListToggleStatus] = useState(false);
    const [maxWalletListHeight, setMaxWalletListHeight] = useState(218);
    const [boxPlaceholder, setBoxPlaceholder] = useState(false);

    const listRef = useRef(null);
    const buttonRef = useRef(null);

    const handleBuildList = (list) => {
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <SingleWallet
                        name={item.currency.fullName}
                        shortName={item.currency.shortName}
                        freeAmount={item.freeAmount}
                        availableAmount={item.amountDepositsLeft}
                        key={index}
                        type={item.isFiat ? "FIAT" : "CRYPTO"}
                        showAddFunds={item.currency?.isDepositAllowed || false}
                        showWidthdrowFunds={true}
                        showBuy={item.isFiat !== true}
                        showWidthdrowFounds={true}
                        showOnlyIcons={true}
                    />
                );
            });
            if (dom) {
                setWalletsList(dom);
            }
        }
        setBoxPlaceholder(false);
    };

    // const getWalletsAmount = async (cancelToken) => {
    //     Suma wartości wszystkich walletów, do zrobienia bo nie ma endpointa
    //     const response = await PostThis(
    //         "/api/users/me/lukasz-rak-wallets-amount",
    //         "GET",
    //         "",
    //         {
    //             Authorization: `Bearer ${user.data.user?.authToken}`,
    //         },
    //         "",
    //         cancelToken
    //     );
    //     if (response) {
    //         if (response.status >= 200 && response.status < 300) {
    //             setWalletsAmount("");
    //         } else if (response.status === 403) {
    //             user.logout();
    //         } else {
    //         }
    //     }
    // };

    const getWalletsList = async (cancelToken) => {
        setBoxPlaceholder(true);
        const response = await PostThis(
            "/api/users/me/wallets?pageSize=0",
            "GET",
            "",
            {
                Authorization: `Bearer ${user.data.user?.authToken}`,
            },
            "",
            cancelToken
        );
        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setMaxWalletListHeight(response.data.result.length * 44);
                handleBuildList(response.data.result);
            } else if (response.status === 403) {
                user.logout();
            } else {
                setWalletsListError(true);
                setWalletsListErrorMsg(i18next.t(response.data.message));
            }
        }
    };

    // const handleToggleList = () => {
    //     // listRef.current.classList.toggle("showAll");
    //     setListToggleStatus(!listToggleStatus);

    // };

    useEffect(() => {
        const source = axios.CancelToken.source();
        getWalletsList(source.token);
        // getWalletsAmount(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    return (
        <>
            <div className="walletsToggleListContent">
                <div className="titleBox ">
                    <h3 className="title">{i18next.t("Twoje portfele")}</h3>
                    {walletsAmount ? (
                        <div className="walletsAmount tooltipWrapper">
                            = {walletsAmount}
                            <sup>{walletsAmountFiat}</sup>
                            <Tooltip
                                text={i18next.t(
                                    "Suma wartości wszystkich portfeli"
                                )}
                                side="bottom"
                            />
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="walletsBox">
                    <div className="walletsListHeader">
                        <div className="wrapper">
                            <div className="walletName">
                                {i18next.t("Nazwa waluty")}
                            </div>
                            <div className="walletName">
                                {i18next.t("volumen")}
                            </div>
                            <div className="walletAmount">
                                {i18next.t("Dostępne środki")}
                            </div>
                        </div>
                    </div>
                    <div
                        ref={listRef}
                        className="walletsList"
                        style={{
                            maxHeight: listToggleStatus
                                ? maxWalletListHeight
                                : "218px",
                        }}
                    >
                        <BoxPlaceholder
                            type={"walletPlaceholder"}
                            count={5}
                            show={boxPlaceholder}
                        />

                        {walletsList}
                    </div>

                    <button
                        className="btnShowMore"
                        onClick={() => setListToggleStatus(!listToggleStatus)}
                        ref={buttonRef}
                    >
                        {!listToggleStatus
                            ? i18next.t("Zobacz wszystkie")
                            : i18next.t("Zwiń")}

                        <span className="material-icons">
                            {!listToggleStatus
                                ? "keyboard_arrow_down"
                                : "keyboard_arrow_up"}
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default WalletsToggleList;
