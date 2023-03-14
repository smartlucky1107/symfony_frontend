import React, {useContext, useEffect, useRef, useState} from "react";
import usePrevious from "../usabilityHooks";
import PostThis from "../../scripts/post";
import axios from "axios";

export const transactionContext = {
    initialBaseCurrency: null,
    initialQuotedCurrency: null,

    buyLastActive: "buyIWant",
    buyActivePair: null,
    buyIHaveAmount: "",
    buyIHaveValid: true,
    buyIHaveLoading: false,
    buyIHaveCurrencyList: [],
    buyIWantAmount: "0.01",
    buyIWantValid: true,
    buyIWantLoading: false,
    buyIWantCurrencyList: [],
    buyTransactionStep: 1,

    sellLastActive: "sellIHave",
    sellActivePair: null,
    sellIHaveAmount: "0.01",
    sellIHaveValid: true,
    sellIHaveLoading: false,
    sellIHaveCurrencyList: [],
    sellIWantAmount: "",
    sellIWantLoading: false,
    sellIWantCurrencyList: [],
    sellTransactionStep: 1,

    requestTicker: true,
    currencyLoading: null,

    transactionType: "buy",
    exchangeTransactionStep: 1,
    transactionComponentMounted: false,

    maintenance: false
};

export const TransactionContext = React.createContext({
    data: transactionContext,
    update: () => {
    },
});

