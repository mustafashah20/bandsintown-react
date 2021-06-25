import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Search from './components/search'

function App() {
  return (
    <div className="App">
      <main className="pt-5">
        <div className="container">
          <Search/>
        </div>
      </main>
    </div>
  );
}

export default App;
