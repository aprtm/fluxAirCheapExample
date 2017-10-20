import * as React from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import * as Autosuggest from 'react-autosuggest';
import AirportStore from './stores/airportStore';
import RouteStore from './stores/RouteStore';
import TicketStore from './stores/TicketStore';
import TicketItem from './components/TicketItem';
import AirportActionCreators from './actions/AirportActionCreators';

class App extends React.Component<{},__Type.AppState>{
    // See comment at the bottom
    static getStores(){
        return ([AirportStore, RouteStore, TicketStore]);
    }

    static calculateState( ){
        return {
            airports: AirportStore.getState(),
            origin: RouteStore.get('origin'),
            destination: RouteStore.get('destination'),
            tickets: TicketStore.getState()

        }
    }

    constructor(){
        super();
        this.state = {
            tickets: [],
            origin: '',
            destination: '',
            valueFrom: '',
            valueTo: '',
            airports: [],
            suggestions: []
        }
    }

    componentWillUpdate( _nextProps:__Type.AppProps, nextState:__Type.AppState ){
        let originAndDestinationSelected = nextState.origin && nextState.destination;
        let selectionHasChangedSinceLastUpdate = nextState.origin !== this.state.origin || nextState.destination !== this.state.destination;

        if( originAndDestinationSelected && selectionHasChangedSinceLastUpdate ){
            AirportActionCreators.fetchTickets();
        }
    }

    componentDidMount(){
        AirportActionCreators.fetchAirports();
    }

    getSuggestions = (input:string, callback?:Function)=>{
        const   escapedInput = input.trim().toLowerCase(),
                airportMatchRegex = new RegExp('\\b' + escapedInput, 'i');

        const suggestions = this.state.airports
            .filter( airport=>airportMatchRegex.test(airport.city) )
            .sort( (airport1, airport2)=>{
                return  airport1.city.toLowerCase().indexOf(escapedInput) - 
                        airport2.city.toLowerCase().indexOf(escapedInput)
            } )
            .slice(0, 7)
            .map(airport => `${airport.city} - ${airport.country} (${airport.code})`);
            
            callback && callback(null, suggestions);

            return suggestions;
    }

    handleSelect = (target:string, suggestion:string) => {
        const airportCodeRegex = /\(([^)]+)\)/;
        let airportCodeSuggestions = airportCodeRegex.exec(suggestion);
        let airportCode = airportCodeSuggestions ? airportCodeSuggestions.toString() : '';

        AirportActionCreators.chooseAirport(target, airportCode);
    }

    onSuggestionsFetchRequested = ( req:any ) => {
        this.setState({
                suggestions: this.getSuggestions( req.value )
            });
    }

    getSuggestionValue(suggestion:string){
        return suggestion;
    }

    renderSuggestion = (suggestion:string) => {
        return <div>{suggestion}</div>
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    }
    
    onChangeHandler = (elementId:string, _e:any, params:any)=>{
        if ( elementId == 'origin'){
            this.setState({
                valueFrom: params.newValue
            });
        }
        if ( elementId == 'destination'){
            this.setState({
                valueTo: params.newValue
            });
        }
    }

    render(){
        let ticketList = this.state.tickets.map((ticket)=>{
            <TicketItem key={ticket.id} ticket={ticket}/>
        });
        const { valueFrom, valueTo, suggestions } = this.state;
        return (
            <div>
                <header>
                    <div className="header-brand">
                        <img src="public/logo.png" alt="AltText" height="35"/>
                        <p>Check discount ticket prices and pay using your AirCheap points</p>
                    </div>
                    <div className="header-route">
                        <Autosuggest
                            id='origin'
                            suggestions={suggestions || []}
                            onSuggestionSelected={(_e, {suggestion})=>this.handleSelect('origin',suggestion)}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={ {
                                    placeholder:'From', 
                                    value: valueFrom, 
                                    onChange: (...args:any[]) => {
                                        this.onChangeHandler('origin',args[0], args[1] ) 
                                    }
                                } }
                        />
                        <Autosuggest
                            id='destination'
                            suggestions={suggestions || []}
                            onSuggestionSelected={(_e, {suggestion})=>this.handleSelect('destination',suggestion)}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={ {
                                    placeholder:'To', 
                                    value:valueTo, 
                                    onChange: (...args:any[]) => {
                                        this.onChangeHandler('destination',args[0], args[1] )
                                    }
                                } }
                        />
                    </div>
                </header>
                <div>
                    {ticketList}
                </div>
            </div>
        );
    }
}

/**
 * Create is used to transform a react class into a container
 * that updates its state when relevant stores change.
 * The provided base class must have static methods getStores() and calculateState().
 */
const AppContainer = Container.create(App);

render( <AppContainer />, document.getElementById('root') )