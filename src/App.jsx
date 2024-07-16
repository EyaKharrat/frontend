
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import { SidebarProvider } from "./context/SidebarContext";
import { BrowserRouter as Router, Routes, Route, useLocation }  from 'react-router-dom';
import Registre from "./components/account/Registre";
import Login from "./components/account/Login";
import Home from "./components/Home";
import Logout from "./components/account/Logout";
import BaseLayout from "./layout/BaseLayout";  
import { Client } from "./components/Tier/Client";
import ClientList from "./components/Tier/ListeClient";
import Navbar from "./components/Navbar";
import FamilleForm from "./components/article/Famille";
import Addbondecommande from "./components/documentBonDeCommande/Documentbondecommande";
import DetailBonCommande from "./components/documentBonDeCommande/DocumentDetail";

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
          </Route>
        )}
        <Route path='/logout' element={<Logout />} />
        <Route path='/registre' element={<Registre />} />
        <Route path='/login' element={<Login />} />
        <Route path='/client' element={<Client />} />
        <Route path='/addbondecommande' element={<Addbondecommande/>} />
        <Route path='/detailboncommande' element={<DetailBonCommande/>} />
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