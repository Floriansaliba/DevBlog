/* eslint-disable react/prop-types */
import './Header.scss';
import logoMobile from './../../assets/images/logo_mobile.png';
import logo from './../../assets/images/logo.png';
import { useEffect, useState } from 'react';
import MenuMobile from '../MenuMobile/MenuMobile';
import MenuDesktop from '../MenuDesktop/MenuDesktop';

const Header = ({ connected, isAdmin }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
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
      {screenWidth < 1024 ? (
        <MenuMobile connected={connected} isAdmin={isAdmin} />
      ) : (
        <MenuDesktop connected={connected} isAdmin={isAdmin} />
      )}
    </header>
  );
};

export default Header;
