import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import StudentView from './Pages/StudentView';
import Signup from './Pages/Signup';
// import TeacherView from './Pages/TeacherView';
// import AdminView from './Pages/AdminView';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
