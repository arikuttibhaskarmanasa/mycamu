import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Users, Settings, BarChart, Layout } from 'lucide-react';

function AdminPortal() {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Portal</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/admin"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/admin' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Layout className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/admin/users"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/admin/users' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            User Management
          </Link>
          <Link
            to="/admin/settings"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/admin/settings' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Settings className="w-5 h-5 mr-3" />
            System Settings
          </Link>
          <Link
            to="/admin/reports"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/admin/reports' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <BarChart className="w-5 h-5 mr-3" />
            Reports
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<AdminDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/settings" element={<SystemSettings />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Users</h3>
          <p className="text-gray-600">Students: 500 | Faculty: 50</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">System Status</h3>
          <p className="text-gray-600">All systems operational</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Recent Activities</h3>
          <p className="text-gray-600">10 new registrations today</p>
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">User Management</h2>
      {/* Add user management interface */}
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">System Settings</h2>
      {/* Add settings interface */}
    </div>
  );
}

function Reports() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Reports</h2>
      {/* Add reports interface */}
    </div>
  );
}

export default AdminPortal;