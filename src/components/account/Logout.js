// src/components/Logout.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Logique de déconnexion, par exemple, supprimer le token de l'utilisateur
    localStorage.removeItem("token");

    // Rediriger vers la page de connexion après la déconnexion
    navigate("/");
  }, [navigate]);

  return (
    <div>
      <h2>Déconnexion en cours...</h2>
    </div>
  );
};

export default Logout;
