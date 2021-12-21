import Navbar from './Navbar.js'
import {useState} from 'react';
import ReactCalendar from './../node_modules/react-calendar';
import './../node_modules/react-calendar/dist/Calendar.css';
import './css/Calendar.css'
import AddCircleSharpIcon from './../node_modules/@mui/icons-material/AddCircleSharp';
import IconButton from './../node_modules/@mui/material/IconButton';
import Slide from './../node_modules/@mui/material/Slide';
import CancelIcon from './../node_modules/@mui/icons-material/Cancel';
import { Collapse } from './../node_modules/@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import CalendarEventInfo from './CalendarEventInfo.js';
import AdapterDateFns from './../node_modules/@mui/lab/AdapterDateFns';
import LocalizationProvider from './../node_modules/@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';

const Calendar = () => {
    // Calendar Function ToDo:
    // -have events expire once there is a 30 day gap between the current date and the event date
    // -make historical events that wont be cleared after 30 day expiry
    // -make list of events instantly update on delete/add
    // -add a section to include optional images of the event
    // -add a verification to make sure the user doesn't accidentally delete an event
    
    const [date, setDate] = useState(new Date());
    const [expanded, setExpanded] = useState(false);
    const [eventNameTextValue, setEventNameTextValue] = useState("");
    const [eventDateValue, setEventDateValue] = useState(new Date());
    const [locationTextValue, setLocationTextValue] = useState("");
    const [eventDescTextValue, setEventDescTextValue] = useState("");
    const [notesTextValue, setNotesTextValue] = useState("");
    const [eventsToday, setEventsToday] = useState([]);

    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var allEvents;

    function sameDay(d1, d2) {
        return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
    }

    function setTileContent(date) {
        setDate(date);

        var allEventsToday = allEvents.filter(e => {
            var responseDate = new Date(e.eventDate);
            return sameDay(responseDate, date);
        });

        setEventsToday(allEventsToday);
    }

    const handleExpandClick = () => setExpanded(!expanded);
    const onEventNameTextChange = (e) => setEventNameTextValue(e.target.value);
    const onEventDateChange = (e) => setEventDateValue(e);
    const onLocationTextChange = (e) => setLocationTextValue(e.target.value);
    const onEventDescTextChange = (e) => setEventDescTextValue(e.target.value);
    const onNotesTextChange = (e) => setNotesTextValue(e.target.value);

    const trySubmit = () => {
        if (eventNameTextValue.length > 0 && locationTextValue.length > 0 && eventDescTextValue.length > 0)
        {
            
            var formSubmission = {
                eventName: eventNameTextValue,
                eventDate: eventDateValue.toJSON(),
                eventLocation: locationTextValue,
                eventDescription: eventDescTextValue,
                notes: notesTextValue.trim() === "" ? "Nothing to note." : notesTextValue
                // POST requests fail if an empty string is passed in so we must default a value in this case
            }
  
            axios.post('http://localhost:5000/calendarEvents/add', formSubmission)
                .then(() => {
                    handleExpandClick();
                });
        }
    };

    // Get all the events stored in the database so that they may be displayed
    axios.get('http://localhost:5000/calendarEvents/')
            .then(response => {
                allEvents = response.data;
            });

    return ( 
    <div className='calendar-main-div'>
        <Navbar />
        <Collapse in={!expanded}>
            <div className='calendar-page-title'>
                <h1>Event Calendar</h1>
                <IconButton className='calendar-event-button' onClick={handleExpandClick}>
                    <AddCircleSharpIcon />
                </IconButton>
            </div>
            
            <div className='calendar-container'>
                <ReactCalendar 
                className="react-calendar"
                minDate={new Date(currentYear, currentMonth, 1)} // We don't want to see any events older than the current month
                minDetail='month'
                maxDetail='month'
                onChange={(date) => setTileContent(date)}
                value={date} 
                defaultValue={date}
                />
                <p className='text-center'>
                    {date.toDateString()}
                </p> 

                <div className='calendar-event-info-box'>
                    <CalendarEventInfo allEventsToday={eventsToday}/>
                </div>
            </div>

            
        </Collapse>

        <Slide direction="up" in={expanded}>
            <div>
                <IconButton className="calendar-event-button" onClick={handleExpandClick}>
                    <CancelIcon />
                </IconButton>
                <div className="add-calendar-event">
                    <h1>Add an Event</h1>
                    <TextField
                        required
                        value={eventNameTextValue}
                        onChange={onEventNameTextChange}
                        label={"Event Name"}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDateTimePicker
                        value={eventDateValue}
                        onChange={(newValue) => {
                            onEventDateChange(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    
                    <TextField
                        required
                        value={locationTextValue}
                        onChange={onLocationTextChange}
                        label={"Event Location"}
                    />
                    <TextField
                        multiline
                        maxRows={4}
                        value={eventDescTextValue}
                        onChange={onEventDescTextChange}
                        label={"Event Description"}
                    />
                    <TextField
                        multiline
                        maxRows={4}
                        value={notesTextValue}
                        onChange={onNotesTextChange}
                        label={"Notes for Attendees"}
                    />
                    <Button variant="contained" onClick={trySubmit}>Submit</Button>
                </div>
            </div>
        </Slide>
    </div> 
    );
}
 
export default Calendar;