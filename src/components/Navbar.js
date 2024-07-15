import React, { useState } from 'react';
import { IoNotificationsCircleSharp } from "react-icons/io5";
import { SiImessage } from "react-icons/si";
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  const [showProfileOptions, setShowProfileOptions] = useState(false);

  const toggleProfileOptions = () => {
    setShowProfileOptions(!showProfileOptions);
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    setShowProfileOptions(false); // Ferme le dropdown après avoir cliqué sur Settings (ou toute autre option)
    // Ajoutez d'autres logiques pour le clic sur Settings si nécessaire
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item ms-3">
              <button className="btn btn-link nav-link" onClick={() => console.log('Notification button clicked')}>
                <IoNotificationsCircleSharp /> Notifications
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-link nav-link" onClick={() => console.log('Messaging button clicked')}>
                <SiImessage /> Messaging
              </button>
            </li>
            <li className="nav-item dropdown">
              <div className="btn-group">
                <button className="btn btn-link nav-link dropdown-toggle" onClick={toggleProfileOptions}>
                  <AccountCircle /> Profile
                </button>
                {showProfileOptions && (
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={handleSettingsClick}>Settings</button></li>
                    {/* Ajoutez plus d'options ici au besoin */}
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
