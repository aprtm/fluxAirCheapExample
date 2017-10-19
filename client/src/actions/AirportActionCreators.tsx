import AppDispatcher from '../appDispatcher';
import constants from '../utils/constants';
import AirCheapAPI from '../api/airCheapAPI';

let AirportActionCreators = {
    fetchAirports(){
        AirCheapAPI.fetchAirports();
        AppDispatcher.dispatch({
            type: constants.FETCH_AIRPORTS
        });
    },

    fetchAirportsSuccess(response:Response){
        AppDispatcher.dispatch({
            type: constants.FETCH_AIRPORTS_SUCCESS,
            payload: {response}
        })
    },

    fetchAirportsError(error:Error){
        AppDispatcher.dispatch({
            type: constants.FETCH_AIRPORTS_ERROR,
            payload: {error}
        });
    }
}

export default AirportActionCreators