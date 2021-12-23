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
import AdapterDateFns from './../node_modules/@mui/lab/AdapterDateFns';
import LocalizationProvider from './../node_modules/@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import Alert from '@mui/material/Alert';
import CloseIcon from '@mui/icons-material/Close';
import ListItemButton from './../node_modules/@mui/material/ListItemButton';
import ListItemText from './../node_modules/@material-ui/core/ListItemText';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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
    const [expandedEventInfo, setExpandedEventInfo] = useState(false);
    const [currentEvent, setCurrentEvent] = useState([]);
    const [openEnsureDelete, setOpenEnsureDelete] = useState(false);
    const [openSuccessAlert, setOpenSuccessAlert] = useState(false);
    const [openErrorAlert, setOpenErrorAlert] = useState(false);

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
                    setEventsToday([...eventsToday, formSubmission]);
                });
        }
    };

    const expandEventView = (e) => {
        setExpandedEventInfo(!expandedEventInfo);
        setCurrentEvent(e);
    };

    const deleteEvent = (id) => {
        axios.delete('http://localhost:5000/calendarEvents/' + id)
            .then(() => {
                expandEventView(currentEvent);
                var newEventsToday = eventsToday.filter(e => e._id != id);
                setEventsToday(newEventsToday);
                setOpenSuccessAlert(true);
            })
            .catch((err) => {
                setOpenErrorAlert(true);
            });
    };

    const handleClickOpenEnsureDelete = () => { setOpenEnsureDelete(true); };
    const handleCloseEnsureDelete = (willDeleteEvent) => {  
        if (willDeleteEvent) {
            deleteEvent(currentEvent._id)
        }
        setOpenEnsureDelete(false);
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

            <Collapse in={openSuccessAlert}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpenSuccessAlert(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                EVENT DELETED
                </Alert>
            </Collapse>
            <Collapse in={openErrorAlert}>
                <Alert
                severity="error"
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpenErrorAlert(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                >
                FAILED TO DELETE: Give database time to update before trying again
                </Alert>
            </Collapse>
            
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

                    <Collapse in={!expandedEventInfo}>
                    {
                        eventsToday.length === 0 ? <div>No Events</div> : 
                        eventsToday.map(event => {
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
                    <Slide direction="up" in={expandedEventInfo}>
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
                                onClick={handleClickOpenEnsureDelete}>
                                    <ListItemText primary="DELETE EVENT" />
                                </ListItemButton>
                            </div>
                    </Slide>

                    <Dialog
                        open={openEnsureDelete}
                        onClose={handleCloseEnsureDelete}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {"Are you sure you want to delete this event?"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                The event will be gone forever if you choose to do so!
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => handleCloseEnsureDelete(false)}>Cancel</Button>
                            <Button onClick={() => handleCloseEnsureDelete(true)} autoFocus>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
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