/* eslint-disable react/prop-types */
import './Header.scss';
import logoMobile from './../../assets/images/logo_mobile.png';
import logo from './../../assets/images/logo.png';
import { useEffect, useState } from 'react';
import MenuMobile from '../MenuMobile/MenuMobile';
import MenuDesktop from '../MenuDesktop/MenuDesktop';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useSelector } from 'react-redux';

const Header = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const user = useSelector(selectUser);
  const { connected, isAdmin } = user;
  console.log(connected, isAdmin);

  useEffect(() => {
    /**
     * Une fonction qui gère l'événement de redimensionnement et met à jour le state avec la largeur de l'écran.
     *
     */
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  return (
    <header id='header'>
      <img
        id='logo'
        src={screenWidth >= 1024 ? logo : logoMobile}
        alt='Logo de DevBlog'
      />
      {screenWidth < 1024 ? <MenuMobile /> : <MenuDesktop />}
    </header>
  );
};

export default Header;
