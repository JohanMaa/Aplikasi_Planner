import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import PropTypes from 'prop-types';

const TaskDetailPage = ({ tasks = [], setTasks, courses = [] }) => {
  const { state } = useLocation();
  const { task } = state || {};
  const navigate = useNavigate();
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  if (!task) {
    return (
      <div className="p-4 text-center text-gray-500" aria-live="polite">
        Task not found.
      </div>
    );
  }

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleToggleComplete = () => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
    showNotification(task.completed ? 'Task marked as incomplete' : 'Task marked as complete', 'success');
  };

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-[999] ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
          role="alert"
          aria-live="polite"
        >
          {notification.message}
        </div>
      )}

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition mb-6"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-sm" />
        Back
      </button>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Details</h2>

      {/* Detail Card */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
        <div>
          <p className="text-gray-600 text-sm">Agenda</p>
          <p className="text-lg font-semibold text-gray-800">{task.agenda}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Deadline</p>
          <p className="text-base text-gray-700">Date: {task.date}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Type</p>
          <p className="text-base text-gray-700">
            {task.type === 'General' ? 'General' : getCourseName(task.courseId)}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Priority</p>
          <p className="text-base text-gray-700">{task.priority}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Category</p>
          <p className="text-base text-gray-700">{task.category}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Status</p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="w-5 h-5 text-blue-500 accent-blue-500"
              aria-label={`Mark ${task.agenda} as ${task.completed ? 'incomplete' : 'complete'}`}
            />
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full ${
                task.completed
                  ? 'text-green-700 bg-green-100'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              {task.completed ? 'Completed' : 'Pending'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

TaskDetailPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      agenda: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      courseId: PropTypes.number,
      type: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TaskDetailPage;