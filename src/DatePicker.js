import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from './../node_modules/@mui/lab/AdapterDateFns';
import LocalizationProvider from './../node_modules/@mui/lab/LocalizationProvider';
import DesktopDatePicker from './../node_modules/@mui/lab/DesktopDatePicker';
import {useState} from 'react';

export default function MaterialUIPickers(props) {
  const [value, setValue] = useState(new Date());

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={props.label}
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}