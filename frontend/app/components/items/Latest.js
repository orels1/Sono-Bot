import React from 'react';
import TimeAgo from 'react-timeago';

class Latest extends React.Component {
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

    // custom formatter
    formatter(value, unit, suffix, date) {
        switch (unit) {
        case 'second':
            return `${value} sec`;
        case 'minute':
            return `${value} min`;
        case 'hour':
            return `${value} hr`;
        case 'day':
            return `${value} d`;
        case 'week':
            return `${value} wk`;
        case 'month':
            return `${value} mnth`;
        case 'year':
            return `${value} yr`;
        default:
            return `${value} ${unit}`;
        }
    }

    render() {
        return (
            <div className="topbar-container">
                <div className="latest-item">
                    <div className="latest-title">
                        {this.props.title}
                    </div>
                    <div className="latest-block">
                        <div className="latest-block-title">
                            {this.props.value.name}
                        </div>
                        <div className="latest-block-date">
                            {this.props.value.date && <TimeAgo date={this.props.value.date} formatter={this.formatter} />}
                            {!this.props.value.date && 'never'}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Latest;
