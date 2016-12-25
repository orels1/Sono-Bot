import alt from '../alt';
import DashboardActions from '../actions/DashboardActions';
import moment from 'moment';

class DashboardStore {
    constructor() {
        this.bindActions(DashboardActions);
        this.bindListeners({
            'getFollowers': DashboardActions.GET_FOLLOWERS,
        });

        this.list = [
            {
                'name': 'LeeroyJenkins',
                'data': '1 min',
            },
            {
                'name': 'MrNoScope420',
                'data': '2 min',
            },
            {
                'name': 'irdumb',
                'data': '2 min',
            },
            {
                'name': '8s99s',
                'data': '4 min',
            },
            {
                'name': 'lovedemBots',
                'data': '10 min',
            },
            {
                'name': 'whoCares',
                'data': '30 min',
            },
            {
                'name': 'leopardskinftw',
                'data': '1 hr',
            },
            {
                'name': 'letseedis',
                'data': '1 hr',
            },
            {
                'name': '420blazeitboy',
                'data': '1 day',
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
                'data': moment.duration(- parseInt(moment(follower.joindate).diff(moment()), 10)).humanize(),
            });
        }
    }

    onSocketPushFollower(follower) {
        this.list.unshift({
            'name': follower.name,
            'data': moment.duration(- parseInt(moment(follower.joindate).diff(moment()), 10)).humanize(),
            'class': 'new',
        });
    }

}

export default alt.createStore(DashboardStore);
