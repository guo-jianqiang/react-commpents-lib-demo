import * as React from 'react';
export interface CheckboxWithLabelProps {
    labelOn: string;
    labelOff: string;
}
export interface CheckboxWithLabelState {
    isChecked: boolean;
}
declare class CheckboxWithLabel extends React.Component<CheckboxWithLabelProps, CheckboxWithLabelState> {
    constructor(props: CheckboxWithLabelProps);
    onChange: () => void;
    render(): JSX.Element;
}
export default CheckboxWithLabel;
