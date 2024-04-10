import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types

/**
 *
 * Vérifie si l'utilisateur est administrateur ou non, afin d'acceder ou non aux routes protegées
 * Redirige vers la page d'accueil si l'utilisateur n'est pas authorisé
 */
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
          .get('http://localhost:3000/adminAccess', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              setIsAuthorized(true);
            } else {
              localStorage.removeItem('token');
              toast.error('Accès non authorisé');
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
