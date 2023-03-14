import React, { useContext, useState, useEffect, useRef } from "react";
import i18next from "i18next";
import "./withdrawalCrypto.scss";

import { UserContext } from "../../../../../user/userContext";

import PostThis from "../../../../../../scripts/post";

import Button from "../../../../../ui/button/button";

import Input from "../../../../../ui/input/input";

import Infobox from "../../../../../ui/infobox/infobox";
import Preloader from "../../../../../ui/preloader/preloader";
import FlexTable from "../../../../../ui/flexTable/flexTable";
import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../../../ui/popup/popup";

import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../../../scripts/dateTransformations";

import WithdrawalConfirmForm from "../../withdrawalConfirmForm/withdrawalConfirmForm";

const WithdrawalCrypto = (props) => {
    const user = useContext(UserContext);
    const [walletWithdrawHistory, setWalletWithdrawHistory] = useState();

    const [withdrawWalletAddress, setWithdrawWalletAddress] = useState();
    const [withdrawExternalAmount, setWithdrawExternalAmount] = useState();
    const [
        withdrawExternalFeeAmount,
        setWithdrawExternalFeeAmount,
    ] = useState();

    const [withdrawalPreloader, setWithdrawalPreloader] = useState(false);

    const [withdrawFormError, setWithdrawFormError] = useState(false);
    const [withdrawFormErrorMsg, setWithdrawFormErrorMsg] = useState("");
    const [withdrawFormStatus, setWithdrawFormStatus] = useState("warning");

    const [confirmationApi, setConfirmationApi] = useState("");

    const [confirmationFormStatus, setConfirmationFormStatus] = useState("");

    const popupRef = useRef(null);

    const handleWithdrawWalletAddress = (inputId, value) => {
        setWithdrawWalletAddress(value);
    };
    const handleWithdrawExternalAmount = (inputId, value) => {
        setWithdrawExternalAmount(value.replace(",", "."));
    };

    const handleWithdrawalRequest = async (e) => {
        setWithdrawalPreloader(true);
        e.preventDefault();
        const response = await PostThis(
            `/api/wallets/${props.walletShortName}/withdrawal-request`,
            "POST",
            { amount: withdrawExternalAmount, address: withdrawWalletAddress },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            setWithdrawalPreloader(false);

            if (response.status >= 200 && response.status < 300) {
                handleShowPopup(popupRef);
                setConfirmationApi(
                    `/api/withdrawals/${response.data?.withdrawal?.id}/confirm-request`
                );
            } else if (response.status === 403) {
                user.logout();
            } else {
                setWithdrawFormError(true);
                setWithdrawFormErrorMsg(i18next.t(response.data.message));
            }
        }
    };

    const handleMaxExternalAmount = () => {
        const amountWithFee =
            props.walletFreeAmount - withdrawExternalFeeAmount;
        if (amountWithFee > 0) {
            setWithdrawExternalAmount(amountWithFee);
        } else {
            setWithdrawFormError(true);
            setWithdrawFormErrorMsg(
                i18next.t("Niewystarczające środki do wypłaty")
            );
        }
    };

    const handleGetFee = async () => {
        const response = await PostThis(
            `/api/wallets/${props.walletShortName}/withdrawal-fee?amount=0`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setWithdrawExternalFeeAmount(response.data.fee);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    const handleGetWalletWithdrawHistory = async (id) => {
        const response = await PostThis(
            `/api/wallets/${id}/withdrawals`,
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
                    let date = item.approvedAt ?? item.createdAt;

                    if (item.isApproved) {
                        statusName = "isApproved";
                        statusIcon = "check_circle_outline";
                    } else if (item.isDeclined) {
                        statusName = "isDeclined";
                        statusIcon = "highlight_off";
                    } else if (item.isExternalApproval) {
                        statusName = "isExternalApproval";
                        statusIcon = "rotate_left";
                    } else if (item.isNew) {
                        statusName = "isNew";
                        statusIcon = "new_releases";
                    } else if (item.isRequest) {
                        statusName = "isRequest";
                        statusIcon = "history";
                    } else if (item.isRejected) {
                        statusName = "isRejected";
                        statusIcon = "rotate_left";
                    }

                    return [
                        {
                            name: "time",
                            value: handleConvertTimeFormat(date),
                        },
                        {
                            name: "date",
                            value: handleConvertDateFormat(date),
                        },
                        {
                            name: `amount ${statusName}`,
                            value: `- ${item.amount}`,
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
                setWalletWithdrawHistory(dataForTable);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    // ?withdraw&outer=${id}
    // ?withdraw&inner=${id}

    // useEffect(() => {
    //     setWithdrawEmail("");
    //     setWithdrawWalletAddress("");

    //     setWithdrawExternalAmount("");
    //     handleGetFee();

    //     // console.log(props.walletId);
    // }, [props.walletId]);

    useEffect(() => {
        setConfirmationFormStatus("");
        setWithdrawWalletAddress("");
        setWithdrawExternalAmount("");
        handleGetFee();
        handleGetWalletWithdrawHistory(props.walletId);
    }, [confirmationFormStatus]);

    return (
        <>
            <div className="withdrawalCrypto">
                <div className="content preloaderWrapper">
                    <Preloader show={withdrawalPreloader} />

                    <Infobox icon={"info"} type={"info"}>
                        {i18next.t(
                            "Aby wypłacić środki, musisz podać swój adres portfela krypto i kwotę waluty."
                        )}
                    </Infobox>
                    {withdrawFormError ? (
                        <Infobox
                            animation={"wobble"}
                            icon={"info"}
                            type={withdrawFormStatus}
                        >
                            {i18next.t(withdrawFormErrorMsg)}
                        </Infobox>
                    ) : (
                        ""
                    )}
                    <form onSubmit={(e) => handleWithdrawalRequest(e)}>
                        <Input
                            id={"withdrawWalletAddress"}
                            value={withdrawWalletAddress || ""}
                            label={i18next.t("Adres portfela")}
                            required
                            onChange={handleWithdrawWalletAddress}
                        ></Input>
                        <div className="withdrawExternalAmountBox">
                            <Input
                                id={"withdrawExternalAmount"}
                                value={withdrawExternalAmount || ""}
                                label={i18next.t("Ilość")}
                                required
                                onChange={handleWithdrawExternalAmount}
                            ></Input>
                            <div className="fee">
                                {i18next.t("Opłata transferowa")}:{" "}
                                {withdrawExternalFeeAmount}{" "}
                                {props.walletShortName}
                            </div>
                            <div className="max">
                                <Button
                                    type={"button"}
                                    onClick={() => handleMaxExternalAmount()}
                                >
                                    {i18next.t("MAX")}
                                </Button>
                            </div>
                        </div>
                        <Button type={"submit"}>
                            {i18next.t("Wypłać środki")}
                        </Button>
                    </form>
                </div>

                <div className="row">
                    {/* <div className="withdrawTotal">
                        {i18next.t("Razem")}:{withdrawAmount}
                    </div> */}
                </div>

                <div className="content">
                    <h3 className="title">
                        {i18next.t("Transakcje wychodzące")}
                    </h3>

                    {walletWithdrawHistory &&
                    walletWithdrawHistory.length > 0 ? (
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
                            bodyItems={walletWithdrawHistory}
                        ></FlexTable>
                    ) : (
                        <Infobox icon={"info"} type={"info"}>
                            {i18next.t("Brak wyników")}
                        </Infobox>
                    )}
                </div>
            </div>
            <Popup
                handleClosePopup={() => handleClosePopup(popupRef)}
                ref={popupRef}
            >
                <>
                    <WithdrawalConfirmForm
                        api={confirmationApi}
                        handleClosePopup={handleClosePopup}
                        setConfirmationFormStatus={setConfirmationFormStatus}
                        confirmationFormStatus={confirmationFormStatus}
                        popupRef={popupRef}
                    />
                </>
            </Popup>
        </>
    );
};

export default WithdrawalCrypto;
