import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import i18next from "i18next";
import getRoute from "./../../../../routing/routingService";
import "./singleWallet.scss";

// import { ModalControllerContext } from "../../../../modals/modalControllerContext";
import Input from "../../../../ui/input/input";
import Tooltip from "../../../../ui/tooltip/tooltip";

const SingleWallet = (props) => {
    // const modalController = useContext(ModalControllerContext);
    const [limit, setLimit] = useState("");

    const handleWalletLimitForm = (e) => {
        e.preventDefault();
        // modalController.showDemoVersionModal();
    };

    const handleLimitChange = (inputId, value) => {
        setLimit(value);
    };

    const renderShowBuyButton = () => {
        if (props.showBuy) {
            return (
                <div className={`tooltipWrapper btnBox showBuy`}>
                    <Link
                        to={getRoute("transactionBuy") + "/" + props?.shortName}
                    >{i18next.t("Kup")}
                        {/* {!props.showOnlyIcons ? i18next.t("Kup") : ""} */}
                        <span className="material-icons">
                            add_shopping_cart
                        </span>
                        {props.showOnlyIcons ? (
                            <Tooltip text={i18next.t("Kup")} side={"right"} />
                        ) : null}
                    </Link>
                </div>
            );
        }
    };
    return (
        <div
            className="wallet"
            data-search={`${props.name},${props.shortName}`}
            data-filter={props.type}
        >
            <Link
                className={
                    !props.showAddFunds && !props.showWidthdrowFunds
                        ? "wraper addDisabled"
                        : "wraper"
                }
                to={getRoute("userDashboardWallets") + "/" + props.shortName}
            >
                <div className="walletName">
                    <img
                        src={`${process.env.PUBLIC_URL}/assets/currencies/${props.shortName}.svg`}
                        alt={props.shortName}
                    />
                    {props.name}
                </div>
                <div className="">
                    {props.availableAmount} 
                </div>
                <div className="walletAmount">
                    {props.freeAmount} <span>{props.shortName}</span>
                </div>
            </Link>
            <div className="">
                {props.showWalletLimit ? (
                    <>
                        <div className="btnBox">
                            {i18next.t("Limit")}: {props.limit}
                        </div>
                        <div className="btnBox walletWalletLimit">
                            <form
                                onSubmit={(e) => {
                                    handleWalletLimitForm(e);
                                }}
                            >
                                <Input
                                    id={`limit${props.shortName}`}
                                    value={limit}
                                    type={"text"}
                                    onChange={handleLimitChange}
                                    placeholder={i18next.t("Ustaw limit")}
                                ></Input>
                                <button>{i18next.t("Ustaw")}</button>
                            </form>
                        </div>
                    </>
                ) : (
                    ""
                )}

                {props.showWidthdrowFunds ? (
                    <div
                        className={
                            props?.showAddFunds
                                ? `tooltipWrapper btnBox walletWithdrawFunds`
                                : `tooltipWrapper btnBox walletWithdrawFunds alone`
                        }
                    >
                        <Link
                            to={
                                getRoute("userDashboardWallets") +
                                "/" +
                                props?.shortName +
                                "?withdraw"
                            }
                        >{i18next.t("Wypłać środki")}
                            {/* {!props.showOnlyIcons
                                ? i18next.t("Wypłać środki")
                                : ""} */}
                            <span className="material-icons flip">reply_all</span>
                        </Link>
                        {props.showOnlyIcons ? (
                            <Tooltip
                                text={i18next.t("Wypłać środki")}
                                side={"right"}
                            />
                        ) : null}
                    </div>
                ) : (
                    ""
                )}

                {props.showAddFunds ? (
                    <div
                        className={
                            props?.showAddFunds
                                ? `tooltipWrapper btnBox walletAddFunds`
                                : `tooltipWrapper btnBox walletAddFunds alone`
                        }
                    >
                        <Link
                            to={
                                getRoute("userDashboardWallets") +
                                "/" +
                                props?.shortName +
                                "?deposit"
                            }
                        >{i18next.t("Dodaj środki")}
                            {/* {!props.showOnlyIcons
                                ? i18next.t("Dodaj środki")
                                : ""} */}
                            <span className="material-icons">add</span>
                            {props.showOnlyIcons ? (
                                <Tooltip
                                    text={i18next.t("Dodaj środki")}
                                    side={"right"}
                                />
                            ) : null}
                        </Link>
                    </div>
                ) : (
                    ""
                )}
                {renderShowBuyButton()}
            </div>
        </div>
    );
};

export default SingleWallet;
