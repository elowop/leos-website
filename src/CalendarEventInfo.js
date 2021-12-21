import Link from '@mui/material/Link';
import {useState} from 'react';
import { Collapse } from './../node_modules/@mui/material';
import Slide from './../node_modules/@mui/material/Slide';
import IconButton from './../node_modules/@mui/material/IconButton';
import CancelIcon from './../node_modules/@mui/icons-material/Cancel';
import ListItemButton from './../node_modules/@mui/material/ListItemButton';
import ListItemText from './../node_modules/@material-ui/core/ListItemText';
import axios from 'axios';

const CalendarEventInfo = ({ allEventsToday }) => {
    const [expanded, setExpanded] = useState(false);
    const [currentEvent, setCurrentEvent] = useState([]);

    const expandEventView = (e) => {
        setExpanded(!expanded);
        setCurrentEvent(e);
    };

    const deleteEvent = (id) => {
        axios.delete('http://localhost:5000/calendarEvents/' + id)
            .then(() => {
                expandEventView(currentEvent);
            });
    };

    return ( 
        <div>
            <Collapse in={!expanded}>
            {
                allEventsToday.length === 0 ? <div>No Events</div> : 
                allEventsToday.map(event => {
                    return (
                        <div>
                            <Link underline='hover' onClick={() => {
                                expandEventView(event);
                                
                                }}>{event.eventName}</Link>
                        </div>
                    );
                })
            }
            </Collapse>
            <Slide direction="up" in={expanded}>
                <div>
                    <IconButton className="calendar-event-button" onClick={() => expandEventView(currentEvent)}>
                        <CancelIcon />
                    </IconButton>
                    
                    <h2>{currentEvent.eventName}</h2>
                    <h4>{currentEvent.eventDate}</h4>
                    <h4>{currentEvent.eventLocation}</h4>
                    <h4>{currentEvent.eventDescription}</h4>
                    <h4>{currentEvent.notes}</h4>
                    <ListItemButton  
                    key="DELETE EVENT"
                    onClick={() => deleteEvent(currentEvent._id)}>
                        <ListItemText primary="DELETE EVENT" />
                    </ListItemButton>
                </div>
            </Slide>
        </div> 
    );
}
 
export default CalendarEventInfo;

/*
                var updatedEvents = allEventsToday.filter(e => e._id !== id);
                var updatedEventNames = [];
                updatedEvents.forEach(e => {
                    updatedEventNames.push( e.eventName )
                });

                setCart(updatedEvents);*/