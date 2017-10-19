declare namespace __Type{
    interface Action{
        type: string;
        payload?: any;
    }
    namespace API{
        interface Airport{
            code: string;
            city: string;
            country: string;
        }
    }
    interface AppProps{
    }
    interface AppState{
        valueFrom: string;
        valueTo: string;
        airports: API.Airport[];
        suggestions: string[];
    }
}