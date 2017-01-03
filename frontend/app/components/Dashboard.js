import React from 'react';
import DashboardActions from '../actions/DashboardActions';
import DashboardStore from '../stores/DashboardStore';

// components
import List from './items/List';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        // We are getting state from our store
        this.state = DashboardStore.getState();
        // And listen to any changes to get the two-way binding
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        // Will fire once, after markup has been injected
        DashboardStore.listen(this.onChange);
        DashboardActions.getFollowers();

        socket.on('follower', function(data) {
            DashboardActions.socketPushFollower(data);
        });
    }

    componentWillUnmount() {
        // Will fire once before markup has been removed
        DashboardStore.unlisten(this.onChange);
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
                        <div className="dashboard-bot-controls">
                            <button className="btn btn-rect btn-grad-red">
                                Leave channel
                            </button>
                            <button className="btn btn-rect btn-grad-red">
                                Deafen
                            </button>
                            <button className="btn btn-rect btn-grad-red">
                                Mute
                            </button>
                        </div>
                    </div>
                    <div className="dashboard-block">
                        <iframe className="twitch-chat" frameBorder="0" src={`https://www.twitch.tv/${this.state.channel}/chat?popout=`}></iframe>
                    </div>
                </div>
                <div className="dashboard-column">
                    <div className="dashboard-block">
                        <List items={this.state.list} title="Followers" type="date" height="500px" />
                    </div>
                    <div className="dashboard-block">
                        <List items={this.state.timers} title="Timers" />
                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;
