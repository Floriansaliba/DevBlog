import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './MenuDesktop.scss';
import { useNavigate } from 'react-router-dom';

/**
 * Affiche le menu au format desktop
 */
const MenuDesktop = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div id='menu'>
      <div
        className='menu-links'
        onClick={() => navigate('/')}
        role='button'
        tabIndex='0'
      >
        Accueil
      </div>
      <div
        className='menu-links'
        onClick={() => navigate('/articles')}
        role='button'
        tabIndex='0'
      >
        Articles
      </div>
      <svg
        onClick={() => {
          toggleMenu();
        }}
        id='burger-menu'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 448 512'
        role='button'
        tabIndex='0'
      >
        <path d='M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z' />
      </svg>
      <Navigation menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
    </div>
  );
};

export default MenuDesktop;
