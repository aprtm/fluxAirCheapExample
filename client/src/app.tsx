import * as React from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import * as Autosuggest from 'react-autosuggest';
import AirportStore from './stores/airportStore';
import AirportActionCreators from './actions/AirportActionCreators';

class App extends React.Component<{},__Type.AppState>{
    // See comment at the bottom
    static getStores(){
        return ([AirportStore]);
    }

    static calculateState( ){
        return {
            airports: AirportStore.getState()
        }
    }

    constructor(){
        super();
        this.state = {
            valueFrom: '',
            valueTo: '',
            airports: [],
            suggestions: []
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