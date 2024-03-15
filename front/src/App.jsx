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

function App() {
  return (
    <>
      <Header isAdmin={false} connected={false} />
      <Routes>
        <Route path={'/'} element={<HomePage />} />
        <Route path={'/inscription'} element={<SubscribePage />} />
        <Route path={'/connexion'} element={<LoginPage />} />
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
        <Route path={'/*'} element={<Page404 />} />
      </Routes>
    </>
  );
}

export default App;
