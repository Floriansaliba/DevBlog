/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './Navigation.scss';
import { navigationElements } from '../../utils/navigationElements';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';

const Navigation = ({ menuOpen }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const user = useSelector(selectUser);
  const { connected, isAdmin } = user;

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log(screenWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [screenWidth]);
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
                    <a key={index} href={element.linkTo}>
                      <li>
                        <span>{element.name.toUpperCase()}</span>
                        {element.logo}
                      </li>
                    </a>
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
                    <a key={index} href={element.linkTo}>
                      <li>
                        <span>{element.name.toUpperCase()}</span>
                        {element.logo}
                      </li>
                    </a>
                  ))
              : navigationElements
                  .filter((element) =>
                    element.displayIf.includes('disconnected')
                  )
                  .map((element, index) => (
                    <a key={index} href={element.linkTo}>
                      <li>
                        <span>{element.name.toUpperCase()}</span>
                        {element.logo}
                      </li>
                    </a>
                  ))}
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
                    <a key={index} href={element.linkTo}>
                      <li>
                        <span>{element.name.toUpperCase()}</span>
                        {element.logo}
                      </li>
                    </a>
                  ))
              : connected && isAdmin
              ? navigationElements
                  .filter(
                    (element) =>
                      element.displayIf.includes('connected') &&
                      element.displayIf.includes('admin')
                  )
                  .map((element, index) => (
                    <a key={index} href={element.linkTo}>
                      <li>
                        <span>{element.name.toUpperCase()}</span>
                        {element.logo}
                      </li>
                    </a>
                  ))
              : navigationElements
                  .filter((element) =>
                    element.displayIf.includes('disconnected')
                  )
                  .map((element, index) => (
                    <a key={index} href={element.linkTo}>
                      <li>
                        <span>{element.name.toUpperCase()}</span>
                        {element.logo}
                      </li>
                    </a>
                  ))}
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
