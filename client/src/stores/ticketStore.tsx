import AppDispatcher from '../AppDispatcher';
import constants from '../utils/constants';
// import RouteStore from './RouteStore';
import { ReduceStore } from 'flux/utils';

// import AirportActions from '../actions/AirportActionCreators';

class TicketStore extends ReduceStore<any, any>{
    getInitialState(){
        return [];
    }
    reduce(state:string, action:__Type.Action){
        switch (action.type) {
            case constants.FETCH_TICKETS:
                return [];
            case constants.FETCH_TICKETS_SUCCESS:
                return action.payload.response;
            default:
                return state;
        }
    }
}

export default new TicketStore(AppDispatcher);