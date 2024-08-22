import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TestPage from './components/TestPage';
import MCQTestPage from './components/MCQTestPage';
import FinishTestPage from './components/FinishTestPage';

// Function to check if the token is valid
const checkTokenValidity = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return false;

  // You can add more token validation logic here (e.g., checking token expiration)
  // For example, decode the token and check its expiry date
  // const decodedToken = jwtDecode(token);
  // return decodedToken.exp > Date.now() / 1000;

  return true; // Assuming the token is valid for simplicity
};

const App = () => {
  const isAuthenticated = checkTokenValidity();

  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/test" />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/test"
          element={isAuthenticated ? <TestPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/mcq-test"
          element={isAuthenticated ? <MCQTestPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/finish-test"
          element={isAuthenticated ? <FinishTestPage /> : <Navigate to="/login" />}
        />

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to={isAuthenticated ? "/test" : "/login"} />} />
      </Routes>
    </div>
  );
};

export default App;
