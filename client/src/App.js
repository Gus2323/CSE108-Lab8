import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import StudentView from './Pages/StudentView';
import Signup from './Pages/Signup';
// import TeacherView from './Pages/TeacherView';
// import AdminView from './Pages/AdminView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student" element={<StudentView />} />
        {/* <Route path="/teacher" element={<TeacherView />} />
        <Route path="/admin" element={<AdminView />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
