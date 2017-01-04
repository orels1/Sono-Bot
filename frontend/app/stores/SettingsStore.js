import alt from '../alt';
import SettingsActions from '../actions/SettingsActions';

class SettingsStore {
    constructor() {
        this.bindActions(SettingsActions);
        // this.bindListeners({
        //     'getFollowers': DashboardActions.GET_FOLLOWERS,
        // });
    }


}

export default alt.createStore(SettingsStore);
