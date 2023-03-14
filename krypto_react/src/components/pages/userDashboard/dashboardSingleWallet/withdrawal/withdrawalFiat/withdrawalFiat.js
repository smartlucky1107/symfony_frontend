import React, { useContext, useState, useEffect, useRef } from "react";
import i18next from "i18next";
import "./withdrawalFiat.scss";
import { UserContext } from "../../../../../user/userContext";

import WithdrawalConfirmForm from "../../withdrawalConfirmForm/withdrawalConfirmForm";

import PostThis from "../../../../../../scripts/post";

import Button from "../../../../../ui/button/button";
import Select from "../../../../../ui/select/select";
import Input from "../../../../../ui/input/input";
import Infobox from "../../../../../ui/infobox/infobox";
import FlexTable from "../../../../../ui/flexTable/flexTable";

import Popup, {
    handleClosePopup,
    handleShowPopup,
} from "../../../../../ui/popup/popup";

import {
    handleConvertDateFormat,
    handleConvertTimeFormat,
} from "../../../../../../scripts/dateTransformations";

const WithdrawalFiat = (props) => {
    const user = useContext(UserContext);
    const [walletWithdrawHistory, setWalletWithdrawHistory] = useState();
    const [bankList, setBanklist] = useState();
    const [activeBank, setActiveBank] = useState([]);

    const [withdrawAmount, setWithdrawAmount] = useState([]);
    const handleWithdrawAmount = (inputId, value) => {
        setWithdrawAmount(value.replace(",", "."));
    };
    const [withdrawFeeAmount, setWithdrawFeeAmount] = useState();

    const [withdrawFormError, setWithdrawFormError] = useState(false);
    const [withdrawFormErrorMsg, setWithdrawFormErrorMsg] = useState("");
    const [withdrawFormStatus, setWithdrawFormStatus] = useState("warning");

    const [confirmationApi, setConfirmationApi] = useState("");
    const [confirmationFormStatus, setConfirmationFormStatus] = useState("");

    const popupRef = useRef(null);

    const getBanks = async (id) => {
        // https://api.market.tokeneo.com/index.php/pl/api/my-wallets/91890/banks

        if (id) {
            const response = await PostThis(
                `/api/my-wallets/${id}/banks`,
                "GET",
                "",
                {
                    Authorization: "Bearer " + user.data.user?.authToken,
                }
            );

            const maskString = (str) => {
                const pattern = "## #### #### #### #### #### ####";
                let i = 0;

                let strTrimed = str.replace(/ /g, "");
                if (strTrimed.length === 26) {
                    const padded = pattern.replace(/#/g, () => {
                        return strTrimed[i++];
                    });
                    return padded;
                } else {
                    return str;
                }
            };

            if (response) {
                if (response.status >= 200 && response.status < 300) {
                    if (response.data.banks.length > 0) {
                        let createBankList = response.data.banks;

                        createBankList = createBankList.map((item, index) => {
                            return {
                                name: `${maskString(item.iban)} (${
                                    item.swift
                                })`,
                                value: item.id,
                            };
                        });

                        setActiveBank(createBankList[0]);
                        setBanklist(createBankList);
                    }
                } else if (response.status === 403) {
                    user.logout();
                } else {
                }
            }
        }
    };

    const handleWithdrawalRequest = async (e) => {
        e.preventDefault();

        // /index.php/pl/api/wallets/PLN/withdrawal-request
        //POST
        // amount	"0.04"
        // walletBankId	"130"

        const response = await PostThis(
            `/api/wallets/${props.walletShortName}/withdrawal-request`,
            "POST",
            { amount: withdrawAmount, walletBankId: activeBank.value },
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                handleShowPopup(popupRef);
                setConfirmationApi(
                    `/api/withdrawals/${response.data?.withdrawal?.id}/confirm-request`
                );
            } else if (response.status === 403) {
                user.logout();
            } else {
                console.log(response);
                if (response?.data?.message) {
                    setWithdrawFormError(true);
                    setWithdrawFormErrorMsg(i18next.t(response.data.message));
                } else {
                    setWithdrawFormError(true);
                    setWithdrawFormErrorMsg(
                        i18next.t(
                            "Wystąpił błąd. Proszę spróbować później lub skontaktować się z supportem."
                        )
                    );
                }
            }
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
                setWithdrawFeeAmount(response.data.fee);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    const handleMaxExternalAmount = () => {
        const amountWithFee =
            parseFloat(props.walletFreeAmount.replace(/\s/g, "")) -
            parseFloat(withdrawFeeAmount);
        if (amountWithFee > 0) {
            setWithdrawAmount(amountWithFee);
        } else {
            setWithdrawFormError(true);
            setWithdrawFormErrorMsg(
                i18next.t("Niewystarczające środki do wypłaty")
            );
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

    useEffect(() => {
        getBanks(props.walletId);
        handleGetFee();
    }, [props.walletId]);

    useEffect(() => {
        setConfirmationFormStatus("");
        setWithdrawAmount("");
        handleGetWalletWithdrawHistory(props.walletId);
    }, [confirmationFormStatus]);

    // ?withdraw&outer=${id}
    // ?withdraw&inner=${id}

    return (
        <>
            <div className="withdrawalFiat">
                <div className="content">
                    {bankList ? (
                        <>
                            <Infobox icon={"info"} type={"info"}>
                                {i18next.t(
                                    "Aby wypłacić środki, musisz wybrać swój adres bankowy i kwotę waluty."
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
                            <form
                                onSubmit={(e) => {
                                    handleWithdrawalRequest(e);
                                }}
                            >
                                <div className="selectLabel">
                                    {i18next.t("Wybierz numer konta")}:
                                    <div className="isRequired">
                                        <span className="material-icons">
                                            error
                                        </span>
                                        <div className="isRequiredText">
                                            {i18next.t("wymagane")}
                                        </div>
                                    </div>
                                </div>
                                <Select
                                    options={bankList}
                                    activeElement={activeBank}
                                    onChangeActiveElement={(e) =>
                                        setActiveBank(e)
                                    }
                                />
                                <div className="withdrawExternalAmountBox">
                                    <Input
                                        id={"withdrawAmount"}
                                        value={withdrawAmount}
                                        label={i18next.t("Ilość")}
                                        required
                                        onChange={handleWithdrawAmount}
                                    />
                                    <div className="fee">
                                        {i18next.t("Opłata transferowa")}:{" "}
                                        {withdrawFeeAmount}{" "}
                                        {props.walletShortName}
                                    </div>
                                    <div className="max">
                                        <Button
                                            type={"button"}
                                            onClick={handleMaxExternalAmount}
                                        >
                                            {i18next.t("MAX")}
                                        </Button>
                                    </div>
                                </div>

                                <Button type={"submit"}>
                                    {i18next.t("Wypłać")}
                                </Button>
                            </form>
                        </>
                    ) : (
                        <p>
                            {i18next.t(
                                "Prześlij e-mail z potwierdzeniem numeru rachunku bankowego na nasz support"
                            )}
                            :{" "}
                            <a href="mailto:support@kryptowaluty.pl">
                                support@kryptowaluty.pl
                            </a>{" "}
                            {i18next.t(
                                ", aby wypłacić waluty fiducjarne ze swojego konta."
                            )}
                        </p>
                    )}
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

                <Popup
                    handleClosePopup={() => handleClosePopup(popupRef)}
                    ref={popupRef}
                >
                    <>
                        <WithdrawalConfirmForm
                            api={confirmationApi}
                            handleClosePopup={handleClosePopup}
                            setConfirmationFormStatus={
                                setConfirmationFormStatus
                            }
                            confirmationFormStatus={confirmationFormStatus}
                            popupRef={popupRef}
                        />
                    </>
                </Popup>
            </div>
        </>
    );
};

export default WithdrawalFiat;
