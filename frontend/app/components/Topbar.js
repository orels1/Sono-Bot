import React from 'react';
import {Link} from 'react-router';

// components
import Status from './items/Status';
import Latest from './items/Latest';

class Topbar extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.fields = [
            {
                'title': 'Bot Status',
                'value': 'In channel',
                'color': 'green',
            },
            {
                'title': 'Stream',
                'value': 'Online',
                'color': 'green',
            },
            {
                'title': 'Viewers',
                'value': '0',
                'color': 'red',
            },
            {
                'title': 'Duration',
                'value': '01:00',
            },
        ];
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
                <Status fields={this.fields} />
                <Latest title="Latest Follower" value={{'title': 'LeeroyJenkins'}} />
                <Latest title="Latest Subscriber" value={{'title': 'LeeroyJenkins', 'date': '1month'}} />
            </div>
        );
    }
}

export default Topbar;
