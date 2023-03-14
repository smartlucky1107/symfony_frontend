import React, { useEffect, useState } from "react";
import PostThis from "../scripts/post";

export const appContext = {
    isMobile: window.innerWidth < 576,
    test: true,
    smsCode: null,
    demo: true,
    despositSufix: "KRPL",
    depositAccountData: ["PARTNERIA Sp. z o.o.", "Lekarska 1", "Kraków"],
    bankBic: "INGBPLPWXXX",
    bankAccountNumber: "AA AAAA AAAA BBBB BBBB BBBB BBBB",
    depositBusinessSufix: "KRPL",
    depositBusinessAccountData: [
        "PARTNERIA Sp. z o.o.",
        "Lekarska 1",
        "Kraków",
    ],
    depositBusinessBankBic: "INGBPLPWXXX",
    depositBusinessBankAccountNumber: "KK AAAA AAAA BBBB BBBB BBBB BBBB",
    tradingDisabled: false,
};

export const AppContext = React.createContext({
    data: appContext,
    update: () => {},
});

export const AppContextProvider = (props) => {
    const [data, setData] = useState(appContext);

    const getAppConfig = async () => {
        try {
            const response = await PostThis("/config", "GET", "", "");
            if (response.status >= 200 && response.status < 300) {
                if (response?.data?.includes(1)) {
                    updateContextData({
                        tradingDisabled: true,
                    });
                }
            } else {
                updateContextData({
                    tradingDisabled: true,
                });
            }
        } catch (error) {
            console.error(error);
            updateContextData({
                tradingDisabled: true,
            });
        }
    };

    // const getBankAccountData = async () => {
    //    Podpiąć jeśli backend zrobi endpoit do pobierania danych
    //     try {
    //         const response = await PostThis("/bankAccountData", "GET", "", "");
    //         if (response.status >= 200 && response.status < 300) {
    //
    //         } else {
    //             updateContextData({
    //                 tradingDisabled: true,
    //             });
    //         }
    //     } catch (error) {
    //         console.error(error);
    //
    //     }
    // };

    const updateContextData = (data) => {
        setData((prevState) => {
            return {
                ...prevState,
                ...data,
            };
        });
    };

    useEffect(() => {
        getAppConfig();
    }, []);

    return (
        <AppContext.Provider value={{ update: updateContextData, data }}>
            {props.children}
        </AppContext.Provider>
    );
};
