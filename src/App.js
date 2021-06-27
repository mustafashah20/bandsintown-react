import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search/Search';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ArtistEvents from './components/ArtistEvents/ArtistEvents';
import Helmet from 'react-helmet';

function App() {
  return (
    <div className="App">
      <Helmet bodyAttributes={{ style: 'background-color : #FFFFFF00' }} />
      <div className="container mt-5">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Search} />
            <Route exact path="/event" component={ArtistEvents} />
          </Switch>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
