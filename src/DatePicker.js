import * as React from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import {useState, props} from 'react';

export default function MaterialUIPickers(props) {

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label={props.label}
          inputFormat="MM/dd/yyyy"
          value={props?.value ?? new Date()}
          onChange={(event, value) => props.setNewDate(event)}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}