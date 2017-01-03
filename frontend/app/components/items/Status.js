import React from 'react';
import moment from 'moment';

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
                        {item.type === 'time' &&
                            <div>
                                {item.value === '00:00' && '00:00'}
                                {item.value !== '00:00' && moment(moment().diff(moment(item.value))).format('HH:mm')}
                            </div>
                        }
                        {!item.type && item.value}
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
