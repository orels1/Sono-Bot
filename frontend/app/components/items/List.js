import React from 'react';
import TimeAgo from 'react-timeago';

class List extends React.Component {
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
        let items = this.props.items.map((item, index) => {
            return (
                <li key={index} className="list-item">
                    <div
                        className={`list-block ${item.class}`}
                    >
                        <div className="list-block-title">
                            {item.name}
                        </div>
                        <div className="list-block-data">
                            {this.props.type === 'date' && <TimeAgo date={item.data} formatter={this.formatter} />}
                            {!this.props.type && item.data}
                        </div>
                    </div>
                </li>
            );
        });
        return (
            <div className="list-container">
                <div className="list-title">
                    {this.props.title}
                </div>
                <ul style={{'maxHeight': this.props.height ? this.props.height : 'auto'}}>
                    {this.props.items.length !== 0 && items}
                    {this.props.items.length === 0 &&
                        <div>Loading</div>
                    }
                </ul>
            </div>
        );
    }
}

export default List;
