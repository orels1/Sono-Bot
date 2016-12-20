import React from 'react';
import {Link} from 'react-router';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        // this.state = HomeStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        // HomeStore.listen(this.onChange);
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        // HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accodingly
        this.setState(state);
    }

    render() {
        return (
            <div>
                <h1 className="display-3">Dashboard!</h1>
            </div>
        );
    }
}

export default Dashboard;
