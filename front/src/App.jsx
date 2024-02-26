import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';

function App() {
  return (
    <>
      <Routes>
        <Route
          path={'/'}
          element={<Header isAdmin={true} connected={true} />}
        />
      </Routes>
    </>
  );
}

export default App;
