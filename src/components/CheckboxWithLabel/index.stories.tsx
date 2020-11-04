import React from 'react';
import CheckboxWithLabel from './index';

export default {
    title: 'CheckboxWithLabel',
    component: CheckboxWithLabel
};

export const Checkboxs = () => {
    return (<CheckboxWithLabel labelOn={'On'} labelOff={'Off'} />)
}