import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import StudentPortal from './components/portals/StudentPortal';
import FacultyPortal from './components/portals/FacultyPortal';
import AdminPortal from './components/portals/AdminPortal';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/student/*" element={<StudentPortal />} />
            <Route path="/faculty/*" element={<FacultyPortal />} />
            <Route path="/admin/*" element={<AdminPortal />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;