import Home from './Home.js'
import Intiatives from './Intiatives.js'
import './css/App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/intiatives">
          <Intiatives />
        </Route>
      </Router>
    </div>
  );
}

export default App;
