import React, { useState } from "react";

export const redeemContext = {
    currentStep: 1,
    redeemType: null,
    smsCode: "",
    transferSmsCode: "",
    POSOrder: null,
    isLoading: false,
    redeemInfo: {
        id: "1",
        status: "1",
        amount: "0.001",
        totalPrice: "4500",
        amountCurrency: {
            shortName: "BTC",
            fullName: "Bitcoin",
        },
        priceCurrency: {
            shortName: "PLN",
            fullName: "Polski złoty",
        },
    },
};

export const RedeemContext = React.createContext({
    data: redeemContext,
    reset: () => {},
    update: () => {},
});

export const RedeemContextProvider = (props) => {
    const [data, setData] = useState(redeemContext);

    const updateContextData = (data) => {
        setData((prevState) => {
            return {
                ...prevState,
                ...data,
            };
        });
    };

    const resetContextData = () => {
        setData(redeemContext);
    };

    return (
        <RedeemContext.Provider
            value={{
                update: updateContextData,
                reset: resetContextData,
                data,
            }}
        >
            {props.children}
        </RedeemContext.Provider>
    );
};
