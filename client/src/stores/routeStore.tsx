import AppDispatcher from '../appDispatcher';
import constants from '../utils/constants';
import { ReduceStore } from 'flux/utils';

class RouteStore extends ReduceStore<any, any>{
    reduce(state:any, action:__Type.Action){
        switch (action.type) {
            case constants.CHOOSE_AIRPORT:
            // action.target can be either “origin” or “destination”
            // action.code contains the selected airport code
                return state.set(action.target, action.code);
            default:
                return state;
        }
    }

    get(key:string){
        
    }

    set(){

    }

    getInitialState(){
        return {};
    }
}
export default new RouteStore(AppDispatcher);