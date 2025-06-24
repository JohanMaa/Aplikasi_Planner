import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const CONFIG = {
  DAYS: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
  PRIORITIES: ['High', 'Medium', 'Low'],
  CATEGORIES: ['Assignment', 'Exam', 'Project'],
  COLORS: [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
  ],
  BORDER_COLORS: [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ],
};

const AccountPage = ({ tasks = [], courses = [] }) => {
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser
        ? JSON.parse(savedUser)
        : { name: 'John Doe', email: 'john.doe@example.com' };
    } catch {
      return { name: 'John Doe', email: 'john.doe@example.com' };
    }
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch {
      console.error('Failed to save user to localStorage');
    }
  }, [user]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const completedTasks = useMemo(() => tasks.filter((task) => task.completed).length, [tasks]);
  const pendingTasks = useMemo(() => tasks.filter((task) => !task.completed).length, [tasks]);

  const completedByDay = useMemo(() => {
    const counts = CONFIG.DAYS.reduce((acc, _, index) => ({ ...acc, [index]: 0 }), {});
    tasks
      .filter((task) => task.completed && task.date)
      .forEach((task) => {
        const date = new Date(task.date);
        if (!isNaN(date.getTime())) {
          const dayIndex = date.getDay();
          counts[dayIndex] += 1;
        }
      });
    return counts;
  }, [tasks]);

  const maxTasksPerDay = Math.max(...Object.values(completedByDay), 1);

  const barData = {
    labels: CONFIG.DAYS,
    datasets: [
      {
        label: 'Completed Tasks per Day',
        data: Object.values(completedByDay),
        backgroundColor: CONFIG.COLORS[1],
        borderColor: CONFIG.BORDER_COLORS[1],
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: { display: true, text: 'Number of Tasks' },
        min: 0,
        max: Math.ceil(maxTasksPerDay * 1.2),
        ticks: { stepSize: 1, callback: (value) => Number.isInteger(value) ? value : null },
      },
      x: { title: { display: true, text: 'Day' } },
    },
  };

  const today = new Date();
  const getDaysDifference = (date) => {
    try {
      const taskDate = new Date(date);
      if (isNaN(taskDate.getTime())) return Infinity;
      const diffTime = taskDate - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch {
      return Infinity;
    }
  };

  const filteredPendingTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (task.completed) return false;
      const daysDiff = getDaysDifference(task.date);
      if (filter === '7days') return daysDiff <= 7;
      if (filter === '30days') return daysDiff <= 30;
      return true;
    });
  }, [tasks, filter]);

  const pieCategories = useMemo(() => {
    const categories = { today: 0, tomorrow: 0, next7days: 0, next30days: 0, beyond30days: 0 };
    filteredPendingTasks.forEach((task) => {
      const daysDiff = getDaysDifference(task.date);
      if (daysDiff <= 0) categories.today += 1;
      else if (daysDiff === 1) categories.tomorrow += 1;
      else if (daysDiff <= 7) categories.next7days += 1;
      else if (daysDiff <= 30) categories.next30days += 1;
      else categories.beyond30days += 1;
    });
    return categories;
  }, [filteredPendingTasks]);

  const pieData = {
    labels: ['Today', 'Tomorrow', 'Next 7 Days', 'Next 30 Days', 'Beyond 30 Days'],
    datasets: [
      {
        data: Object.values(pieCategories),
        backgroundColor: CONFIG.COLORS.slice(0, 5),
        borderColor: CONFIG.BORDER_COLORS.slice(0, 5),
        borderWidth: 1,
      },
    ],
  };

  const tasksByCourse = useMemo(() => {
    return courses.reduce((acc, course) => {
      acc[course.id] = tasks.filter((task) => task.courseId === course.id).length;
      return acc;
    }, {});
  }, [tasks, courses]);

  const pieCoursesData = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        data: Object.values(tasksByCourse),
        backgroundColor: CONFIG.COLORS.slice(0, courses.length),
        borderColor: CONFIG.BORDER_COLORS.slice(0, courses.length),
        borderWidth: 1,
      },
    ],
  };

  const tasksByPriority = useMemo(() => {
    return CONFIG.PRIORITIES.reduce((acc, priority) => {
      acc[priority] = tasks.filter((task) => task.priority === priority).length;
      return acc;
    }, {});
  }, [tasks]);

  const piePriorityData = {
    labels: CONFIG.PRIORITIES,
    datasets: [
      {
        data: Object.values(tasksByPriority),
        backgroundColor: CONFIG.COLORS.slice(0, 3),
        borderColor: CONFIG.BORDER_COLORS.slice(0, 3),
        borderWidth: 1,
      },
    ],
  };

  const tasksByCategory = useMemo(() => {
    return CONFIG.CATEGORIES.reduce((acc, category) => {
      acc[category] = tasks.filter((task) => task.category === category).length;
      return acc;
    }, {});
  }, [tasks]);

  const pieCategoryData = {
    labels: CONFIG.CATEGORIES,
    datasets: [
      {
        data: Object.values(tasksByCategory),
        backgroundColor: CONFIG.COLORS.slice(0, 3),
        borderColor: CONFIG.BORDER_COLORS.slice(0, 3),
        borderWidth: 1,
      },
    ],
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      showNotification('Name cannot be empty', 'error');
      return;
    }
    if (!editEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
      showNotification('Invalid email format', 'error');
      return;
    }
    setUser({ name: editName, email: editEmail });
    setIsEditModalOpen(false);
    showNotification('Profile updated successfully', 'success');
  };

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
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

      {/* Profile */}
      <div className="mb-8 text-center">
        <div
          className="w-24 h-24 bg-blue-500 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold shadow-md"
          aria-label={`Profile initial: ${user.name[0]}`}
        >
          {user.name[0]}
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mt-3">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
        <button
          onClick={() => {
            setEditName(user.name);
            setEditEmail(user.email);
            setIsEditModalOpen(true);
          }}
          className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          aria-label="Edit profile"
        >
          Edit Profile
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profile</h3>
            <form onSubmit={handleEditProfile} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Name"
              />
              <input
                type="email"
                placeholder="Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Email"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label="Save"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Task Summary */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Task Summary</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-gray-600 mt-1">Completed Tasks</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-3xl font-bold text-red-500">{pendingTasks}</p>
            <p className="text-gray-600 mt-1">Pending Tasks</p>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Daily Completed Tasks</h3>
        {Object.values(completedByDay).every((count) => count === 0) ? (
          <p className="text-gray-500 italic">No completed tasks data available.</p>
        ) : (
          <div className="bg-white p-5 rounded-xl shadow">
            <Bar data={barData} options={barOptions} height={200} />
          </div>
        )}
      </div>

      {/* Pie Chart (Time) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Pending Tasks Classification</h3>
        <div className="flex gap-2 mb-4 flex-wrap">
          {['7days', '30days', 'all'].map((option) => (
            <button
              key={option}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full transition ${
                filter === option
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
              aria-label={`Filter by ${option === '7days' ? '7 days' : option === '30days' ? '30 days' : 'all'}`}
            >
              {option === '7days' ? '7 Days' : option === '30days' ? '30 Days' : 'All'}
            </button>
          ))}
        </div>
        {filteredPendingTasks.length === 0 ? (
          <p className="text-gray-500 italic">No pending tasks to display.</p>
        ) : (
          <div className="bg-white p-5 rounded-xl shadow">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
          </div>
        )}
      </div>

      {/* Pie Chart (Courses) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tasks per Course</h3>
        {courses.length === 0 ? (
          <p className="text-gray-500 italic">No courses available.</p>
        ) : (
          <div className="bg-white p-5 rounded-xl shadow">
            <Pie
              data={pieCoursesData}
              options={{ responsive: true, maintainAspectRatio: false }}
              height={200}
            />
          </div>
        )}
      </div>

      {/* Pie Chart (Priority) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tasks per Priority</h3>
        <div className="bg-white p-5 rounded-xl shadow">
          <Pie
            data={piePriorityData}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={200}
          />
        </div>
      </div>

      {/* Pie Chart (Category) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Tasks per Category</h3>
        <div className="bg-white p-5 rounded-xl shadow">
          <Pie
            data={pieCategoryData}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

AccountPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      courseId: PropTypes.number,
      priority: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    })
  ),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
};

AccountPage.defaultProps = {
  tasks: [],
  courses: [],
};

export default AccountPage;