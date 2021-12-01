import Navbar from './Navbar.js'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';

const ContactUs = () => {
    const [nameTextValue, setNameTextValue] = useState("");
    const [emailTextValue, setEmailTextValue] = useState("");
    const [messageTextValue, setMessageTextValue] = useState("");

    const onNameTextChange = (e) => setNameTextValue(e.target.value);
    const onEmailTextChange = (e) => setEmailTextValue(e.target.value);
    const onMessageTextValue = (e) => setMessageTextValue(e.target.value);

    return ( 
    <div>
        <Navbar />
        <h1>Contact Us</h1>
        <h3>Set up an event with us, ask to meet, or join our team!</h3>
        <h3>Find us through email: oakvilleleos@gmail.com</h3>
        <h3>Or directly inquire through this form</h3>

        <div className="send-contact-us-form">
                    <TextField
                        required
                        value={nameTextValue}
                        onChange={onNameTextChange}
                        label={"Name"}
                    />
                    <TextField
                        required
                        value={emailTextValue}
                        onChange={onEmailTextChange}
                        label={"Email"}
                    />
                    <TextField
                        multiline
                        maxRows={4}
                        value={messageTextValue}
                        onChange={onMessageTextValue}
                        label={"Message"}
                    />
                    <Button variant="contained">Submit</Button>
                </div>
    </div>
    );
}
 
export default ContactUs;