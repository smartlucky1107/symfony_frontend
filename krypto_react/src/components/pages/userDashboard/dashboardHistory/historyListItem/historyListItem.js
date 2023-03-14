import React, { useState } from "react";
import i18next from "i18next";

import TransactionStatusIcons from "../../../../ui/transactionStatusIcons/transactionStatusIcons";
import {
    handleConvertTimeFormat,
    handleConvertDateFormat,
    handleConvertDateFormatFilter,
} from "../../../../../scripts/dateTransformations";

const HistoryListItem = (props) => {
    const [isActive, setActive] = useState(false);

    return (
        <div
            className={`listItemRow ${isActive ? "show" : "hide"}
            `}
            key={props.index}
            onClick={() => setActive(!isActive)}
        >
            <div className="historyListCol time">
                {handleConvertTimeFormat(props.item?.createdAt)}
            </div>
            <div className="historyListCol date">
                {handleConvertDateFormat(props.item?.createdAt)}
            </div>
            {props.item?.typeName === "Buy" ? (
                <div className="historyListCol pair">
                    {props.item?.currencyPair?.pairShortName}
                    <span className={props.item?.typeName.toLowerCase()}>
                        {i18next.t("zakup")}
                    </span>
                </div>
            ) : (
                <div className="historyListCol pair">
                    {props.item?.currencyPair?.pairShortName}
                    <span className={props.item?.typeName.toLowerCase()}>
                        {i18next.t("Sprzedaż")}
                    </span>
                </div>
            )}
            <div className="historyListCol amount">
                {props.item?.amount}{" "}
                <span>
                    {props.item?.currencyPair?.baseCurrency.shortName}
                    {}
                </span>
            </div>
            <div className="historyListCol price">
                {props.item?.initiationPrice}{" "}
                <span>
                    {props.item?.currencyPair?.quotedCurrency.shortName}
                </span>
            </div>
            <div className="historyListCol priceAmount">
                {props.item?.totalPaymentValue}{" "}
                <span>
                    {props.item?.currencyPair?.quotedCurrency.shortName}
                </span>
            </div>
            <div className="historyListCol status">
                <TransactionStatusIcons
                    status={props.item?.status}
                    side={"right"}
                />
            </div>
            <div className="historyDetails">
                <div className="historyDetailsTitle">
                    {i18next.t("Transakcja id")}: {props.item.id}
                </div>
                <div className="row rowBox">
                    <div className="col col-6 col-xl-6 ">
                        <div className="detailsRow">
                            <div>{i18next.t("Rodzaj transakcji")}</div>
                            <div>
                                {props.item?.typeName === "Buy"
                                    ? i18next.t("Zakup")
                                    : i18next.t("Sprzedaż")}
                            </div>
                        </div>
                        <div className="detailsRow">
                            <div>{i18next.t("Para zakupu")}</div>
                            <div>{props.item?.currencyPair?.pairShortName}</div>
                        </div>

                        <div className="detailsRow">
                            <div>{i18next.t("Utworzono")}</div>
                            <div>
                                {handleConvertTimeFormat(props.item?.createdAt)}{" "}
                                {handleConvertDateFormat(props.item?.createdAt)}
                            </div>
                        </div>
                        <div className="detailsRow">
                            <div>{i18next.t("Status transakcji")}</div>
                            <div>{i18next.t(props.item?.statusName)}</div>
                        </div>
                    </div>
                    <div className="col col-6 col-xl-6 ">
                        <div className="detailsRow">
                            <div>
                                {i18next.t("Cena rozpoczęcia transakcji")}
                            </div>
                            <div>{props.item?.initiationPrice}</div>
                        </div>
                        <div className="detailsRow">
                            <div>{i18next.t("Ilość")}</div>
                            <div>{props.item?.amount}</div>
                        </div>
                        {/* <div className="detailsRow">
                            <div>{i18next.t("Kurs zlecenia")}</div>
                            <div></div>
                        </div> */}
                        <div className="detailsRow">
                            <div>{i18next.t("Całkowity koszt transakcji")}</div>
                            <div>{props.item?.totalPaymentValue}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HistoryListItem;
