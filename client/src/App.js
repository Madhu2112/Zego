import './App.css';
import Lobby from './Components/Lobby';
import TextEditor from './Components/TextEditor';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {v4 as uuidV4} from 'uuid'
import Zego from './Components/Zego';

function App() {
  return (
    <div className="App">
      {/* <Router>
        <Routes>
          <Route path='/' element={ <Navigate to={`documents/${uuidV4()}`} />} />
          <Route path='/' element={ <Lobby />} />
          <Route path='/Room/:id' element={<Zego />} />
          <Route path='/documents/:id' element={<TextEditor id="nitin" />} />
        </Routes>
      </Router> */}
      <TextEditor roomId="123"/>
      <Zego roomId="123"/>
    </div>
  );
}

export default App;
