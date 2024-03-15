import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const userEmail = useSelector(selectUser)?.profil?.email;
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }

    const checkAuth = async () => {
      try {
        await axios
          .post('http://localhost:3000/checkAuth', {
            email: userEmail,
            token: token,
          })
          .then((res) => {
            if (res.status === 200 && res.data === 'Token valide') {
              setIsAuthorized(true);
            } else {
              localStorage.removeItem('token');
              navigate('/');
            }
          });
      } catch (err) {
        console.log(err);
        navigate('/');
      }
    };
    checkAuth();
  }, [userEmail, token, navigate]);

  return isAuthorized ? children : null;
};

export default ProtectedRoute;
