
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { SidebarProvider } from "./context/SidebarContext";
import { BrowserRouter as Router, Routes, Route, useLocation }  from 'react-router-dom';
import Registre from "./components/Registre";
import Login from "./components/Login";
import Home from "./components/Home";
import Logout from "./components/Logout";
import BaseLayout from "./layout/BaseLayout";  
import { Client } from "./components/Tier/Client";
import ClientList from "./components/Tier/ListeClient";
import UserTable from "./components/UserTable";
import Navbar from "./components/Navbar";
import FamilleForm from "./components/article/Famille";
import Addbondecommande from "./components/documentBonDeCommande/Documentbondecommande";

function AppContent() {
  
  const location = useLocation();

   // Check if the current path matches the routes where BaseLayout should be rendered
  const isBaseLayoutVisible = !["/registre"].includes(location.pathname);

  return (
    <>
      {isBaseLayoutVisible && <Navbar />}
      <Routes>
        {/* BaseLayout will be rendered only if isBaseLayoutVisible is true */}
        {isBaseLayoutVisible && (
          <Route element={<BaseLayout />}>
            <Route path='/home' element={<Home />} />
            <Route path="/familleform" element={<FamilleForm />} />
            <Route path='/clientlist' element={<ClientList />} />
            <Route path="/user" element={<UserTable />} />
          </Route>
        )}
        <Route path='/logout' element={<Logout />} />
        <Route path='/registre' element={<Registre />} />
        <Route path='/login' element={<Login />} />
        <Route path='/client' element={<Client />} />
        <Route path='/addbondecommande' element={<Addbondecommande/>} />
      </Routes>
      
    </>
  );
}

export function App() {
  return (
    <SidebarProvider>
      <Router>
        <AppContent />
      </Router>
    </SidebarProvider>
  );
}

export default App;