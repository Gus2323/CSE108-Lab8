import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import StudentView from './Pages/StudentView';
import PrivateRoute from './Components/PrivateRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route
        path="/student"
        element={
          <PrivateRoute>
            <StudentView />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
