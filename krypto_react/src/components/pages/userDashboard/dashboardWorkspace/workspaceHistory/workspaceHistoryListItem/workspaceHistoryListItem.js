import React, { useState } from "react";
import i18next from "i18next";

import {
    handleConvertTimeFormat,
    handleConvertDateFormat,
} from "../../../../../../scripts/dateTransformations";

import TransactionStatusIcons from "../../../../../ui/transactionStatusIcons/transactionStatusIcons";

const WorkspaceHistoryListItem = (props) => {
    const [isActive, setActive] = useState(false);

    return (
        <div
            className="listItemRow"
            key={props.index}
            className={`listItemRow ${isActive ? "show" : "hide"}
    `}
            onClick={() => setActive(!isActive)}
        >
            <div className="historyListCol time">
                {/* <span className="material-icons">
                query_builder
            </span> */}
                {handleConvertTimeFormat(props?.item?.createdAt)}
            </div>
            <div className="historyListCol date">
                {handleConvertDateFormat(props?.item?.createdAt)}
            </div>

            <div className="historyListCol pair">
                {props?.item?.currencyPair?.pairShortName}
                <span className={"sell"}>{i18next.t("Sprzedaż")}</span>
            </div>

            <div className="historyListCol amount">
                {props?.item?.amount}{" "}
                <span>{props?.currencyPair?.item?.baseCurrency.shortName}</span>
            </div>
            <div className="historyListCol price">
                {props?.item?.totalPrice}{" "}
                <span>
                    {props?.item?.currencyPair?.quotedCurrency.shortName}
                </span>
            </div>
            <div className="historyListCol phone">
                {props?.item?.price} <span>{props?.item?.phone}</span>
            </div>
            <div className="historyListCol status">
                <TransactionStatusIcons
                    status={props.item?.status}
                    side={"right"}
                    type={"pos"}
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
                            <div>{i18next.t("Para")}</div>
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
                            <div>
                                {props.item?.initiationPrice}{" "}
                                {
                                    props?.item?.currencyPair?.quotedCurrency
                                        .shortName
                                }
                            </div>
                        </div>
                        <div className="detailsRow">
                            <div>{i18next.t("Ilość")}</div>
                            <div>
                                {props.item?.amount}{" "}
                                {
                                    props.item?.currencyPair?.baseCurrency
                                        .shortName
                                }
                            </div>
                        </div>
                        {/* <div className="detailsRow">
                            <div>{i18next.t("Kurs zlecenia")}</div>
                            <div></div>
                        </div> */}
                        <div className="detailsRow">
                            <div>{i18next.t("Całkowita kwota transakcji")}</div>
                            <div>
                                {props.item?.totalPrice}{" "}
                                {
                                    props?.item?.currencyPair?.quotedCurrency
                                        .shortName
                                }
                            </div>
                        </div>
                        <div className="detailsRow">
                            <div>{i18next.t("Pracownik")}</div>
                            <div>
                                {props.item?.employee.firstName}{" "}
                                {props.item?.employee.lastName}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceHistoryListItem;
