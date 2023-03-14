import React, {
    useContext,
    useEffect,
    useState,
    useRef,
    useLayoutEffect,
} from "react";

import { NavLink } from "react-router-dom";
import i18next from "i18next";
import axios from "axios";

import WalletsAgreementNotification from "../walletsAgreementNotification/walletsAgreementNotification";
import WalletsDeniedNotification from "../walletsDeniedNotification/walletsDeniedNotification";

import UserDashboard from "./../userDashboard";
import getRoute from "../../../routing/routingService";
import PostThis from "../../../../scripts/post";
import { convertAmountFormat } from "../../../../scripts/priceTransformations";
import { ChangeTabs, ShowTabs } from "../../../../scripts/changeTabs";
import { UserContext } from "../../../user/userContext";

import "./dashboardSingleWallet.scss";
import Button from "../../../ui/button/button";
import Tooltip from "../../../ui/tooltip/tooltip";

import BoxPlaceholder from "../../../ui/boxPlaceholder/boxPlaceholder";

import Withdrawal from "./withdrawal/withdrawal";
import Deposit from "./deposit/deposit";
import InternalTransfer from "./internalTransfer/internalTransfer";

const DashboardSingleWallet = (props) => {
    const user = useContext(UserContext);
    const [walletsList, setWalletsList] = useState([]);
    const [walletId, setWalletId] = useState();
    const [walletShortName, setWalletShortName] = useState();
    const [walletFullName, setWalletFullName] = useState();
    // const [walletAmount, setWalletAmount] = useState();
    const [walletAmountPending, setWalletAmountPending] = useState();
    const [walletFreeAmount, setWalletFreeAmount] = useState();
    const [walletAmountDeposits, setWalletAmountDeposits] = useState();
    const [
        walletAmountDepositsLimit,
        setWalletAmountDepositsLimit,
    ] = useState();

    const [walletAmountDepositsLeft, setWalletAmountDepositsLeft] = useState();

    const [
        boxPlaceholderWalletAmount,
        setBoxPlaceholderWalletAmount,
    ] = useState();
    const [walletType, setWalletType] = useState();

    const [boxPlaceholderWalletsList, setBoxPlaceholderWalletsList] = useState(
        false
    );
    const [boxPlaceholderTabs, setBoxPlaceholderTabs] = useState(true);

    const [depositAllowed, setDepositAllowed] = useState();

    const refCryptoShortList = useRef(null);
    const refTabs = useRef(null);
    const refTabsContent = useRef(null);

    const handleGetWalletData = async (short) => {
        setBoxPlaceholderWalletAmount(true);
        setBoxPlaceholderTabs(true);
        // setWalletAmount("");
        setWalletAmountPending("");
        setWalletFreeAmount("");

        const response = await PostThis(
            `/api/users/me/wallets/${short}`,
            "GET",
            "",
            {
                Authorization: "Bearer " + user.data.user?.authToken,
            }
        );

        if (response) {
            if (response.status >= 200 && response.status < 300) {
                setWalletShortName(response.data.wallet.currency.shortName);
                setWalletFullName(response.data.wallet.currency.fullName);

                setWalletId(response.data.wallet.id);

                // setWalletAmount(
                //     convertAmountFormat(response.data.wallet.amount)
                // );
                setWalletAmountPending(
                    convertAmountFormat(response.data.wallet.amountPending)
                );
                setWalletFreeAmount(
                    convertAmountFormat(response.data.wallet.freeAmount)
                );
                setDepositAllowed(
                    // true
                    response.data.wallet.currency.isDepositAllowed
                );

                setWalletAmountDeposits(response.data.wallet?.amountDeposits);

                setWalletAmountDepositsLimit(
                    response.data.wallet?.amountDepositsLimit
                );
                setWalletAmountDepositsLeft(
                    response.data.wallet?.amountDepositsLeft
                );
                if (response.data.wallet.isCrypto) {
                    setWalletType("CRYPTO");
                } else {
                    setWalletType("FIAT");
                }
            } else if (response.status === 403) {
                user.logout();
            } else {
                window.location.href =
                    getRoute("userDashboardWallets") + "/BTC";
            }

            setBoxPlaceholderWalletAmount(false);
            setBoxPlaceholderTabs(false);
        }
    };

    const getWalletsList = async (cancelToken) => {
        setBoxPlaceholderWalletsList(true);
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
                handleBuildList(response.data.result);
            } else if (response.status === 403) {
                user.logout();
            } else {
            }
        }
    };

    const handleSelectWallet = (shortName) => {
        setWalletShortName(shortName);
    };

    const handleBuildList = (list) => {
        if (list && list.length > 0) {
            const dom = list.map((item, index) => {
                return (
                    <NavLink
                        className="wallet "
                        activeClassName="active"
                        to={
                            getRoute("userDashboardWallets") +
                            "/" +
                            item.currency.shortName
                        }
                        onClick={() =>
                            handleSelectWallet(item.currency.shortName)
                        }
                        key={index}
                    >
                        <div
                            className={"wraper"}
                            data-short={item.currency.shortName}
                        >
                            <div className="walletName">
                                <img
                                    src={`${process.env.PUBLIC_URL}/assets/currencies/${item.currency.shortName}.svg`}
                                    alt={item.currency.shortName}
                                />
                                {item.currency.shortName}
                            </div>
                            {/* <div className="groupBadg">
          <div className="row">
          <div className="col active"> <img
                                    src={`${process.env.PUBLIC_URL}/assets/currencies/${item.currency.shortName}.svg`}
                                    alt={item.currency.shortName}
                                />
                                {item.currency.shortName}</div>

          </div>

      </div> */}
                        </div>
                    </NavLink>
                );
            });
            if (dom) {
                setWalletsList(dom);
            }
        }
        setBoxPlaceholderWalletsList(false);
    };

    useEffect(() => {
        const source = axios.CancelToken.source();
        getWalletsList(source.token);
        return () => {
            source.cancel();
        };
    }, []);

    useEffect(() => {
        const cryptoShort = document.location.pathname.split("/");
        handleGetWalletData(cryptoShort[cryptoShort.length - 1]);
    }, [walletShortName]);

    const renderDepositHeaderData = () => {
        if (walletType === "FIAT" && walletAmountDepositsLimit) {
            return (
                <div className="col">
                    <div className="walletData walletDataDeposit">
                        <div className="text">
                            <div className="tooltipWrapper">
                                {i18next.t("Saldo depozytowe")}
                                <Tooltip
                                    text={i18next.t(
                                        "Więcej na temat depozytów dowiesz się w zakładce Pomoc"
                                    )}
                                    side="bottom"
                                />
                            </div>
                        </div>
                        <div className="walletDepositSaldo">
                            <BoxPlaceholder
                                type={"line"}
                                count={2}
                                show={boxPlaceholderWalletAmount}
                            />
                            <div className="tooltipWrapper">
                                {walletAmountDeposits}
                                <Tooltip
                                    text={i18next.t(
                                        "Środki zgromadzone na saldzie depozytowym poprzez przelew tradycyjny"
                                    )}
                                    side="bottom"
                                />
                            </div>
                            {boxPlaceholderWalletAmount ? (
                                ""
                            ) : (
                                <>
                                    {" "}
                                    <div className="tooltipWrapper">
                                        <span>
                                            / {walletAmountDepositsLimit}
                                        </span>
                                        <Tooltip
                                            text={i18next.t(
                                                "Limit kwoty jaki możesz przesłać w ramach depozytu"
                                            )}
                                            side="bottom"
                                        />
                                    </div>
                                    <span>{walletShortName}</span>
                                </>
                            )}
                        </div>
                        {walletAmountDepositsLeft ? (
                            <div className="tooltipWrapper">
                                <div className="walletAmountLeft">
                                    <span className="material-icons">
                                        attach_money
                                    </span>

                                    {walletAmountDepositsLeft}
                                </div>
                                <Tooltip
                                    text={i18next.t(
                                        "Kwota jaką możesz wpłacić"
                                    )}
                                    side="bottom"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            );
        }
    };
    const renderCryptoHeaderButtons = () => {
        if (walletType === "CRYPTO") {
            return (
                <div className="col sellBuyBtns">
                    <Button
                        to={getRoute("transactionBuy") + "/" + walletShortName}
                        rightIcon={"add_shopping_cart"}
                    >
                        {i18next.t("Kup ")} {walletFullName}
                    </Button>
                    <Button
                        to={getRoute("transactionSell") + "/" + walletShortName}
                        rightIcon={"monetization_on"}
                    >
                        {i18next.t("Sprzedaj ")} {walletFullName}
                    </Button>
                </div>
            );
        }
    };

    const renderHeaderContent = () => {
        return (
            <div className="row">
                <div className="col">
                    <div className="walletData">
                        <div className="text">
                            {i18next.t("Dostępne saldo")}
                        </div>
                        <div className="walletFreeAmount">
                            <BoxPlaceholder
                                type={"line"}
                                count={2}
                                show={boxPlaceholderWalletAmount}
                            />
                            {walletFreeAmount}
                            {boxPlaceholderWalletAmount ? (
                                ""
                            ) : (
                                <span>{walletShortName}</span>
                            )}
                        </div>
                        <div className="walletAmountPending">
                            {boxPlaceholderWalletAmount ? (
                                ""
                            ) : (
                                <span className="material-icons">lock</span>
                            )}{" "}
                            <div class="tooltipWrapper">
                                {walletAmountPending}
                                <Tooltip
                                    text={i18next.t(
                                        "Środki zablokowane na poczet przeprowadzonych transakcji"
                                    )}
                                    side="bottom"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {renderDepositHeaderData()}
                {renderCryptoHeaderButtons()}
            </div>
        );
    };

    const renderTabHeaderDeposit = () => {
        if (depositAllowed) {
            return (
                <button
                    className="tab active"
                    data-tab="deposit"
                    onClick={(e) => ChangeTabs(e, refTabs, refTabsContent)}
                >
                    <div className="innerTab">
                        <div className="text">{i18next.t("Wpłać środki")}</div>
                        <div className="icon">
                            <span className="material-icons">redo</span>
                        </div>
                    </div>
                </button>
            );
        }
    };
    const renderTabHeaderWithdraw = () => {
        return (
            <button
                className={!depositAllowed ? "tab active" : "tab"}
                data-tab="withdraw"
                onClick={(e) => ChangeTabs(e, refTabs, refTabsContent)}
            >
                <div className="innerTab">
                    <div className="text">{i18next.t("Wypłać środki")}</div>
                    <div className="icon">
                        <span className="material-icons">reply_all</span>
                    </div>
                </div>
            </button>
        );
    };

    const renderTabHeaderInternalTransfer = () => {
        if (walletType === "CRYPTO") {
            return (
                <button
                    className="tab"
                    data-tab="internalTransfer"
                    onClick={(e) => ChangeTabs(e, refTabs, refTabsContent)}
                >
                    <div className="innerTab">
                        <div className="text">
                            {i18next.t("Przekaz wewnętrzny")}
                        </div>
                        <div className="icon">
                            <span className="material-icons">
                                compare_arrows
                            </span>
                        </div>
                    </div>
                </button>
            );
        }
    };

    const renderTabDepositContent = () => {
        if (depositAllowed) {
            return (
                <div className="tabContent active" data-tab="deposit">
                    <Deposit
                        walletId={walletId}
                        walletType={walletType}
                        walletShortName={walletShortName}
                        walletAmountDepositsLimit={walletAmountDepositsLimit}
                    />
                </div>
            );
        }
    };
    const renderTabWithdrawContent = () => {
        return (
            <div
                className={!depositAllowed ? "tabContent active" : "tabContent"}
                data-tab="withdraw"
            >
                <Withdrawal
                    walletId={walletId}
                    walletShortName={walletShortName}
                    walletType={walletType}
                    walletFreeAmount={walletFreeAmount}
                />
            </div>
        );
    };

    const renderTabInternalTransferContent = () => {
        if (walletType === "CRYPTO") {
            return (
                <div className="tabContent" data-tab="internalTransfer">
                    <InternalTransfer
                        walletId={walletId}
                        walletShortName={walletShortName}
                        walletType={walletType}
                        walletFreeAmount={walletFreeAmount}
                    />
                </div>
            );
        }
    };

    const renderTabsContent = () => {
        return (
            <div className="tabs">
                <BoxPlaceholder
                    type={"box"}
                    count={1}
                    show={boxPlaceholderTabs}
                />
                <button
                    className="show-tabs"
                    onClick={(e) => ShowTabs(refTabs)}
                >
                    <div className="innerTab">
                        <span className="material-icons">list</span>
                    </div>
                </button>
                <div className="tabsHeader" ref={refTabs}>
                    <div className="tabsHeaderHelper">
                        {renderTabHeaderDeposit()}
                        {renderTabHeaderWithdraw()}
                        {renderTabHeaderInternalTransfer()}
                    </div>
                </div>
                <div
                    className="tabsContent preloaderWrapper"
                    ref={refTabsContent}
                >
                    {renderTabDepositContent()}

                    {renderTabWithdrawContent()}

                    {renderTabInternalTransferContent()}
                </div>
            </div>
        );
    };

    //ustawienie aktywności taba z url
    useLayoutEffect(() => {
        let tabFromLink = document.location.search.split("?");
        if (tabFromLink.length > 1) {
            tabFromLink = tabFromLink[1].split("=");
            if (tabFromLink[0]) {
                ChangeTabs(tabFromLink[0], refTabs, refTabsContent);
            }
        }
    }, []);

    return (
        <UserDashboard>
            <section className="dashboardSingleWallet preloaderWrapper">
                {user.data.user.isVirtualWalletAllowed === true ? (
                    <>
                        <h1 className="stdDashboardHeader">
                            {i18next.t("Twój portfel")}{" "}
                            <img
                                src={`${process.env.PUBLIC_URL}/assets/currencies/${walletShortName}.svg`}
                                alt={walletShortName}
                            />{" "}
                            {walletFullName}
                        </h1>

                        {renderHeaderContent()}

                        <div className="spec">
                            <div
                                className="wallets-list-short"
                                ref={refCryptoShortList}
                            >
                                <BoxPlaceholder
                                    type={"walletPlaceholder"}
                                    count={8}
                                    show={boxPlaceholderWalletsList}
                                />
                                {walletsList}
                            </div>

                            <div className="row">{renderTabsContent()}</div>
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
                (user.data.user.virtualWalletStatus === null ||
                    user.data.user.virtualWalletStatus === 2) ? (
                    <WalletsDeniedNotification />
                ) : (
                    ""
                )}
            </section>
        </UserDashboard>
    );
};
export default DashboardSingleWallet;
