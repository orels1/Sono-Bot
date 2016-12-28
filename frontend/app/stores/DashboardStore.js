import alt from '../alt';
import DashboardActions from '../actions/DashboardActions';

class DashboardStore {
    constructor() {
        this.bindActions(DashboardActions);
        this.bindListeners({
            'getFollowers': DashboardActions.GET_FOLLOWERS,
        });

        this.list = [
            {
                'name': 'LeeroyJenkins',
                'data': 1482960529873,
            },
        ];

        this.timers = [
            {
                'name': 'donate',
                'data': 'on',
            },
            {
                'name': 'discord',
                'data': 'on',
            },
            {
                'name': 'twitter',
                'data': 'off',
            },
        ];

        this.channel = 'monstercat';
    }

    getFollowers() {
        this.list = [];
    }

    onGetFollowersSuccess(data) {
        for (let follower of data.results.list) {
            this.list.push({
                'name': follower.name,
                'data': follower.joindate,
            });
        }
    }

    onSocketPushFollower(follower) {
        this.list.unshift({
            'name': follower.name,
            'data': follower.joindate,
            'class': 'new',
        });
    }

}

export default alt.createStore(DashboardStore);
