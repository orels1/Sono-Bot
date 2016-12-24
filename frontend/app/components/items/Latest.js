import React from 'react';
import {Link} from 'react-router';

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

    render() {
        return (
            <div className="topbar-container">
                <div className="latest-item">
                    <div className="latest-title">
                        {this.props.title}
                    </div>
                    <div className="latest-block">
                        <div className="latest-block-title">
                            {this.props.value.title}
                        </div>
                        {this.props.value.date &&
                            <div className="latest-block-date">
                                {this.props.value.date}
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Latest;
