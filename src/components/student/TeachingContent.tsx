import React, { useState } from 'react';
import { FileText, Download } from 'lucide-react';

function TeachingContent() {
  const [selectedSubject, setSelectedSubject] = useState('all');

  const subjects = [
    { id: 'all', name: 'All Subjects' },
    { id: 'CS101', name: 'Introduction to Programming' },
    { id: 'CS102', name: 'Data Structures' },
    { id: 'CS201', name: 'Web Development' }
  ];

  const content = [
    {
      id: 1,
      title: 'Introduction to Arrays',
      description: 'Basic concepts and operations on arrays',
      date: '2024-03-20',
      subject: 'CS101',
      fileName: 'arrays_intro.pdf',
      uploadedBy: 'Dr. Smith'
    },
    {
      id: 2,
      title: 'Linked Lists Implementation',
      description: 'Detailed guide on implementing linked lists',
      date: '2024-03-21',
      subject: 'CS102',
      fileName: 'linked_lists.pdf',
      uploadedBy: 'Dr. Johnson'
    }
  ];

  const filteredContent = selectedSubject === 'all'
    ? content
    : content.filter(item => item.subject === selectedSubject);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Teaching Materials</h2>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Available Content</h3>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="w-64 p-2 border rounded-lg"
          >
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-4">
          {filteredContent.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-semibold">{item.title}</h4>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                  <div className="mt-2 space-x-4">
                    <span className="text-sm text-gray-500">
                      Subject: {subjects.find(s => s.id === item.subject)?.name}
                    </span>
                    <span className="text-sm text-gray-500">
                      Uploaded by: {item.uploadedBy}
                    </span>
                    <span className="text-sm text-gray-500">
                      Date: {item.date}
                    </span>
                  </div>
                </div>
                <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TeachingContent;