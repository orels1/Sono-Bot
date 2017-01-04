import React from 'react';
import {Link} from 'react-router';

class Sidebar extends React.Component {
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
            <div className="sidebar">
                <Link to="/" className="notification-block"></Link>
                <nav className="sidebar-nav">
                    <ul>
                        <li>
                            <Link to="/" className="dashboard-link" activeClassName="active"></Link>
                        </li>
                        <li>
                            <Link to="/settings/" className="settings-link" activeClassName="active"></Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default Sidebar;
