import React from "react";
import "./mySmallWallet.scss";
import i18next from "i18next";
import WalletImg from "./../../../img/wallet.svg";
import SingleWallet from "../../pages/userDashboard/walletsList/singleWallet/singleWallet";

const MySmallWallet = (props) => {
    let freeAmount = parseFloat(props?.freeAmount).toFixed(2);
    let currencyShortName = props?.currencyShortName;
    let currencyFullName = props?.currencyFullName;
    return (
        <div className={"myWallet"}>
            <div className={"myWalletHeader"}>
                {i18next.t("Moje środki na kryptowaluty.pl")}
            </div>

            <div className={"myWalletContent"}>
                <SingleWallet
                    name={currencyFullName}
                    shortName={currencyShortName}
                    freeAmount={freeAmount}
                    type={"FIAT"}
                    showAddFunds={false}
                    showOnlyIcons={false}
                />
            </div>
        </div>
    );
};

export default MySmallWallet;
