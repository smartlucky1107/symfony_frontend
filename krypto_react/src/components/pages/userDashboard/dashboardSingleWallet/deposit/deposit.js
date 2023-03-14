import React, { useContext, useState, useEffect } from "react";
import i18next from "i18next";
import PostThis from "../../../../../scripts/post";
import { UserContext } from "../../../../user/userContext";

import Infobox from "../../../../ui/infobox/infobox";
import FlexTable from "../../../../ui/flexTable/flexTable";

import DepositFiat from "./depositFiat/depositFiat";
import DepositCrypto from "./depositCrypto/depositCrypto";

import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../../scripts/dateTransformations";

const Deposit = (props) => {
    const user = useContext(UserContext);
    const [walletDepositsHistory, setWalletDepositsHistory] = useState([]);
    const handleGetWalletDepositsHistory = async (id) => {
        const response = await PostThis(
            `/api/wallets/${id}/deposits`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                let dataForTable = response.data.result;

                dataForTable = dataForTable.map((item, index) => {
                    let statusName;
                    let statusIcon;
                    let tooltipSide = "right";
                    if (item.isApproved) {
                        statusName = "isApproved";
                        statusIcon = "check_circle_outline";
                    } else if (item.isDeclined) {
                        statusName = "isDeclined";
                        statusIcon = "highlight_off";
                    } else if (item.isRequest) {
                        statusName = "isRequest";
                        statusIcon = "history";
                    } else if (item.isReverted) {
                        statusName = "isReverted";
                        statusIcon = "reply_all";
                    }

                    return [
                        {
                            name: "time",
                            value: handleConvertTimeFormat(item.approvedAt),
                        },
                        {
                            name: "date",
                            value: handleConvertDateFormat(item.approvedAt),
                        },
                        {
                            name: `amount ${statusName}`,
                            value: `+ ${item.amount}`,
                        },
                        {
                            name: "status",
                            value: [
                                {
                                    name: statusName,
                                    icon: statusIcon,
                                    tooltip: i18next.t(item.statusName),
                                    tooltipSide: tooltipSide,
                                },
                            ],
                        },
                    ];
                });
                setWalletDepositsHistory(dataForTable);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        handleGetWalletDepositsHistory(props.walletId);
    }, []);

    return (
        <>
            <div className="deposit">
                {props.walletType === "FIAT" ? (
                    <DepositFiat
                        walletShortName={props.walletShortName}
                        walletAmountDepositsLimit={
                            props.walletAmountDepositsLimit
                        }
                    />
                ) : (
                    ""
                )}

                {props.walletType === "CRYPTO" ? (
                    <DepositCrypto walletShortName={props.walletShortName} />
                ) : (
                    ""
                )}

                <div className="content">
                    <h3 className="title">
                        {i18next.t("Transakcje przychodzące")}
                    </h3>

                    {walletDepositsHistory &&
                    walletDepositsHistory.length > 0 ? (
                        <FlexTable
                            headItems={[
                                {
                                    name: "time",
                                    value: i18next.t("Czas"),
                                },
                                {
                                    name: "date",
                                    value: i18next.t("Data"),
                                },
                                {
                                    name: "amount",
                                    value: i18next.t("Wartość"),
                                },
                                {
                                    name: "status",
                                    value: "",
                                },
                            ]}
                            bodyItems={walletDepositsHistory}
                        ></FlexTable>
                    ) : (
                        <Infobox icon={"info"} type={"info"}>
                            {i18next.t("Brak wyników")}
                        </Infobox>
                    )}
                </div>
            </div>
        </>
    );
};

export default Deposit;
