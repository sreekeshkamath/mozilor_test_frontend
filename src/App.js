import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import ProtectedRoute from './pages/ProtectedRoute';

function App() {

  return (
      <Router>
        <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
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
