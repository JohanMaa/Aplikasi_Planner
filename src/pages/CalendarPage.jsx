import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CATEGORIES = {
  General: ['Pribadi', 'Kerja', 'Lainnya'],
  Course: ['Tugas', 'Ujian', 'Proyek'],
};

const CalendarPage = ({ tasks = [], courses = [] }) => {
  const [date, setDate] = useState(new Date());
  const [filters, setFilters] = useState({
    type: '',
    course: '',
    priority: '',
    category: '',
  });
  const navigate = useNavigate();

  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (task.completed) return false;
      if (filters.type && task.type !== filters.type) return false;
      if (filters.course && task.courseId !== parseInt(filters.course)) return false;
      if (filters.priority && task.priority !== filters.priority) return false;
      if (filters.category && task.category !== filters.category) return false;
      return true;
    });
  }, [tasks, filters]);

  const tileContent = ({ date: tileDate, view }) => {
    if (view === 'month') {
      const hasTask = pendingTasks.some((task) => {
        const taskDate = new Date(task.date);
        return (
          taskDate.getFullYear() === tileDate.getFullYear() &&
          taskDate.getMonth() === tileDate.getMonth() &&
          taskDate.getDate() === tileDate.getDate()
        );
      });
      return hasTask ? (
        <div className="flex justify-center mt-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full" />
        </div>
      ) : null;
    }
    return null;
  };

  const handleTaskClick = (task) => {
    navigate(`/task/${task.id}`, { state: { task } });
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown Course';
  };

  const resetFilters = () => {
    setFilters({ type: '', course: '', priority: '', category: '' });
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Calendar</h2>

      {/* Filter */}
      <div className="mb-6 bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="typeFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Type
            </label>
            <select
              id="typeFilter"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white shadow-sm"
              aria-label="Filter by type"
            >
              <option value="">All Types</option>
              <option value="General">General</option>
              <option value="Course">Course</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="courseFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Course
            </label>
            <select
              id="courseFilter"
              value={filters.course}
              onChange={(e) => handleFilterChange('course', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white shadow-sm"
              disabled={filters.type === 'General' || courses.length === 0}
              aria-label="Filter by course"
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.name} ({course.code})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="priorityFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Priority
            </label>
            <select
              id="priorityFilter"
              value={filters.priority}
              onChange={(e) => handleFilterChange('priority', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white shadow-sm"
              aria-label="Filter by priority"
            >
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="categoryFilter"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Category
            </label>
            <select
              id="categoryFilter"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all bg-white shadow-sm"
              aria-label="Filter by category"
            >
              <option value="">All Categories</option>
              {CATEGORIES[filters.type] &&
                CATEGORIES[filters.type].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <button
          onClick={resetFilters}
          className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all w-full sm:w-auto"
          aria-label="Reset all filters"
        >
          Reset Filters
        </button>
      </div>

      {/* Calendar */}
      <div className="mb-8">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            className="react-calendar w-full p-4"
            aria-label="Task calendar"
          />
        </div>
      </div>

      {/* Pending Tasks */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Pending Tasks</h3>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 italic">No pending tasks.</p>
        ) : (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-100 mb-2 cursor-pointer"
              onClick={() => handleTaskClick(task)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTaskClick(task)}
              aria-label={`View task: ${task.agenda}`}
            >
              <p className="font-medium text-gray-800">{task.agenda}</p>
              <p className="text-sm text-gray-500">
                Type: {task.type === 'General' ? 'General' : getCourseName(task.courseId)} | Priority: {task.priority} | Category: {task.category}
              </p>
              <p className="text-sm text-gray-500">Date: {task.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

CalendarPage.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      agenda: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      courseId: PropTypes.number,
      priority: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    })
  ),
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ),
};

export default CalendarPage;