import React from "react";

import CustomList from "./customList";
import { CustomListItem } from "./customList";

export default {
    title: "ui/customList",
    component: CustomList,
};

const Template = (args) => <CustomList {...args}>Test</CustomList>;

export const button = Template.bind({});