export const TransactionContextProvider = (props) => {
    const [data, setData] = useState(transactionContext);
    const oldData = usePrevious(data);
    const timer = useRef(null);
    const timerValue = 1000; //in ms;
    const previousData = usePrevious(data);
    const intervalOfUpdatingPrices = useRef(null);
    const getCurrentPriceTimeout = useRef(null);
    const [pendingRequest, setPendingRequest] = useState(false);


    const updateContextData = (data) => {
        setData((prevState) => {
            return {
                ...prevState,
                ...data,
            };
        });
    };

    const isPendingRequest = () => {
        return pendingRequest;
    }

    const reloadContextData = () => {
    };

    const resetContextData = () => {
        updateContextData({
            buyLastActive: "buyIWant",
            buyIWantAmount: data.buyIWantAmount,
            buyTransactionStep: 1,

            sellLastActive: "sellIHave",
            sellIHaveAmount: data.sellIHaveAmount,
            sellTransactionStep: 1,

            transactionType: "buy",
        });
    };

    const setLoading = (value) => {
        if (data.transactionType === "buy") {
            switch (data.buyLastActive) {
                case "buyIHave":
                    updateContextData({
                        buyIWantLoading: value,
                    });
                    break;

                case "buyIWant":
                    updateContextData({
                        buyIHaveLoading: value,
                    });
                    break;
            }
        } else if (data.transactionType === "sell") {
            switch (data.sellLastActive) {
                case "sellIHave":
                    updateContextData({
                        sellIWantLoading: value,
                    });
                    break;

                case "sellIWant":
                    updateContextData({
                        sellIWantLoading: value,
                        sellIHaveLoading: value,
                    });
                    break;
            }
        }
    };

    const getCurrencyList = async () => {
        try {
            const response = await PostThis("/charting/currencies", "GET", "", "");
            if (response.status >= 200 && response.status < 300) {
                createIWantCurrencyList(response.data);
            } else {
                updateContextData({
                    maintenance: true
                });
            }
        } catch (error) {
            console.error(error);
            updateContextData({
                maintenance: true
            });
        }
    };

    const getIHaveCurrencyList = (currencyObject) => {
        let currencyList = data.currencyList;
        return {
            buyIHaveCurrencyList:
                currencyList[
                    currencyObject?.currencyPair?.baseCurrency?.shortName
                    ]
        };
    };

    const getSellIWantCurrencyList = (currencyObject) => {
        let currencyList = data.currencyList;
        return {
            sellIWantCurrencyList:
                currencyList[
                    currencyObject?.currencyPair?.baseCurrency?.shortName
                    ],
        };
    };

    const createIWantCurrencyList = (edata) => {
        console.log(edata);
        let baseCurrency = 0;
        let quotedCurrency = 0;
        let currencyList = edata;

        let currencyListParsed = [];
        let buyCurrencyListParsed = [];
        let sellCurrencyListParsed = [];

        Object.keys(currencyList).map((item) => {
            currencyListParsed.push(currencyList[item][0]);

            if(currencyList[item][0].currencyPair.isBuyAllowed){
                buyCurrencyListParsed.push(currencyList[item][0]);
            }
            if(currencyList[item][0].currencyPair.isSellAllowed){
                sellCurrencyListParsed.push(currencyList[item][0]);
            }
        });

        baseCurrency =
            currencyListParsed[0].currencyPair?.baseCurrency?.shortName;
        quotedCurrency =
            currencyList[baseCurrency][0].currencyPair?.quotedCurrency
                ?.shortName;

        if (typeof currencyList[data.initialBaseCurrency] !== "undefined") {
            if (data.initialBaseCurrency) {
                baseCurrency = data.initialBaseCurrency;
            }
            if (data.initialQuotedCurrency) {
                quotedCurrency = data.initialQuotedCurrency;
            }
        }

        let activePairFiltered = currencyList[baseCurrency].filter(
            (el, i, k) => {
                return (
                    el.currencyPair.quotedCurrency.shortName === quotedCurrency
                );
            }
        );
        if (activePairFiltered.length < 1) {
            activePairFiltered = currencyList[baseCurrency];
        }

        let buyActivePair = activePairFiltered[0];
        let buyIHaveCurrencyList = currencyList[baseCurrency];
        let sellActivePair = activePairFiltered[0];
        let sellIWantCurrencyList = currencyList[baseCurrency];

        if (currencyListParsed.length > 0) {
            updateContextData({
                currencyList: currencyList,
                buyActivePair: buyActivePair,
                sellActivePair: sellActivePair,
                buyIWantAmount: parseFloat(parseFloat(data.buyIWantAmount).toFixed(buyActivePair.currencyPair.baseCurrency.roundPrecision)),
                sellIHaveAmount: parseFloat(parseFloat(data.sellIHaveAmount).toFixed(sellActivePair.currencyPair.baseCurrency.roundPrecision)),
                buyIWantCurrencyList: buyCurrencyListParsed,
                buyIHaveCurrencyList: buyIHaveCurrencyList,
                sellIHaveCurrencyList: sellCurrencyListParsed,
                sellIWantCurrencyList: sellIWantCurrencyList,
            });
        }
    };

    const getCurrentPrice = async (transactionType = 1) => {
        let type = 1;
        let amount = data.buyIWantAmount;
        let pairShortName = data.buyActivePair?.currencyPair?.pairShortName;

        if (data.transactionType === "sell" || transactionType === 2) {
            type = 2;
            amount = data.sellIHaveAmount;
            pairShortName = data.sellActivePair?.currencyPair?.pairShortName;
        }
        if (typeof pairShortName !== "undefined" && amount !== "") {
            try {
                setPendingRequest(true);
                const response = await PostThis(
                    "/api-public/orders/instant-price",
                    "POST",
                    {
                        pairShortName: pairShortName,
                        type: type,
                        amount: amount,
                    },
                    "",
                    null
                );
                if (typeof response !== undefined) {
                    if (response.status >= 200 && response.status < 300) {
                        if (type === 1) {
                            updateContextData({
                                buyIHaveAmount: response.data.price,
                                requestTicker: true
                            });
                        } else if (type === 2) {
                                setPendingRequest(false);
                                updateContextData({
                                    sellIWantAmount: response.data.price,
                                    requestTicker: true
                                });

                        }
                    } else {
                        updateContextData({
                            maintenance: true
                        });
                    }
                }
                validateCryptoInputs();
            } catch (error) {
                updateContextData({
                    maintenance: true
                });
            }
            setLoading(false);
        }

    };

    const getCurrentAmount = async () => {
        let type = 1;
        let limitPrice = data.buyIHaveAmount;
        let pairShortName = data.buyActivePair?.currencyPair?.pairShortName;

        if (data.transactionType === "sell") {
            type = 2;
            limitPrice = data.sellIWantAmount;
            pairShortName = data.sellActivePair?.currencyPair?.pairShortName;
        }

        if (typeof pairShortName !== "undefined" && limitPrice !== "") {
            try {
                const response = await PostThis(
                    "/api-public/orders/instant-amount",
                    "POST",
                    {
                        pairShortName: pairShortName,
                        type: type,
                        totalPrice: limitPrice,
                    },
                    "",
                    null
                );
                if (response.status >= 200 && response.status < 300) {
                    if (type === 1) {
                        updateContextData({
                            buyIWantAmount: response?.data.amount,
                            requestTicker: true
                        });
                    } else if (type === 2) {
                        updateContextData({
                            sellIHaveAmount: response?.data.amount,
                        });
                    }
                } else {
                    updateContextData({
                        maintenance: true
                    });
                }
            } catch (error) {
                updateContextData({
                    maintenance: true
                });
                console.error(error);
            }
            setLoading(false);
        }
    };

    const isMinMax = (value) => {
        const activePair = data[data.transactionType + "ActivePair"];
        const validatedValue = parseFloat(value);
        let lotSizeMinQty = parseFloat(
            activePair?.currencyPair.lotSizeMinQty
        );
        if (isNaN(lotSizeMinQty)) {
            lotSizeMinQty = 0.0001;
        }
        let lotSizeMaxQty = parseFloat(
            activePair?.currencyPair.lotSizeMaxQty
        );
        if (isNaN(lotSizeMaxQty)) {
            lotSizeMaxQty = 10;
        }

        const isMin = validatedValue >= lotSizeMinQty;
        const isMax = validatedValue <= lotSizeMaxQty;

        console.log(lotSizeMinQty, lotSizeMaxQty, validatedValue);

        if (value === "") {
            return true;
        }
        if (!isMin) {
            return "min";
        }
        if (!isMax) {
            return "max";
        }
        return true;
    };

    const validateCryptoInputs = () => {
        updateContextData({
            buyIWantValid: isMinMax(data.buyIWantAmount),
            sellIHaveValid: isMinMax(data.sellIHaveAmount),
        });
    };

    const updatePricesAndAmounts = async () => {
        if (data.transactionType === "buy") {
            console.log("tu idzie");
            switch (data.buyLastActive) {
                case "buyIHave":
                    console.log("get current amount idzie");
                    getCurrentAmount();
                    break;
                case "buyIWant":
                    console.log("get current price idzie");
                    getCurrentPrice();
                    break;
            }
        } else if (data.transactionType === "sell") {
                getCurrentPrice(2);
        }
    };

    const startIntervalOfUpdatingPricesAndAmounts = () => {
        console.log("Start interval");
        if (intervalOfUpdatingPrices.current === null) {
            intervalOfUpdatingPrices.current = setInterval(
                () => {
                    updateContextData({
                        requestTicker: false
                    });

                    updatePricesAndAmounts();
                },
                5000
            );
        }
    };

    const stopIntervalOfUpdatingPricesAndAmounts = () => {
        console.log("Stop interval");
        if (intervalOfUpdatingPrices.current !== null) {
            clearInterval(intervalOfUpdatingPrices.current);
        }
        intervalOfUpdatingPrices.current = null;
    };

    useEffect(() => {

        return () => {
            stopIntervalOfUpdatingPricesAndAmounts();
        };
    }, []);

    useEffect(() => {
        if (data.initialBaseCurrency !== null) {
            getCurrencyList();
        }
    }, [data.initialBaseCurrency, data.initialQuotedCurrency]);

    useEffect(() => {
        validateCryptoInputs();
        stopIntervalOfUpdatingPricesAndAmounts();
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            updatePricesAndAmounts();
            startIntervalOfUpdatingPricesAndAmounts();
        }, timerValue);
        setLoading(true);
    }, [data[data.buyLastActive + "Amount"], data.sellIHaveAmount]);

    useEffect(() => {
        validateCryptoInputs();
    }, [data.buyIWantAmount, data.sellIHaveAmount]);

    useEffect(() => {
        //setPendingRequest(false);
    }, [data.sellIWantAmount]);

    useEffect(() => {
        if(pendingRequest === true){
            /*updateContextData({
                sellIWantLoading: true
            })*/
        }
    }, [pendingRequest])

    useEffect(() => {
        stopIntervalOfUpdatingPricesAndAmounts();
        if (data.transactionComponentMounted) {
            setLoading(true);

            //Change pair debounce
            if(pendingRequest === false) {
                clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    updatePricesAndAmounts();
                    startIntervalOfUpdatingPricesAndAmounts();
                }, 500);
            }

        }
    }, [data.sellActivePair]);

    useEffect(() => {
        stopIntervalOfUpdatingPricesAndAmounts();
        if (data.transactionComponentMounted) {
            setLoading(true);


                clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    updatePricesAndAmounts();
                    startIntervalOfUpdatingPricesAndAmounts();
                }, 500);


        }
    }, [data.buyActivePair])

    useEffect(() => {
        stopIntervalOfUpdatingPricesAndAmounts();
        if (data.transactionComponentMounted) {
            setLoading(true);


                clearTimeout(timer.current);
                timer.current = setTimeout(() => {
                    updatePricesAndAmounts();
                    startIntervalOfUpdatingPricesAndAmounts();
                }, 500);


        }
    }, [data.transactionType]);

    useEffect(() => {
        if(data.buyTransactionStep === 1 || data.sellTransactionStep === 1){
            startIntervalOfUpdatingPricesAndAmounts();
        }
        if (data.buyTransactionStep > 1 || data.sellTransactionStep > 1) {
            stopIntervalOfUpdatingPricesAndAmounts();
        }
    }, [data.buyTransactionStep, data.sellTransactionStep]);

    return (
        <TransactionContext.Provider
            value={{
                getIHaveCurrencyList,
                getSellIWantCurrencyList,
                update: updateContextData,
                reload: reloadContextData,
                reset: resetContextData,
                stopRefreshingPrices: stopIntervalOfUpdatingPricesAndAmounts,
                validation: {
                    isMinMax,
                },
                isPendingRequest,
                data,
            }}
        >
            {props.children}
        </TransactionContext.Provider>
    );
};
