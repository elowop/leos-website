import Navbar from './Navbar.js'
import HomeImage from './images/home_image.jpg'
import './css/Home.css'

const Home = () => {

    return ( 
        <div className="home_page">
            
            <img src={HomeImage} className="home_image"/>
            <div className="main_title">
                <h1>we are Oakville leos</h1>
            </div>
                
            <Navbar isCollapsible={false} isHomePage={true}/>
        </div>
     );
}
 
export default Home;