import React from "react";

import Search from "./search";

export default {
    title: "ui/button",
    component: Search,
};

const Template = (args) => <Search {...args}>Test</Search>;

export const button = Template.bind({});
