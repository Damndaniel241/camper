
import './App.css';
import { BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
// import Create from '.pages/Create';
import Read from './pages/Read'
import NewEdit from './pages/NewEdit';

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/main" element={<Main/>}/>
    <Route path="/create" element={<NewEdit/>}/>
    <Route path="/read" element={<Read/>}/>

    </Routes>
    </BrowserRouter>
  );
}
 
export default App;
