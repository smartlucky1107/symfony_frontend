import React from 'react';

import CryptocurrencyOverviewAllContainer from "./allContainer";

export default {
    title: 'mainPage/cryptocurrencyOverview',
    component: CryptocurrencyOverviewAllContainer
};

const allContainer = (args) => <CryptocurrencyOverviewAllContainer {...args}/>;

export const AllContainer = allContainer.bind({});


