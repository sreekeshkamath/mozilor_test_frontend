import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Cookies from 'js-cookie';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {

  return (
      <Router>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        <Route
          path = "/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

          <Route
          path = "/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          } />

        </Routes>
        
      </Router>
  );
}

export default App;
