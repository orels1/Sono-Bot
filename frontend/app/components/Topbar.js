import React from 'react';
import {Link} from 'react-router';

class Topbar extends React.Component {
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
            <div className="topbar">
                Topbar!
            </div>
        );
    }
}

export default Topbar;
