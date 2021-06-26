import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Search from './components/Search/search';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ArtistEvents from './components/ArtistEvents/ArtistEvents';

function App() {
  return (
    <div className="App">
      <main className="pt-5">
        <div className="container">
          <BrowserRouter>
            <Switch>
              <Route exact path="/" component={Search} />
              <Route exact path="/event" component={ArtistEvents} />
            </Switch>
          </BrowserRouter>
        </div>
      </main>
    </div>
  );
}

export default App;
