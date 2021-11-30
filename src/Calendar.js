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
import DateTimePicker from './DateTimePicker.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [_tileContent, _SetTileContent] = useState("This will hold information about events (where/when they will happen).");
    const [expanded, setExpanded] = useState(false);
    const [eventNameTextValue, setEventNameTextValue] = useState("");
    const [locationTextValue, setLocationTextValue] = useState("");
    const [eventDescTextValue, setEventDescTextValue] = useState("");
    const [notesTextValue, setNotesTextValue] = useState("");

    function setTileContent(date) {
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var day = days[ date.getDay() ];

        setDate(date);

        switch (day) {
            case 'Friday':
                _SetTileContent("Leos Meeting Today @ 6PM!");
                break;
            default:
                _SetTileContent("Nothing!");
                break;
          }
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const onEventNameTextChange = (e) => setEventNameTextValue(e.target.value);
    const onLocationTextChange = (e) => setLocationTextValue(e.target.value);
    const onEventDescTextChange = (e) => setEventDescTextValue(e.target.value);
    const onNotesTextChange = (e) => setNotesTextValue(e.target.value);

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
                minDetail='day'
                maxDetail='month'
                onChange={(date) => setTileContent(date)}
                value={date} 
                defaultValue={date}
                />
                <p className='text-center'>
                {date.toDateString()}
                </p> 
                <p>
                    {_tileContent}
                </p>
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
                        onChange={onEventNameTextChange}
                        value={eventNameTextValue}
                        label={"Event Name"}
                    />
                    <DateTimePicker label={"Date & Time of the Event"}/>
                    <TextField
                        required
                        onChange={onLocationTextChange}
                        value={locationTextValue}
                        label={"Event Location"}
                    />
                    <TextField
                        label={"Event Description"}
                        multiline
                        maxRows={4}
                        value={eventDescTextValue}
                        onChange={onEventDescTextChange}
                    />
                    <TextField
                        label={"Notes for Attendees"}
                        multiline
                        maxRows={4}
                        value={notesTextValue}
                        onChange={onNotesTextChange}
                    />
                    <Button variant="contained">Submit</Button>
                </div>
            </div>
        </Slide>
    </div> 
    );
}
 
export default Calendar;