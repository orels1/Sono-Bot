import alt from '../alt';

class TopbarActions {
    constructor() {
        this.generateActions(
            'socketPushFollower',
            'socketPushSub',
            'socketUpdateStatus',
        );
    }
}

export default alt.createActions(TopbarActions);
