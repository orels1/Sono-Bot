import React from 'react';
import {Link} from 'react-router';

class Status extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        let fields = this.props.fields.map((item, index) => {
            return (
                <div key={index} className="status-item">
                    <div className="status-item-title">
                        {item.title}
                    </div>
                    <div className={'status-item-value ' + item.color}>
                        {item.value}
                    </div>
                </div>
            );
        });
        return (
            <div className="topbar-container">
                {fields}
            </div>
        );
    }
}

export default Status;
