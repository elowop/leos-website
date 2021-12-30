import Navbar from './Navbar.js'
import { Toolbar, IconButton } from '@mui/material';
import './css/Initiatives.css'
import InitiativeEntry from './InitiativeEntry'
import {useState, props} from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';


const Initiatives = () => {

    const [initiatives, setInitiatives] = useState([]);

    const addEntry = () => {
        let newEntry = {
            title: "",
            body: "",
            prevTitle: "",
            prevBody: "",
            isEditing: true,
            date: new Date(),
            displayDate: new Date().toLocaleDateString()
        }
        setInitiatives([...initiatives, newEntry])
    }

    const onChange = (index, name, value) => {
        let editInitiatives = [...initiatives]
        // [{a: 2, b:2}, {a:2, b:3}]
        if (name === "date") {
            editInitiatives[index].displayDate = value.toLocaleDateString()
        }
        editInitiatives[index][name] = value
        setInitiatives(editInitiatives)
    }

    const confirmEdit = (index) => {
        let toggleEdit = [...initiatives]
        toggleEdit[index]["isEditing"] = false
        setInitiatives(toggleEdit)
    }

    const removeEntry = (index) => {
        let spliceInitiative = [...initiatives]
        spliceInitiative.splice(index, 1);
        setInitiatives(spliceInitiative)
    }

    const editEntry = (index) => {
        let editInitiatives = [...initiatives]
        editInitiatives[index].prevBody = editInitiatives[index].body
        editInitiatives[index].prevTitle = editInitiatives[index].title
        editInitiatives[index].isEditing = true
        setInitiatives(editInitiatives)
    }

    const cancelEdit = (index) => {
        let editInitiatives = [...initiatives]
        editInitiatives[index].body = editInitiatives[index].prevBody
        editInitiatives[index].title = editInitiatives[index].prevTitle
        editInitiatives[index].isEditing = false
        setInitiatives(editInitiatives)
    }

    return ( 
        <>
            <div>
                <Navbar />
            </div>
            <div className="title-toolbar">
                <Toolbar>
                    Initiatives
                </Toolbar>
            </div>
            <div>
                {initiatives.map((entry, index) => {
                    console.log(entry)
                    return (<InitiativeEntry
                        edit={onChange}
                        index={index}
                        entry={entry}
                        toggleEdit={editEntry}
                        cancelEdit={cancelEdit}
                        confirm={confirmEdit}
                        remove={removeEntry}
                    />)
                })}
            </div>
            <div>
                <IconButton
                    onClick={() => addEntry()}
                >
                    <AddCircleOutlineIcon/>
                </IconButton>
            </div>
        </> 
    );
}
 
export default Initiatives;