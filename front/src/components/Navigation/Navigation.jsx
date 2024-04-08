/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Navigation.scss';
import { navigationElements } from '../../utils/navigationElements';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { disconnectUser } from '../../store/slices/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Gère l'affichage de la navigation du blog en fonction de la taille d'écran
const Navigation = ({ menuOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userIslogged = useSelector(selectUser).connected;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const user = useSelector(selectUser);
  const { connected, isAdmin } = user;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);

  const logout = () => {
    dispatch(disconnectUser());
    toast.success('Deconnexion reussie');
    navigate('/');
  };

  return (
    <>
      {screenWidth >= 1024 ? (
        <nav id='navigation' style={{ display: menuOpen ? 'block' : 'none' }}>
          <ul>
            {connected && !isAdmin
              ? navigationElements
                  .filter(
                    (element) =>
                      element.displayIf.includes('connected') &&
                      element.displayIf.includes('reader') &&
                      !element.displayIf.includes('mobile')
                  )
                  .map((element, index) => (
                    <li key={index} onClick={() => navigate(element.linkTo)}>
                      <span>{element.name.toUpperCase()}</span>
                      {element.logo}
                    </li>
                  ))
              : connected && isAdmin
              ? navigationElements
                  .filter(
                    (element) =>
                      element.displayIf.includes('connected') &&
                      element.displayIf.includes('admin') &&
                      !element.displayIf.includes('mobile')
                  )
                  .map((element, index) => (
                    <li key={index} onClick={() => navigate(element.linkTo)}>
                      <span>{element.name.toUpperCase()}</span>
                      {element.logo}
                    </li>
                  ))
              : navigationElements
                  .filter((element) =>
                    element.displayIf.includes('disconnected')
                  )
                  .map((element, index) => (
                    <li key={index} onClick={() => navigate(element.linkTo)}>
                      <span>{element.name.toUpperCase()}</span>
                      {element.logo}
                    </li>
                  ))}
            {userIslogged && (
              <li onClick={logout} style={{ cursor: 'pointer' }}>
                <span>DECONNEXION</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path d='M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z' />
                </svg>
              </li>
            )}
          </ul>
        </nav>
      ) : (
        <nav id='navigation' style={{ display: menuOpen ? 'block' : 'none' }}>
          <ul>
            {connected && !isAdmin
              ? navigationElements
                  .filter(
                    (element) =>
                      element.displayIf.includes('connected') &&
                      element.displayIf.includes('reader')
                  )
                  .map((element, index) => (
                    <li key={index} onClick={() => navigate(element.linkTo)}>
                      <span>{element.name.toUpperCase()}</span>
                      {element.logo}
                    </li>
                  ))
              : connected && isAdmin
              ? navigationElements
                  .filter(
                    (element) =>
                      element.displayIf.includes('connected') &&
                      element.displayIf.includes('admin')
                  )
                  .map((element, index) => (
                    <li key={index} onClick={() => navigate(element.linkTo)}>
                      <span>{element.name.toUpperCase()}</span>
                      {element.logo}
                    </li>
                  ))
              : navigationElements
                  .filter((element) =>
                    element.displayIf.includes('disconnected')
                  )
                  .map((element, index) => (
                    <li key={index} onClick={() => navigate(element.linkTo)}>
                      <span>{element.name.toUpperCase()}</span>
                      {element.logo}
                    </li>
                  ))}
            {userIslogged && (
              <li onClick={logout} style={{ cursor: 'pointer' }}>
                <span>DECONNEXION</span>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                  <path d='M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V256c0 17.7 14.3 32 32 32s32-14.3 32-32V32zM143.5 120.6c13.6-11.3 15.4-31.5 4.1-45.1s-31.5-15.4-45.1-4.1C49.7 115.4 16 181.8 16 256c0 132.5 107.5 240 240 240s240-107.5 240-240c0-74.2-33.8-140.6-86.6-184.6c-13.6-11.3-33.8-9.4-45.1 4.1s-9.4 33.8 4.1 45.1c38.9 32.3 63.5 81 63.5 135.4c0 97.2-78.8 176-176 176s-176-78.8-176-176c0-54.4 24.7-103.1 63.5-135.4z' />
                </svg>
              </li>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
