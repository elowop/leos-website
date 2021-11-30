import './css/Navbar.css';
import List from './../node_modules/@material-ui/core/List';
import ListItemButton from './../node_modules/@mui/material/ListItemButton';
import ListItemText from './../node_modules/@material-ui/core/ListItemText';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import IconButton from './../node_modules/@mui/material/IconButton';
import ArrowCircleLeftIcon from './../node_modules/@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from './../node_modules/@mui/icons-material/ArrowCircleRight';
import { Collapse } from './../node_modules/@mui/material';
import { styled } from './../node_modules/@mui/material/styles';

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
            text: 'CALENDAR',
            path: '/calendar' 
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

    const StyledList = styled(List)({
        // selected and (selected + hover) states
        '&& .Mui-selected, && .Mui-selected:hover': {
          backgroundColor: 'red',
          '&, & .MuiListItemIcon-root': {
            color: 'pink',
          },
        },
        // hover states
        '& .MuiListItemButton-root:hover': {
          backgroundColor: 'orange',
          '&, & .MuiListItemIcon-root': {
            color: 'yellow',
          },
        },
      });

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
                    {!isHomePage ? 
                    <div className="button-position">
                        <IconButton onClick={handleExpandClick}>
                            <ArrowCircleLeftIcon />
                        </IconButton>
                    </div> : null}

                    <StyledList className="navbar_list">
                        {navbarItems.map(item =>  (
                            <ListItemButton  
                            key={item.text}
                            onClick={() => navigate(item.path)}>
                                <ListItemText primary={item.text} />
                            </ListItemButton>
                        ))}
                    </StyledList>
                </div>  
            </Collapse>
        </div>  
     );
}
 
export default Navbar;