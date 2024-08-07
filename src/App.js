import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Registre from "./components/account/Registre";
import Login from "./components/account/Login";
import Home from "./home/Home";
import Logout from "./components/account/Logout";
import { Client } from "./components/Tier/Client";
import ClientList from "./components/Tier/ListeClient";
import Addbondecommande from "./components/documentBonDeCommande/Documentbondecommande";
import DetailBonCommande from "./components/documentBonDeCommande/DocumentDetail";
import ArticleList from "./components/article/ArticleList";
import { Article } from "./components/article/Article";
import Sidebar from './components/sidebar/Sidebar';
import Navbar from './components/navbar/Navbar';
import PurchaseOrderForm from './PurchaseOrderForm';

const App = () => {
  const location = useLocation();
  const noSidebarRoutes = ['/login', '/registre'];
  const noNavbarRoutes = ['/login', '/registre'];

  return (
    <div className="app d-flex">
      {!noSidebarRoutes.includes(location.pathname) && <Sidebar />}
      <div className="main-content flex-grow-1">
        {!noNavbarRoutes.includes(location.pathname) && <Navbar />}
        <Routes>
        <Route path='/purchaseOrderForm' element={<PurchaseOrderForm />} />
          <Route path='/home' element={<Home />} />
          <Route path='/documentboncommande' element={<Addbondecommande />} />
          <Route path='/listboncommande' element={<DetailBonCommande />} />
          <Route path='/clientlist' element={<ClientList />} />
          <Route path='/client' element={<Client/>} />
          <Route path='/articleList' element={<ArticleList />} />
          <Route path='/article' element={<Article />} />
          <Route path='/logout' element={<Logout />} />
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
