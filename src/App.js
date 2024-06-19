
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registre from "./components/Registre";
import Login from "./components/Login";
import Home from "./components/Home";
import Sidebar from "./components/sidebar/Sidebar.jsx";
import Logout from "./components/Logout.js";

function App() {
  
  return (
    <div>
      <Router>
     
        <Routes>
          <Route path='/dhashbord' element={<Sidebar />} />
          <Route path='/registre' element={<Registre />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
       
      </Router>
    </div>
  );
}

export default App;
