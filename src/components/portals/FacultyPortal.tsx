import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Users, Calendar, FileText, Layout, BookOpen, Check, X, Upload, Trash2 } from 'lucide-react';
import ChatAI from '../ChatAI';

function FacultyPortal() {
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
          <h2 className="text-2xl font-bold text-gray-800">Faculty Portal</h2>
        </div>
        <nav className="mt-6">
          <Link
            to="/faculty"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/faculty' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Layout className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            to="/faculty/attendance"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/faculty/attendance' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Calendar className="w-5 h-5 mr-3" />
            Mark Attendance
          </Link>
          <Link
            to="/faculty/content"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/faculty/content' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <BookOpen className="w-5 h-5 mr-3" />
            Teaching Content
          </Link>
          <Link
            to="/faculty/progress"
            className={`flex items-center px-6 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 ${
              location.pathname === '/faculty/progress' ? 'bg-blue-50 text-blue-600' : ''
            }`}
          >
            <Users className="w-5 h-5 mr-3" />
            Student Progress
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<FacultyDashboard onCardClick={handleCardClick} />} />
          <Route path="/attendance" element={<MarkAttendance />} />
          <Route path="/content" element={<TeachingContent />} />
          <Route path="/progress" element={<StudentProgress />} />
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

function FacultyDashboard({ onCardClick }: { onCardClick: (path: string) => void }) {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Faculty Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          title="Today's Classes"
          value="3 classes scheduled"
          path="/faculty/attendance"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Pending Reviews"
          value="5 assignments to review"
          path="/faculty/progress"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Teaching Content"
          value="2 new materials uploaded"
          path="/faculty/content"
          onClick={onCardClick}
        />
        <DashboardCard
          title="Student Performance"
          value="Class average: 78%"
          path="/faculty/progress"
          onClick={onCardClick}
        />
      </div>
    </div>
  );
}

function MarkAttendance() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const classes = [
    { id: 'CS-A', name: 'Computer Science A' },
    { id: 'CS-B', name: 'Computer Science B' },
    { id: 'IT-A', name: 'Information Technology A' }
  ];

  const subjects = [
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS102', name: 'Data Structures' },
    { id: 'CS201', name: 'Web Development' }
  ];

  const students = {
    'CS-A': [
      { id: '1', name: 'John Doe', rollNo: 'CS2021001' },
      { id: '2', name: 'Jane Smith', rollNo: 'CS2021002' },
      { id: '3', name: 'Mike Johnson', rollNo: 'CS2021003' }
    ],
    'CS-B': [
      { id: '4', name: 'Sarah Wilson', rollNo: 'CS2021004' },
      { id: '5', name: 'Tom Brown', rollNo: 'CS2021005' },
      { id: '6', name: 'Emily Davis', rollNo: 'CS2021006' }
    ],
    'IT-A': [
      { id: '7', name: 'Alex Turner', rollNo: 'IT2021001' },
      { id: '8', name: 'Lisa Anderson', rollNo: 'IT2021002' },
      { id: '9', name: 'Chris Martin', rollNo: 'IT2021003' }
    ]
  };

  const [attendance, setAttendance] = useState<Record<string, boolean>>({});

  const handleAttendanceChange = (studentId: string, isPresent: boolean) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: isPresent
    }));
  };

  const handleSubmit = () => {
    // Here you would typically save the attendance data
    console.log('Saving attendance for:', { selectedClass, selectedSubject, selectedDate, attendance });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Mark Attendance</h2>
      
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select a class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full p-2 border rounded-lg"
            />
          </div>
        </div>

        {selectedClass && selectedSubject && (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Roll No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Attendance
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {students[selectedClass as keyof typeof students].map((student) => (
                    <tr key={student.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.rollNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleAttendanceChange(student.id, true)}
                            className={`px-3 py-1 rounded-lg flex items-center ${
                              attendance[student.id] === true
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Present
                          </button>
                          <button
                            onClick={() => handleAttendanceChange(student.id, false)}
                            className={`px-3 py-1 rounded-lg flex items-center ${
                              attendance[student.id] === false
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Absent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Save Attendance
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function TeachingContent() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [contentTitle, setContentTitle] = useState('');
  const [contentDescription, setContentDescription] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const classes = [
    { id: 'CS-A', name: 'Computer Science A' },
    { id: 'CS-B', name: 'Computer Science B' },
    { id: 'IT-A', name: 'Information Technology A' }
  ];

  const subjects = [
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS102', name: 'Data Structures' },
    { id: 'CS201', name: 'Web Development' }
  ];

  const [uploadedContent] = useState([
    {
      id: 1,
      title: 'Introduction to Arrays',
      description: 'Basic concepts and operations on arrays',
      date: '2024-03-20',
      class: 'CS-A',
      subject: 'CS101',
      fileName: 'arrays_intro.pdf'
    },
    {
      id: 2,
      title: 'Linked Lists Implementation',
      description: 'Detailed guide on implementing linked lists',
      date: '2024-03-21',
      class: 'CS-A',
      subject: 'CS102',
      fileName: 'linked_lists.pdf'
    }
  ]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    // Here you would typically handle the file upload to a server
    console.log('Uploading:', {
      class: selectedClass,
      subject: selectedSubject,
      title: contentTitle,
      description: contentDescription,
      file: selectedFile
    });

    // Reset form
    setContentTitle('');
    setContentDescription('');
    setSelectedFile(null);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Teaching Content</h2>

      {/* Upload Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Upload New Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Class
            </label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select a class</option>
              {classes.map(cls => (
                <option key={cls.id} value={cls.id}>
                  {cls.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Subject
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content Title
          </label>
          <input
            type="text"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter content title"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            value={contentDescription}
            onChange={(e) => setContentDescription(e.target.value)}
            className="w-full p-2 border rounded-lg"
            rows={3}
            placeholder="Enter content description"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        <button
          onClick={handleUpload}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Content
        </button>
      </div>

      {/* Content List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4">Uploaded Content</h3>
        <div className="space-y-4">
          {uploadedContent.map((content) => (
            <div key={content.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold">{content.title}</h4>
                  <p className="text-gray-600 mt-1">{content.description}</p>
                  <div className="mt-2 space-x-4">
                    <span className="text-sm text-gray-500">
                      Class: {classes.find(c => c.id === content.class)?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Subject: {subjects.find(s => s.id === content.subject)?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Date: {content.date}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StudentProgress() {
  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-6">Student Progress Tracking</h2>
      {/* Add progress tracking interface */}
    </div>
  );
}

export default FacultyPortal;