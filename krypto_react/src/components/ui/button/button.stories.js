import React from 'react';

import Button from "./button";
import {ButtonInner} from "./button";

export default {
    title: 'ui/button',
    component: Button
};

const Template = (args) => <Button {...args}>Test</Button>;

export const button = Template.bind({});

