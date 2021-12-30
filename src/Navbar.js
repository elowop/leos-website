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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

/* For all pages except the HomePage, we will have the props set to these default values */
const Navbar = ( {isCollapsible = true, isHomePage = false, fromChildToParentCallback } ) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(isHomePage);
    const [openLogin, setOpenLogin] = useState(false);
    const [loginCode, setLoginCode] = useState("");

    const handleClickOpenLogin = () => {
        setOpenLogin(true);
    };
    
      const handleCloseLogin = () => {
        setOpenLogin(false);
    };

    
    const handleLoginSubmit = async e => {
        e.preventDefault();
        // connect the login token with the loginToken from Calendar.js
        axios.get('http://localhost:5000/logins/')
            .then(response => {
                const adminCodeLength = 18;
                var loginCodeFound = response.data.filter(r => r.loginCode === loginCode);
                
                // If we are matching with more than 1 loginCode there is a problem..
                if (loginCodeFound.length === 1) {
                    if (loginCode.length === adminCodeLength) {
                        // The code entered is for an admin
                        sessionStorage.setItem('admin', true);
                    } else {
                        // The code entered is for a user 
                        sessionStorage.setItem('user', true);
                    }
                }

                fromChildToParentCallback();

                handleCloseLogin();
            })
            .catch((err) => {
                console.log(err);
                handleCloseLogin();
            });
    }

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

            <Dialog open={openLogin} onClose={handleCloseLogin}>
                <DialogTitle>Login</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Login here to access Calendar! 
                        Don't have a login code? Talk to the Oakville Leos to get one
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Login Token"
                        type="password"
                        fullWidth
                        variant="standard"
                        onChange={e => setLoginCode(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLogin}>Cancel</Button>
                    <Button onClick={handleLoginSubmit}>Login</Button>
                </DialogActions>
            </Dialog>
            
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
                    <button onClick={handleClickOpenLogin}>Login</button>
                </div>  
            </Collapse>
        </div>  
     );
}
 
export default Navbar;