import React, { useState } from 'react';
import { Calendar, Check, X } from 'lucide-react';
import { format } from 'date-fns';

function Attendance() {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS102', name: 'Data Structures' },
    { id: 'CS201', name: 'Web Development' }
  ];

  const attendanceData = [
    { 
      date: '2024-03-01', 
      subject: 'CS101',
      status: 'present',
      markedBy: 'Dr. Smith',
      notes: 'Class participation noted'
    },
    { 
      date: '2024-03-02', 
      subject: 'CS102',
      status: 'present',
      markedBy: 'Dr. Johnson',
      notes: ''
    },
    { 
      date: '2024-03-03', 
      subject: 'CS101',
      status: 'absent',
      markedBy: 'Dr. Smith',
      notes: 'Medical leave'
    },
    { 
      date: '2024-03-04', 
      subject: 'CS201',
      status: 'present',
      markedBy: 'Prof. Davis',
      notes: ''
    },
    { 
      date: '2024-03-05', 
      subject: 'CS102',
      status: 'present',
      markedBy: 'Dr. Johnson',
      notes: ''
    }
  ];

  const filteredAttendance = selectedSubject === 'all' 
    ? attendanceData 
    : attendanceData.filter(day => day.subject === selectedSubject);

  const calculateAttendancePercentage = (subject: string = 'all') => {
    const relevantData = subject === 'all' 
      ? attendanceData 
      : attendanceData.filter(day => day.subject === subject);
    
    const totalDays = relevantData.length;
    const presentDays = relevantData.filter(day => day.status === 'present').length;
    return totalDays === 0 ? 0 : ((presentDays / totalDays) * 100).toFixed(1);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Attendance Record</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Overall Attendance</h3>
            <p className="text-gray-600">Current Semester</p>
          </div>
          <div className="text-3xl font-bold text-blue-600">
            {calculateAttendancePercentage()}%
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Filter by Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-full md:w-64 p-2 border rounded-lg"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Marked By
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAttendance.map((day, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                    {format(new Date(day.date), 'MMMM d, yyyy')}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subjects.find(s => s.id === day.subject)?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {day.status === 'present' ? (
                    <span className="flex items-center text-green-600">
                      <Check className="w-5 h-5 mr-1" />
                      Present
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <X className="w-5 h-5 mr-1" />
                      Absent
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {day.markedBy}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {day.notes || '-'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Attendance;