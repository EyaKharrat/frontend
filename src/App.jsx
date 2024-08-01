// src/App.jsx
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Registre from "./components/account/Registre";
import Login from "./components/account/Login";
import Home from "./components/Home";
import Logout from "./components/account/Logout";
import { Client } from "./components/Tier/Client";
import ClientList from "./components/Tier/ListeClient";
import Addbondecommande from "./components/documentBonDeCommande/Documentbondecommande";
import DetailBonCommande from "./components/documentBonDeCommande/DocumentDetail";
import ArticleList from "./components/article/ArticleList";
import { Article } from "./components/article/Article";
import Navbar from "./components/dashboard/Navbar";
import Sidebar from "./components/dashboard/Sidebar";

function AppContent() {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/clientlist' element={<ClientList />} />
      <Route path='/articleList' element={<ArticleList />} />
      <Route path='/article' element={<Article />} />
      <Route path='/logout' element={<Logout />} />
      <Route path='/registre' element={<Registre />} />
      <Route path='/login' element={<Login />} />
      <Route path='/client' element={<Client />} />
      <Route path='/addbondecommande' element={<Addbondecommande />} />
      <Route path='/detailboncommande' element={<DetailBonCommande />} />
    </Routes>
  );
}

export function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <Router>
      <Navbar onMenuClick={handleMenuClick} />
      <Sidebar open={sidebarOpen} onClose={handleSidebarClose} />
      <main style={{ padding: '16px' }}>
        <AppContent />
      </main>
    </Router>
  );
}

export default App;
