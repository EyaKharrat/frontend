import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Registre from "./components/account/Registre";
import Login from "./components/account/Login";
import WelcomePage from './home/WelcomPage';
import Logout from "./components/account/Logout";
import { Client } from "./components/Tier/Client";
import ClientList from "./components/Tier/ListeClient";
import ArticleList from "./components/article/ArticleList";
import { Article } from './components/article/Article';
import Sidebar from './components/sidebar/Sidebar';
import ProtectedRoute from './ProtectedRoute';
import { Fournisseur } from './components/Tier/Fournisseur';
import FournisseurList from './components/Tier/ListeFournisseur';
import AddBonDeCommande from './components/documentBonDeCommande/DocumentBonDeCommande';
import StockManager from './components/article/StockManager';
import OrderDetailsPage from './components/documentBonDeCommande/OrderDetailsPage';
import BonEntree from './components/bonEntree/bonEntree';
import Home from './home/Home';
import OrderListPage from './components/documentBonDeCommande/OrderListPage';
import BonEntreeList from './components/bonEntree/BonEntreeList';
const App = () => {
  const location = useLocation();

  // Définir les routes où le Sidebar et le Navbar ne doivent pas être affichés
  const noSidebarRoutes = ['/login', '/registre','/'];
//  const noNavbarRoutes = ['/', '/registre'];

  return (
    <div className="app d-flex">
      {/* Afficher Sidebar si l'URL actuelle n'est pas dans noSidebarRoutes */}
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="main-content flex-grow-1">
        {/* Afficher Navbar si l'URL actuelle n'est pas dans noNavbarRoutes */}
        {/*!noNavbarRoutes.includes(location.pathname) && <Navbar />*/}
        <Routes>
          <Route path='/' element={<WelcomePage/>} />
          <Route path='/bonEntreeList' element={<ProtectedRoute element={BonEntreeList} />} />
          <Route path='/order' element={<ProtectedRoute element={OrderListPage} />} />
          <Route path='/home' element={<ProtectedRoute element={Home} />} />
          <Route path='/order/:uniqueId' element={<ProtectedRoute element={OrderDetailsPage} />} />
          <Route path='/stock' element={<ProtectedRoute element={StockManager} />} />
          <Route path='/document' element={<ProtectedRoute element={AddBonDeCommande} />} />
          <Route path='/bonEntree' element={<ProtectedRoute element={BonEntree } />} />
          <Route path='/clientlist' element={<ProtectedRoute element={ClientList} />} />
          <Route path='/client' element={<ProtectedRoute element={Client} />} />
          <Route path='/fournisseur' element={<ProtectedRoute element={Fournisseur} />} />
          <Route path='/fournisseurList' element={<ProtectedRoute element={FournisseurList} />} />
          <Route path='/articleList' element={<ProtectedRoute element={ArticleList} />} />
          <Route path='/article' element={<ProtectedRoute element={Article} />} />
          <Route path='/logout' element={<ProtectedRoute element={Logout} />} />
          <Route path='/registre' element={<Registre />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
