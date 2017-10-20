declare namespace __Type{
    interface Action{
        type: string;
        payload?: any;
        target?: string;
        code?: string;
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
        tickets: Ticket[];
        origin: string;
        destination: string;
        valueFrom: string;
        valueTo: string;
        airports: API.Airport[];
        suggestions: string[];
    }
    interface TicketItemProps{
        ticket: Ticket;
    }
    interface Segment{
        duration: number;
        departureTime: Date;
        arrivalTime: Date;
        origin: string;
        destination: string;
    }
    interface Ticket{
        id: string;
        company: string;
        points: number;
        duration: number
        segment: Segment[]
    }
}