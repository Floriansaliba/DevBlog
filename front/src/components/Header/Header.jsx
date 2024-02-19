/* eslint-disable react/prop-types */
import './Header.scss';
import logo from './../../assets/images/logo_mobile.png';
import { useState } from 'react';

const Header = ({ connected, isAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  /**
   * This function toggles the menu open and closed.
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header id='header'>
      <img id='logo' src={logo} alt='Logo de DevBlog' />
      <div id='menu'>
        <svg
          onClick={() => {
            toggleMenu();
          }}
          id='burger-menu'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 448 512'
        >
          <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
        </svg>
      </div>

      <nav id='navigation' style={{ display: menuOpen ? 'block' : 'none' }}>
        <ul>
          {connected ? (
            <>
              <a href='/'>
                <li>ACCUEIL</li>
              </a>
              <a href='/articles'>
                <li>ARTICLES</li>
              </a>
              <a href='/profile'>
                <li>PROFILE</li>
              </a>
              {isAdmin ? (
                <>
                  <a href='/dashboard'>
                    <li>DASHBOARD</li>
                  </a>
                  <a href='/nouvel-article'>
                    <li>NOUVEL ARTICLE</li>
                  </a>
                </>
              ) : (
                <>
                  <a href='/selection'>
                    <li>MA SELECTION</li>
                  </a>
                  <a href='/deconnexion'>
                    <li>DECONNEXION</li>
                  </a>
                </>
              )}
            </>
          ) : (
            <>
              <a href='/'>
                <li>ACCUEIL</li>
              </a>
              <a href='/articles'>
                <li>ARTICLES</li>
              </a>
              <a href='/inscription'>
                <li>INSCRIPTION</li>
              </a>
              <a href='/connexion'>
                <li>CONNEXION</li>
              </a>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
