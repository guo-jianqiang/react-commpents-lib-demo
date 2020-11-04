import React from 'react';
import { shallow } from 'enzyme';
import CheckboxWithLabel from '../components/CheckboxWithLabel';

test('CheckboxWithLabel changes the text after click', () => {
    // @ts-ignore
    const checkbox = shallow(<CheckboxWithLabel labelOn={'On'} labelOff={'Off'} />)

    // Interaction demo
    expect(checkbox.text()).toEqual('Off');
    checkbox.find('input').simulate('change');
    expect(checkbox.text()).toEqual('On');

    // Snapshot demo
    expect(checkbox).toMatchSnapshot();
});