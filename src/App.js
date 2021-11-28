import Home from './Home.js'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WhoWeAre from './WhoWeAre.js'
import Initiatives from './Initiatives.js'
import Calendar from './Calendar.js'
import ContactUs from './ContactUs.js'
import JoinTheLeos from './JoinTheLeos.js'

import './css/App.css';

function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
         <Route exact path="/" element={<Home/>}/>
         <Route exact path="/who-we-are" element={<WhoWeAre/>}/>
         <Route exact path="/intiatives" element={<Initiatives/>}/>
         <Route exact path="/calendar" element={<Calendar/>}/>
         <Route exact path="/contact-us" element={<ContactUs/>}/>
         <Route exact path="/join-the-leos" element={<JoinTheLeos/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
