import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { GraduationCap, Users, ShieldCheck } from 'lucide-react';

function Login() {
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      id: '1',
      name: username,
      role: role
    });
    navigate(`/${role}`);
  };

  const handleForgotPassword = () => {
    // In a real application, this would trigger a password reset flow
    alert('Password reset link will be sent to your registered email.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Educational Portal Login
          </h2>
        </div>
        
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setRole('student')}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              role === 'student' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <GraduationCap size={24} />
            <span className="mt-2">Student</span>
          </button>
          <button
            onClick={() => setRole('faculty')}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              role === 'faculty' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <Users size={24} />
            <span className="mt-2">Faculty</span>
          </button>
          <button
            onClick={() => setRole('admin')}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              role === 'admin' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            <ShieldCheck size={24} />
            <span className="mt-2">Admin</span>
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <button
                type="button"
                onClick={handleForgotPassword}
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </button>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;