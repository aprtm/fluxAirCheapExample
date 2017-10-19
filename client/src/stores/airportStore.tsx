import AppDispatcher from '../appDispatcher';
import constants from '../utils/constants';
import { ReduceStore } from 'flux/utils';

class AirportStore extends ReduceStore<any,any> {
    getInitialState(){
        return [];
    }

    reduce(state:number, action:__Type.Action){
        switch (action.type ){
            case constants.FETCH_AIRPORTS_SUCCESS:
                return action.payload.response;

            default:
                return state;
        }
    }
}

export default new AirportStore(AppDispatcher);