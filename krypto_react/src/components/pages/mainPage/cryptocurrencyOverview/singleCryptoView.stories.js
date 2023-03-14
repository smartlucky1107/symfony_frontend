import React from "react";

import CryptocurrencyOverviewSingleSmall from "./singleCryptoView";

export default {
    title: "mainPage/cryptocurrencyOverview",
    component: CryptocurrencyOverviewSingleSmall,
};

const Template = (args) => (
    <CryptocurrencyOverviewSingleSmall
        shortName={"BTC"}
        fullName={"Bitcoin"}
        change={"-1.12"}
        price={"12345.12"}
        priceCurrencyShortName={"PLN"}
        {...args}
    />
);

export const SingleCryptoView = Template.bind({});
