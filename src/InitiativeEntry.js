import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import {useState} from 'react';
import DatePicker from './DatePicker.js'
import './css/InitiativeEntry.css'

const InitiativeEntry = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [text, setText] = useState("")



    return (<>
        {!isEditing ? 
        <div className="entry-box">
            <div className="entry-header">
                <DatePicker
                    label={"Select Date"}
                />
                <div/>
                <div/>
            </div>
            <div>
                <TextField
                    onChange={(event, value) => {setText(value)}}
                    variant="outlined"
                />
            </div>
        </div> : null}
    </> );
}

 
export default InitiativeEntry;