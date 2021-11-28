import Navbar from './Navbar.js'
import {useState} from 'react';
import ReactCalendar from './../node_modules/react-calendar';
import './../node_modules/react-calendar/dist/Calendar.css';
import './css/Calendar.css'
import AddCircleSharpIcon from './../node_modules/@mui/icons-material/AddCircleSharp';
import IconButton from './../node_modules/@mui/material/IconButton';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
    const [_tileContent, _SetTileContent] = useState("This will hold information about events (where/when they will happen).");

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
        /*pull up the "add an event" window*/
    };

    return ( 
    <div className='calendar-main-div'>
        <Navbar />

        <div className='calendar-page-title'>
            <h1>Event Calendar</h1>
            <IconButton className='add-calendar-event' onClick={handleExpandClick}>
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
    </div> 
    );
}
 
export default Calendar;