import React, { useState } from 'react';
import { FileText, Upload, Check, X } from 'lucide-react';

function Assignments() {
  const [assignments] = useState([
    {
      id: 1,
      title: 'Data Structures Assignment',
      dueDate: '2024-03-25',
      status: 'pending',
      description: 'Implement a binary search tree with basic operations.'
    },
    {
      id: 2,
      title: 'Web Development Project',
      dueDate: '2024-03-30',
      status: 'submitted',
      description: 'Create a responsive portfolio website using React.'
    }
  ]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Assignments</h2>
      
      <div className="grid gap-6">
        {assignments.map((assignment) => (
          <div key={assignment.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <FileText className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="text-lg font-semibold">{assignment.title}</h3>
                  <p className="text-gray-600 mt-1">{assignment.description}</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Due: {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {assignment.status === 'pending' ? (
                  <button className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit
                  </button>
                ) : (
                  <span className="flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-lg">
                    <Check className="w-4 h-4 mr-2" />
                    Submitted
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Assignments;