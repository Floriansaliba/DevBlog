import { useState } from 'react';
import Navigation from '../Navigation/Navigation';
import './MenuMobile.scss';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';

const MenuMobile = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const user = useSelector(selectUser);
  const { connected, isAdmin } = user;
  /**
   * This function toggles the menu open and closed.
   */
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
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
      <Navigation connected={connected} isAdmin={isAdmin} menuOpen={menuOpen} />
    </div>
  );
};

export default MenuMobile;
