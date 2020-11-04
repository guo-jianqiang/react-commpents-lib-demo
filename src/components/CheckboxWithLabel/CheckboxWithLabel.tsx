import * as React from 'react';

export interface CheckboxWithLabelProps {
    labelOn: string;
    labelOff: string;
}

export interface CheckboxWithLabelState {
    isChecked: boolean
}

class CheckboxWithLabel extends React.Component<CheckboxWithLabelProps, CheckboxWithLabelState> {
    constructor(props: CheckboxWithLabelProps) {
        super(props);
        this.state = { isChecked: false };
    }

    onChange = () => {
        this.setState({ isChecked: !this.state.isChecked });
    }

    render() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                {this.state.isChecked ? this.props.labelOn : this.props.labelOff}
            </label>
        );
    }
}

export default CheckboxWithLabel