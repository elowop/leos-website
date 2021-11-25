import './css/Navbar.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/List';
import ListItemButton from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SubjectIcon from "@material-ui/icons/Mail";

const Navbar = ( props ) => {

    const navbarItems = [
        {
            text: 'WHO WE ARE',
            icon: <SubjectIcon color="secondary" />,
            path: '/' 
        },
        {
            text: 'INITIATIVES',
            icon: <SubjectIcon color="secondary" />,
            path: '/' 
        },
        {
            text: 'CALANDAR',
            icon: <SubjectIcon color="secondary" />,
            path: '/' 
        },
        {
            text: 'CONTACT US',
            icon: <SubjectIcon color="secondary" />,
            path: '/' 
        },
        {
            text: 'JOIN THE LEOS',
            icon: <SubjectIcon color="secondary" />,
            path: '/' 
        },
    ]
    return ( 
        <div className="Navbar">
            <List>
                {navbarItems.map(item =>  {
                    <ListItem key={item.text}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                })}
            </List>
        </div>
     );
}
 
export default Navbar;