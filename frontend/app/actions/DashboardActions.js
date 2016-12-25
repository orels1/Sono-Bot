import alt from '../alt';

class DashboardActions {
    constructor() {
        this.generateActions(
        	'getFollowersSuccess',
            'getFollowersFail',
            'socketPushFollower'
        );
    }

    getFollowers() {
        $.ajax({
            'url': '/api/v1/followers',
            'type': 'GET',
        })
            .done((data) => {
                this.getFollowersSuccess(data);
            })
            .fail((jqXhr) => {
                this.getFollowersFail(jqXhr);
            });
        return false;
    }
}

export default alt.createActions(DashboardActions);
