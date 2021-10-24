import React, { useState } from 'react';
import { FiCode, FiMenu, FiX } from 'react-icons/fi';
import { MenuItems } from './MenuItems';

import './navbar.css';

function NavBar() {
  const [active, setActive] = useState(false);

  const handleToggleActive = () => setActive(!active);

  return (
    <nav className="navbar-items">
      <h1 className="navbar-logo">React <FiCode /></h1>
      <div className="menu-icon">
        {
          active ? (
            <FiX onClick={handleToggleActive} />
          ) : (
            <FiMenu onClick={handleToggleActive} />
          )
        }
      </div>
      <ul className={active ? 'nav-menu active' : 'nav-menu'}>
        {MenuItems.map((item, index) => (
          <li key={index}>
            <a href={`${item.url}`} className={item.cName}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;