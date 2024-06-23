
import './App.css';
import { BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Read from './pages/Read'
import NewEdit from './pages/NewEdit';
import Main2 from './pages/Main2';   
import Read2 from './pages/Read';    
import NewEdit2 from './pages/NewEdit2';                                
import Security from './pages/Security';
import Security2 from './pages/Security2';
import PassKey from './pages/PassKey';
import Login2 from './pages/Login2';
import ImageKey from './pages/ImageKey';
import ImageComparisonComponent from './pages/ImageComparisonComponent';
import Preferences from './pages/Preferences';


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
    <Route path="/main2" element={<Main2/>}/>
    <Route path="/create2" element={<NewEdit2/>}/>
    <Route path="/read2" element={<Read2/>}/>
    <Route path="/security" element={<Security/>}/>
    <Route path="/passkey" element={<PassKey/>}/>
    <Route path="/security2" element={<Security2/>}/>
    <Route path="/login2" element={<Login2/>}/>
    <Route path="/imagekey" element={<ImageKey/>}/>
    <Route path="/comp" element={<ImageComparisonComponent/>}/>
    <Route path="/preferences" element={<Preferences/>}/>
    </Routes>
    </BrowserRouter>
  );
}
 
export default App;
