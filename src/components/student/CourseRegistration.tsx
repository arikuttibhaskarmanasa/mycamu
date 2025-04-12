import React, { useState } from 'react';
import { Book, Check, Plus } from 'lucide-react';

interface Course {
  id: string;
  code: string;
  name: string;
  credits: number;
  description: string;
  semester: number;
}

function CourseRegistration() {
  const [availableCourses] = useState<Course[]>([
    {
      id: '1',
      code: 'CS101',
      name: 'Introduction to Programming',
      credits: 3,
      description: 'Basic concepts of programming using Python',
      semester: 1
    },
    {
      id: '2',
      code: 'CS102',
      name: 'Data Structures',
      credits: 4,
      description: 'Fundamental data structures and algorithms',
      semester: 2
    },
    {
      id: '3',
      code: 'CS201',
      name: 'Web Development',
      credits: 3,
      description: 'Modern web development technologies',
      semester: 2
    }
  ]);

  const [registeredCourses, setRegisteredCourses] = useState<string[]>([]);

  const handleRegister = (courseId: string) => {
    if (!registeredCourses.includes(courseId)) {
      setRegisteredCourses([...registeredCourses, courseId]);
    }
  };

  return (
    <div className="p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Course Registration</h2>
        <p className="text-gray-600 mt-2">Select courses for the upcoming semester</p>
      </div>

      <div className="grid gap-6">
        {availableCourses.map((course) => (
          <div key={course.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Book className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{course.name}</h3>
                  <p className="text-sm text-gray-500">Course Code: {course.code}</p>
                  <p className="text-gray-600 mt-2">{course.description}</p>
                  <div className="mt-2 flex items-center space-x-4">
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      {course.credits} Credits
                    </span>
                    <span className="text-sm bg-gray-100 px-2 py-1 rounded">
                      Semester {course.semester}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRegister(course.id)}
                disabled={registeredCourses.includes(course.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  registeredCourses.includes(course.id)
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                {registeredCourses.includes(course.id) ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Registered
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Register
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {registeredCourses.length > 0 && (
        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Registration Summary</h3>
          <p className="text-gray-600">
            Total Courses Registered: {registeredCourses.length}
          </p>
          <p className="text-gray-600">
            Total Credits: {
              availableCourses
                .filter(course => registeredCourses.includes(course.id))
                .reduce((sum, course) => sum + course.credits, 0)
            }
          </p>
        </div>
      )}
    </div>
  );
}

export default CourseRegistration;