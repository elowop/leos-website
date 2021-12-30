import { TextField, IconButton } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import {useState, props} from 'react';
import DatePicker from './DatePicker.js'
import './css/InitiativeEntry.css'

const InitiativeEntry = (props) => {

    const setNewDate = (value) => {
        props.edit(props.index, "date", value)
    }


    const edit = (event) => {
        props.edit(props.index, event.target.name, event.target.value);
    };

    return (
    <>
        {props.entry.isEditing ? 
        <div className="full-box">
            <div className="entry-box">
                <div className="entry-header">
                    <div className="date-box">
                        <DatePicker
                            value={props.entry.date}
                            setNewDate={setNewDate}
                            label={"Select Date"}
                        />
                    </div>
                    <div style={{width: "50%"}}/>
                    <div style={{verticalAlign: "middle"}}>
                        <IconButton aria-label="Complete Changes"
                                    onClick={() => {props.confirm(props.index)}}
                                    >
                            <CheckIcon/>
                        </IconButton>
                    </div>
                    <div style={{verticalAlign: "middle"}}>
                        <IconButton aria-label="Discard Changes"
                                    onClick={() => {props.cancelEdit(props.index)}}
                                    >
                            <DoDisturbIcon/>
                        </IconButton>
                    </div>
                </div>
                <div className={"initiatives-title"}>
                    <TextField
                        label={"Title"}
                        name="title"
                        value={props.entry.title}
                        onChange={(event) => edit(event)}
                    />
                </div>
                <div className="initiatives-entry">
                    <TextField
                        multiline
                        placeholder={"Type Something"}
                        value={props.entry.body}
                        name="body"
                        onChange={(event) => edit(event)}
                        variant="outlined"
                    />
                </div>
            </div>
        </div> : 
        <div className="non-editing-full-box">
            <div className="entry-box">
                <div className="display-title">
                    <div>
                        <h2>{props.entry.title}</h2>
                    </div>
                    <div style={{textAlign: "end"}}>
                        <h6>{"Date: " + props.entry.displayDate}</h6>
                    </div>
                </div>
                <div>
                    <p>{props.entry.body}</p>
                </div>
            </div>
            <IconButton onClick={() => props.toggleEdit(props.index)}>
                <EditIcon/>
            </IconButton>
            <IconButton onClick={() => props.remove(props.index)}>
                <DeleteIcon/>
            </IconButton>
        </div>}
    </> );
}
 
export default InitiativeEntry;