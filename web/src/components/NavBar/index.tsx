import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

import { MenuItems } from "./MenuItems";

import LogoIMG from '../../assets/logo.png';

import styles from "./styles.module.scss";

import { useAuth } from "../../context/auth";

const NavBar: React.FC = () => {
  const [active, setActive] = useState(false);
  const { signOut, ngo } = useAuth();

  const handleToggleActive = () => setActive(!active);

  return (
    <nav className={styles.navbarItems}>
      <h1 className={styles.navbarLogo}>
        <img src={LogoIMG} alt="e-voluir" />
      </h1>
      <div className={styles.menuIcon}>
        {active ? (
          <FiX onClick={handleToggleActive} />
        ) : (
          <FiMenu onClick={handleToggleActive} />
        )}
      </div>
      <ul className={active ? styles.navMenuActive : styles.navMenu}>
        {MenuItems.map((item, index) => {
          return (
            <li key={index}>
              {item.title === "LogOut" ? (
                <Link
                  to="#"
                  onClick={signOut}
                  className={
                    item.cName === "navLinks"
                      ? styles.navLinks
                      : styles.navLinksMobile
                  }
                >
                  {item.title}
                </Link>
              ) : (
                <Link
                  hidden={item.title === 'Meus dados' && !ngo}
                  to={item.title === 'Meus dados' ? `ngos/account/${ngo?.id}` : `${item.url}`}
                  className={
                    item.cName === "navLinks"
                      ? styles.navLinks
                      : styles.navLinksMobile
                  }
                >
                  {item.title}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export default NavBar;
