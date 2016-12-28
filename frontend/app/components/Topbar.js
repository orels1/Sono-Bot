import React from 'react';
import {Link} from 'react-router';
import TopbarActions from '../actions/TopbarActions';
import TopbarStore from '../stores/TopbarStore';

// components
import Status from './items/Status';
import Latest from './items/Latest';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = TopbarStore.getState();
        this.onChange = this.onChange.bind(this);
        
    }

    componentDidMount() {
        TopbarStore.listen(this.onChange);

        socket.on('follower', (data) => {
            TopbarActions.socketPushFollower(data);
        });

        socket.on('sub', (data) => {
            TopbarActions.socketPushSub(data);
        });

        socket.on('twitch status', (status) => {
            TopbarActions.socketUpdateStatus(status);
        });
    }

    componentWillUnmount() {
        TopbarStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {
        return (
            <div className="topbar">
                <Status fields={this.state.fields} />
                <Latest title="Latest Follower" value={this.state.latestFollower} />
                <Latest title="Latest Subscriber" value={this.state.latestSub} />
            </div>
        );
    }
}

export default Topbar;
