import AdapterDateFns from './../node_modules/@mui/lab/AdapterDateFns';
import LocalizationProvider from './../node_modules/@mui/lab/LocalizationProvider';
import DesktopDateTimePicker from '@mui/lab/DesktopDateTimePicker';
import TextField from '@mui/material/TextField';
import {useState} from 'react';

const DateTimePicker = () => {
    const [value, setValue] = useState(new Date());

    return ( 
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDateTimePicker
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
     );
}
 
export default DateTimePicker;