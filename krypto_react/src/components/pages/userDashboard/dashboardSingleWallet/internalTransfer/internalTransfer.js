import React, { useContext, useState, useEffect, useRef } from "react";
import i18next from "i18next";

import "./internalTransfer.scss";

import PostThis from "../../../../../scripts/post";
import { UserContext } from "../../../../user/userContext";

import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../../ui/popup/popup";
import Button from "../../../../ui/button/button";
import Input from "../../../../ui/input/input";
import Infobox from "../../../../ui/infobox/infobox";
import Preloader from "../../../../ui/preloader/preloader";
import FlexTable from "../../../../ui/flexTable/flexTable";

import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../../scripts/dateTransformations";
import WithdrawalConfirmForm from "../withdrawalConfirmForm/withdrawalConfirmForm";

const InternalTransfer = (props) => {
    const user = useContext(UserContext);

    const [withdrawEmail, setWithdrawEmail] = useState();

    const [withdrawFormError, setWithdrawFormError] = useState(false);
    const [withdrawFormErrorMsg, setWithdrawFormErrorMsg] = useState("");
    const [withdrawFormStatus, setWithdrawFormStatus] = useState("warning");

    const [withdrawInternalAmount, setWithdrawInternalAmount] = useState();

    const [withdrawalPreloader, setWithdrawalPreloader] = useState(false);
    const [confirmationFormStatus, setConfirmationFormStatus] = useState("");
    const [confirmationApi, setConfirmationApi] = useState("");

    const [
        walletWithdrawInternalHistory,
        setWalletWithdrawInternalHistory,
    ] = useState([]);

    const popupRef = useRef(null);

    const handleWithdrawEmail = (inputId, value) => {
        setWithdrawEmail(value);
    };
    const handleMaxInternalAmount = () => {
        setWithdrawInternalAmount(props.walletFreeAmount);
    };
    const handleWithdrawInternalAmount = (inputId, value) => {
        setWithdrawInternalAmount(value.replace(",", "."));
    };

    const handleInternalTransferRequest = async (e) => {
        setWithdrawalPreloader(true);
        e.preventDefault();
        const response = await PostThis(
            `/api/wallets/${props.walletShortName}/internal-transfer-request`,
            "POST",
            { amount: withdrawInternalAmount, email: withdrawEmail },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            setWithdrawalPreloader(false);

            if (response.status >= 200 && response.status < 300) {
                handleShowPopup(popupRef);
                setConfirmationApi(
                    `/api/internal-transfers/${response.data.internalTransfer.id}/confirm-request`
                );
            } else if (response.status === 403) {
                user.logout();
            } else {
                setWithdrawFormError(true);
                setWithdrawFormErrorMsg(i18next.t(response.data.message));
            }
        }

        setTimeout(() => {
            setWithdrawFormError(false);
        }, 30000);
    };

    const handleGetWalletWithdrawInternalHistory = async (id) => {
        const response = await PostThis(
            `/api/wallets/${id}/internal-transfers`,
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
                    } else if (item.isRequest) {
                        statusName = "isRequest";
                        statusIcon = "history";
                    } else if (item.isReverted) {
                        statusName = "isReverted";
                        statusIcon = "reply_all";
                    } else if (item.isExternalApproval) {
                        statusName = "isExternalApproval";
                        statusIcon = "rotate_left";
                    } else if (item.isKantorWithdrawal) {
                        statusName = "isKantorWithdrawal";
                        statusIcon = "rotate_left";
                    } else if (item.isRejected) {
                        statusName = "isRejected";
                        statusIcon = "rotate_left";
                    } else if (item.isTransferred) {
                        statusName = "isTransferred";
                        statusIcon = "rotate_left";
                    } else if (item.isNew) {
                        statusName = "isNew";
                        statusIcon = "hourglass_full";
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

                setWalletWithdrawInternalHistory(dataForTable);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    useEffect(() => {
        setConfirmationFormStatus("");
        setWithdrawEmail("");
        setWithdrawInternalAmount("");
        handleGetWalletWithdrawInternalHistory(props.walletId);
    }, [confirmationFormStatus]);

    return (
        <>
            <div className="withdrawal internalTransfer">
                <div className="content preloaderWrapper">
                    <Preloader show={withdrawalPreloader} />

                    <Infobox icon={"info"} type={"info"}>
                        {i18next.t(
                            "Używając przelewu wewnętrznego, możesz łatwo i błyskawicznie przelać kryptowaluty na konto innego użytkownika Kryptowaluty.pl  Wystarczy, że podasz jego adres email poniżej."
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
                    <form onSubmit={(e) => handleInternalTransferRequest(e)}>
                        <Input
                            id={"withdrawEmail"}
                            value={withdrawEmail || ""}
                            label={i18next.t("Adres email użytkownika")}
                            required
                            onChange={handleWithdrawEmail}
                        ></Input>
                        <div className="withdrawInternalAmountBox">
                            <div className="max">
                                <Button
                                    type={"button"}
                                    onClick={() => handleMaxInternalAmount()}
                                >
                                    {i18next.t("MAX")}
                                </Button>
                            </div>

                            <Input
                                id={"withdrawInternalAmount"}
                                value={withdrawInternalAmount || ""}
                                label={i18next.t("Ilość")}
                                required
                                onChange={handleWithdrawInternalAmount}
                            ></Input>
                        </div>
                        <Button type={"submit"}>
                            {i18next.t("Przekaż środki")}
                        </Button>
                    </form>
                </div>

                <div className="content">
                    <h3 className="title">
                        {i18next.t("Transakcje wychodzące")}
                    </h3>

                    {walletWithdrawInternalHistory &&
                    walletWithdrawInternalHistory.length > 0 ? (
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
                            bodyItems={walletWithdrawInternalHistory}
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

export default InternalTransfer;
