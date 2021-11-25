import './css/Navbar.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemButton from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import {useNavigate} from 'react-router-dom';

const Navbar = ( props ) => {
    const navigate = useNavigate();

    const navbarItems = [
        {
            text: 'WHO WE ARE',
            path: '/who-we-are' 
        },
        {
            text: 'INITIATIVES',
            path: '/intiatives' 
        },
        {
            text: 'CALANDAR',
            path: '/calandar' 
        },
        {
            text: 'CONTACT US',
            path: '/contact-us' 
        },
        {
            text: 'JOIN THE LEOS',
            path: '/join-the-leos' 
        },
    ]
    return ( 
        <div className="Navbar">
            <List>
                {navbarItems.map(item =>  (
                    <ListItem 
                    button 
                    key={item.text}
                    onClick={() => navigate(item.path)}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
            </List>
        </div>
     );
}
 
export default Navbar;