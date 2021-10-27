import React, { useState } from "react";
import { FiCode, FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MenuItems } from "./MenuItems";

import styles from "../../styles/components/NavBar.module.scss";
import { Button } from "./ButtonNavBar";
import { useAuth } from "../../context/auth";

function NavBar() {
  const [active, setActive] = useState(false);
  const { signOut } = useAuth();

  const handleToggleActive = () => setActive(!active);

  return (
    <nav className={styles.navbarItems}>
      <h1 className={styles.navbarLogo}>
        React <FiCode />
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
                  to={`${item.url}`}
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
