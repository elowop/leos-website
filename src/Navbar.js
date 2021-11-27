import './css/Navbar.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { Collapse } from '@mui/material';

/* For all pages except the HomePage, we will have the props set to these default values */
const Navbar = ( {isCollapsible = true, isHomePage = false } ) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(isHomePage);

    const navbarItems = [
        {
            text: 'HOME',
            path: '/'
        },
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

    const handleExpandClick = () => {
        if (isCollapsible)
        {
            setExpanded(!expanded);
        }
    };

    return ( 
        <div className="Navbar_External">
            <Collapse in={!expanded} orientation='vertical'>
                <IconButton onClick={handleExpandClick}>
                    <ArrowCircleRightIcon />
                </IconButton>
            </Collapse>
            
            <Collapse in={expanded} orientation='vertical'>
                <div className="Navbar_Internal">   
                    {!isHomePage && <IconButton onClick={handleExpandClick}>
                        <ArrowCircleLeftIcon />
                    </IconButton>}

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
            </Collapse>
        </div>  
     );
}
 
export default Navbar;