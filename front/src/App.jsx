import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import { HomePage } from './pages/HomePage/HomePage';
import SubscribePage from './pages/SubscribePage/SubscribePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ArticlesPage from './pages/ArticlesPage/ArticlesPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Page404 from './pages/Page404/Page404';
import NewArticleForm from './components/NewArticleForm.jsx/NewArticleForm';
import SingleArticlePage from './pages/SingleArticlePage/SingleArticlePage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MySelectionPage from './pages/MySelectionPage/MySelectionPage';

// Affiche le Header, le composant permettant de déclencher des toast messages auprès de l'utilisateur, et les pages selon la route concernée
function App() {
  return (
    <>
      <Header isAdmin={false} connected={false} />
      <ToastContainer
        position='bottom-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition:Bounce
      />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/inscription'} element={<SubscribePage />} />
        <Route path={'/connexion'} element={<LoginPage />} />
        <Route path={'/profile'} element={<ProfilePage />} />
        <Route path={'/articles'} element={<ArticlesPage />} />
        <Route path={'/articles/:id'} element={<SingleArticlePage />} />
        <Route
          path={'/dashboard'}
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route path={'/nouvel-article'} element={<NewArticleForm />} />
        <Route path={'/selection'} element={<MySelectionPage />} />
        <Route path={'/*'} element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
