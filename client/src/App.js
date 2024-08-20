import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomeHeader from "./components/HomeHeader.component";
import LoginNav from "./components/LoginNav.component";
import TakeTest from "./components/TakeTest.component";
import Login from "./components/LoginRegister.component";
import Dashboard from "./components/Dashboard.component";
import TestResult from "./components/TestResult.component";
import Question from "./components/Question.component";
import { AuthProvider, useAuth } from './context/AuthContext'; // Adjust the path as necessary

function AppRoutes() {
  const { loggedIn, setLoggedIn } = useAuth();
  const location = useLocation();
  
  return (
    <React.Fragment>
      <nav>
        {location.pathname !== "/test" && (
          loggedIn ? (
            <LoginNav setLoggedIn={setLoggedIn} />
          ) : (
            <HomeHeader setLoggedIn={setLoggedIn} />
          )
        )}
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<TakeTest />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />
          <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/abouttest" element={<TestResult />} />
          <Route path="/test" element={<Question />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </React.Fragment>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
