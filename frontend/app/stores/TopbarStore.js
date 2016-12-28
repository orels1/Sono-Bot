import alt from '../alt';
import TopbarActions from '../actions/TopbarActions';
import moment from 'moment';

class TopbarStore {
    constructor() {
        this.bindActions(TopbarActions);

        this.latestFollower = {
            'name': 'None',
            'date': false,
        };

        this.latestSub = {
            'name': 'None',
            'date': false,
        };

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
                'value': '2016-12-28T20:47:45Z',
                'type': 'time',
            },
        ];
    }

    onSocketPushFollower(follower) {
        this.latestFollower = {
            'name': follower.name,
            'date': follower.joindate,
        };
    }

    onSocketPushSub(follower) {
        this.latestSub = {
            'name': sub.name,
            'date': sub.joindate,
        };
    }

    onSocketUpdateStatus(status) {
        // Reset fields if stream offline
        if (status.stream === null) {
            this.fields[1].value = 'Offline';
            this.fields[1].color = 'red';
            this.fields[2].value = 0;
            this.fields[2].color = 'red';
            this.fields[3].value = '00:00';
            delete this.fields[3].value.type;
            return this.fields;
        }

        // Assign status to fields
        this.fields[1].value = 'Online';
        this.fields[1].color = 'green';
        this.fields[2].value = status.stream.viewers;
        this.fields[2].color = 'green';
        this.fields[3].value = status.stream.created_at;
        return this.fields;
    }

}

export default alt.createStore(TopbarStore);
