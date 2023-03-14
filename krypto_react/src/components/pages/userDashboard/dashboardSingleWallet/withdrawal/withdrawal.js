import React from "react";

import WithdrawalCrypto from "./withdrawalCrypto/withdrawalCrypto";
import WithdrawalFiat from "./withdrawalFiat/withdrawalFiat";

const Withdrawal = (props) => {
    return (
        <>
            <div className="withdrawal">
                {props.walletType === "FIAT" ? (
                    <WithdrawalFiat
                        walletId={props.walletId}
                        walletShortName={props.walletShortName}
                        walletType={props.walletType}
                        // walletWithdrawHistory={walletWithdrawHistory}
                        walletWithdrawInternalHistory={
                            props.walletWithdrawInternalHistory
                        }
                        walletFreeAmount={props.walletFreeAmount}
                    />
                ) : (
                    ""
                )}

                {props.walletType === "CRYPTO" ? (
                    <WithdrawalCrypto
                        walletId={props.walletId}
                        walletShortName={props.walletShortName}
                        walletType={props.walletType}
                        // walletWithdrawHistory={walletWithdrawHistory}
                        walletWithdrawInternalHistory={
                            props.walletWithdrawInternalHistory
                        }
                        walletFreeAmount={props.walletFreeAmount}
                    />
                ) : (
                    ""
                )}
            </div>
        </>
    );
};

export default Withdrawal;
