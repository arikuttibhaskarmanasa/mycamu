import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Book, Calendar, Code, FileText, Layout, GraduationCap } from 'lucide-react';
import CodeEditor from '../student/CodeEditor';
import Assignments from '../student/Assignments';
import Attendance from '../student/Attendance';
import CourseRegistration from '../student/CourseRegistration';
import TeachingContent from '../student/TeachingContent';
import ChatAI from '../ChatAI';

function StudentPortal() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const handleCardClick = (path: string) => {
    navigate(path);
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Student Portal</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/student"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/student' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Layout className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/student/courses"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/student/courses' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <GraduationCap className="w-5 h-5 mr-3" />
            Course Registration
          </Link>
          <Link
            to="/student/materials"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/student/materials' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Book className="w-5 h-5 mr-3" />
            Teaching Materials
          </Link>
          <Link
            to="/student/coding"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/student/coding' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Code className="w-5 h-5 mr-3" />
            Coding Platform
          </Link>
          <Link
            to="/student/assignments"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/student/assignments' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <FileText className="w-5 h-5 mr-3" />
            Assignments
          </Link>
          <Link
            to="/student/attendance"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/student/attendance' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Attendance
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<StudentDashboard onCardClick={handleCardClick} />} />
          <Route path="/courses" element={<CourseRegistration />} />
          <Route path="/materials" element={<TeachingContent />} />
          <Route path="/coding" element={<CodeEditor />} />
          <Route path="/assignments" element={<Assignments />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
        <ChatAI />
      </div>
    </div>
  );
}

interface DashboardCardProps {
  title: string;
  value: string;
  path: string;
  onClick: (path: string) => void;
}

function DashboardCard({ title, value, path, onClick }: DashboardCardProps) {
  return (
    <div
      onClick={() => onClick(path)}
      className="bg-white p-6 rounded-lg shadow cursor-pointer transform transition-transform hover:scale-105"
    >
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}

function StudentDashboard({ onCardClick }: { onCardClick: (path: string) => void }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Registered Courses"
          value="3 courses this semester"
          path="/student/courses"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Recent Assignments"
          value="2 pending assignments"
          path="/student/assignments"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Attendance"
          value="Current attendance: 85%"
          path="/student/attendance"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Latest Results"
          value="Last test score: 92/100"
          path="/student/assignments"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Upcoming Classes"
          value="Next: Data Structures at 10:00 AM"
          path="/student/courses"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Coding Progress"
          value="5 challenges completed"
          path="/student/coding"
          onClick={onCardClick}
        />
      </div>
    </div>
  );
}

export default StudentPortal;