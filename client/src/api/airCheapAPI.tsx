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
    },

    fetchTickets(){
        fetch('./public/flights.json')
            .then( res=>res.json() )
            .then( data=>AirportActionCreators.fetchTicketsSuccess(data) )
            .catch( err=>{
                console.error(err);
                AirportActionCreators.fetchTicketsError(err)
            });
    }
}

export default AirCheapAPI;