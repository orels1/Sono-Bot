import React from 'react';
import SettingsActions from '../actions/SettingsActions';
import SettingsStore from '../stores/SettingsStore';

class Settings extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = SettingsStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        SettingsStore.listen(this.onChange);
        // SettingsActions.getFollowers();

        socket.on('follower', function(data) {
            // SettingsActions.socketPushFollower(data);
        });
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        SettingsStore.unlisten(this.onChange);
    }

    onChange(state) {
        // We are listening to the store here and apply changes to this.state accordingly
        this.setState(state);
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-column">
                    <div className="dashboard-block">
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;
