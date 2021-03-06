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
    // -add a section to include optional images of the event
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
    const [allEvents, setAllEvents] = useState([]);
    const [hasEvents, setHasEvents] = useState(true);

    // using Navbar we can set sessionStorage and then have useStates which check if the sessionStorage is true/false or nonempty or w.e. to determine if isUser or isAdmin or neither

    // By default, entering the webpage the client is neither a recognized user nor an admin. Once credentials are provided, they may be given user/admin access. Users will be able to see
    // Calendar Events while admins will have User privileges plus the ability to add/remove Calendar Events and Initatives.
    const [isUser, setIsUser] = useState(sessionStorage.getItem('user') == null ? false : true);
    const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem('admin') == null ? false : true);
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();

    // This is called in the Navbar, where we notify the Calendar component that we just added a user/admin to the sessionStorage and we may want to update the component based
    // on the clients new permissions.
    const receiveChildNotif = () => {
        setIsUser(sessionStorage.getItem('user') == null ? false : true);
        setIsAdmin(sessionStorage.getItem('admin') == null ? false : true);
      };
    
    // On loading the calendar page, we should have 0 events and a default assumption that events might exist (i.e. hasEvents useState == true). Thus we make 1 GET request
    // and if we find no events in the database, we set hasEvents to false so that we do not end up infinitely making GET requests.
    if (allEvents.length === 0 && hasEvents) {
        // Get all the events stored in the database so that they may be displayed
        axios.get('http://localhost:5000/calendarEvents/')
        .then(response => {
            setAllEvents(response.data);

            if (response.data.length === 0) {
                setHasEvents(false);
            }
        });
    }

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
                    setAllEvents([...allEvents, formSubmission]);

                    // If we previously didn't have any events and then add an event, we now have an event.
                    if (!hasEvents) {
                        setHasEvents(true);
                    }
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
                var newAllEvents = allEvents.filter(e => e._id !== id);
                var newEventsToday = newAllEvents.filter(dDate => {
                    dDate = new Date(dDate.eventDate);
                    return sameDay(dDate, date);
                });
                setEventsToday(newEventsToday);
                setAllEvents(newAllEvents);

                // If we delete any events and our list is now empty we have no events.
                if (allEvents.length === 0) {
                    setHasEvents(false);
                }

                setOpenSuccessAlert(true);
            })
            .catch(() => {
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

    function tileClassName({ date }) {
        
        if (allEvents) {
            var eventsToday = allEvents.filter(dDate => {
                dDate = new Date(dDate.eventDate);
                return sameDay(dDate, date);
            });

            // Check if a date React-Calendar wants to check is on the list of dates to add class to
            if (eventsToday.length > 0) {
                return 'event-tile';
            }
        }

        return 'regular-tile';
    }

    return ( 
    <div className='calendar-main-div'>
        <Navbar fromChildToParentCallback={receiveChildNotif}/>
            <Collapse in={!isUser && !isAdmin}>
                <h2>You must be logged in to view this page</h2>
            </Collapse>
            
            <Collapse in={isUser || isAdmin}>
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
                        <Collapse in={isAdmin}>
                            <IconButton className='calendar-event-button' onClick={handleExpandClick}>
                                <AddCircleSharpIcon />
                            </IconButton>
                        </Collapse>
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
                        tileClassName={tileClassName}
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
                                        <Collapse in={isAdmin}>
                                            <ListItemButton  
                                            key="DELETE EVENT"
                                            onClick={handleClickOpenEnsureDelete}>
                                                <ListItemText primary="DELETE EVENT" />
                                            </ListItemButton>
                                        </Collapse>
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
            </Collapse>
        </div>
    );
}
 
export default Calendar;