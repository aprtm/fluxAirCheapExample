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
    },

    chooseAirport(target:string, code:string){
        AppDispatcher.dispatch({
            type: constants.CHOOSE_AIRPORT,
            target,
            code
        });
    },

    fetchTickets(){
        AirCheapAPI.fetchTickets();
        AppDispatcher.dispatch({
            type: constants.FETCH_TICKETS
        });
    },

    fetchTicketsSuccess( response:Response ){
        AppDispatcher.dispatch({
            type: constants.FETCH_TICKETS_SUCCESS,
            payload: {response}
        });
    },

    fetchTicketsError( error:Error ){
        AppDispatcher.dispatch({
            type: constants.FETCH_TICKETS_ERROR,
            payload: {error}
        });
    }

}

export default AirportActionCreators