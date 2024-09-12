import { useState } from 'react';
import './navbar.css';
import logo from './assets/logo1.png'; // Ruta ajustada si las imágenes están en 'src/assets'
import profile from './assets/profile.png'; 

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    document.body.classList.toggle('collapsed', collapsed);
  };

  return (
    <nav className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top-wrapper">
        <div className="sidebar-top">
          <a href="#" className="logo__wrapper">
            <img src={logo} alt="Logo" className="logo-small" />
            <span className="hide">Guardianes del Suelo</span>
          </a>
        </div>
        <div className="expand-btn" onClick={toggleSidebar}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.00979 2.72L10.3565 7.06667C10.8698 7.58 10.8698 8.42 10.3565 8.93333L6.00979 13.28"
              stroke="#4A516D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
      <div className="sidebar-links">
        <h2>Menú</h2>
        <ul>
          <li>
            <a href="#home" title="Home" className="tooltip">
              <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width="24" height="24"
                viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>
              <span className="link hide">INTA Rafaela</span>
              <span className="tooltip__content">INTA Rafaela</span>
            </a>
          </li>
          {/* Otros enlaces */}
        </ul>
      </div>
      <div className="sidebar__profile">
        <div className="avatar__wrapper">
          <img className="avatar" src={profile} alt="Joe Doe Picture" />
          <div className="online__status"></div>
        </div>
        <section className="avatar__name hide">
          <div className="user-name">Joe Doe</div>
          <div className="email">joe.doe@atheros.ai</div>
        </section>
        <a href="#logout" className="logout">
          <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-logout" width="24" height="24"
            viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
            strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2"></path>
            <path d="M9 12h12l-3 -3"></path>
            <path d="M18 15l3 -3"></path>
          </svg>
        </a>
      </div>
    </nav>
  );
};

export default Sidebar;
