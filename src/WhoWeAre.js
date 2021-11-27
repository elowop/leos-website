import WhoWeAreImage from './images/who_we_are_image.jpg'
import './css/WhoWeAre.css'
import Navbar from './Navbar';

function BGImage(props) {
    return (
      <div
        style={{
          background: "url(" + props.bg + ")",
          height: "80%",
          width: "100%",
          backgroundSize: "cover"
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "80%",
            width: "100vw",
            backgroundColor: props.tint,
            zIndex: "1",
            opacity: "0.8"
          }}
        />
      </div>
    );
  }
  
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "100vw",
    height: "100vh"
  };

const WhoWeAre = () => {
    return ( 
        <div>
          <Navbar />
            <div className="text_backdrop">
                      <h1 className="who_we_are_title">who we are</h1>
                      <p className="who_we_are_body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tempus libero 
                        at posuere facilisis. Suspendisse laoreet, ante a dapibus malesuada, lacus libero viverra tellus, non commodo enim 
                        eros sit amet est. Pellentesque id rutrum sapien, in malesuada massa. Aenean placerat consequat aliquam. Etiam ligula 
                        est, aliquam ut nisi vel, euismod efficitur nunc. Cras in mi id tellus interdum porta ac at neque. Aenean porta orci 
                        sit amet interdum sollicitudin. Vivamus eu dictum felis, sit amet semper arcu.
                      </p>
            </div>

            <div style={styles}>
              <BGImage bg={WhoWeAreImage} tint="#CD853F" />
            </div>
            
            
        </div>
    );
}
 
export default WhoWeAre;



