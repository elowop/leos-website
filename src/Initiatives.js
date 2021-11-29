import Navbar from './Navbar.js'
import { Toolbar } from '@mui/material';
import './css/Initiatives.css'
import InitiativeEntry from './InitiativeEntry'


const Initiatives = () => {
    return ( 
    <>
        <div>
            <Navbar />
        </div>
        <div className="title-toolbar">
            <Toolbar>
                HELLO
            </Toolbar>
        </div>
        <div>
            <InitiativeEntry/>
        </div>
    </> );
}
 
export default Initiatives;