import * as React from 'react';

const dateConfig = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"    
};

class TicketItem extends React.Component<__Type.TicketItemProps> {
    render(){
        let {ticket} = this.props;
        let departureTime = new Date(ticket.segment[0].departureTime)
            .toLocaleDateString('en-US', dateConfig);
        let arrivalTime = new Date(ticket.segment[ticket.segment.length-1].arrivalTime)
            .toLocaleDateString('en-US', dateConfig);
        let stops = '';
        if(ticket.segment.length-1 > 1){
            stops = ticket.segment.length-1 + ' stops'
        }

        return (
            <div className='ticket'>
                <span className="ticket-company">{ticket.company}</span>
                <span className="ticket-location">
                    <strong>{ticket.segment[0].origin}</strong>{' '}
                    <small>{departureTime}</small>
                </span>
                <span className="ticket-separator">

                </span>
                <span className="ticket-location">
                    <strong>{ticket.segment[ticket.segment.length-1].destination}</strong>{' '}
                    <small>{arrivalTime}</small>
                </span>
                <span className="ticket-connection">
                    {stops}
                </span>
                <span className="ticket-points">
                    <button>{ticket.points} points</button>
                </span>
            </div>
        );
    }
}

export default TicketItem;