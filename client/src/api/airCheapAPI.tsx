import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
    fetchAirports(){
        fetch('./public/airports.json')
            .then( res=>res.json() )
            .then( data=> {
                AirportActionCreators.fetchAirportsSuccess(data);
            } )
            .catch( err=> {
                console.error(err);
                AirportActionCreators.fetchAirportsError(err);
            });
    }
}

export default AirCheapAPI;