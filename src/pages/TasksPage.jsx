import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const CONFIG = {
  TYPES: ['General', 'Course'],
  PRIORITIES: ['High', 'Medium', 'Low'],
  CATEGORIES: {
    General: ['Personal', 'Work', 'Other'],
    Course: ['Assignment', 'Exam', 'Project'],
  },
};

const TasksPage = ({ tasks = [], setTasks, courses = [] }) => {
  const [newAgenda, setNewAgenda] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Personal');
  const [newType, setNewType] = useState('General');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const navigate = useNavigate();
  const menuRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && !Object.values(menuRefs.current).some((ref) => ref && ref.contains(event.target))) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: 'success' }), 3000);
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newAgenda || !newDate || (newType === 'Course' && !newCourseId)) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    try {
      new Date(newDate); // Validate date
      const newTask = {
        id: tasks.length + 1,
        agenda: newAgenda,
        date: newDate,
        completed: false,
        courseId: newType === 'Course' ? parseInt(newCourseId) : null,
        type: newType,
        priority: newPriority,
        category: newCategory,
      };
      setTasks([...tasks, newTask]);
      showNotification('Task added successfully', 'success');
      resetForm();
    } catch {
      showNotification('Invalid date format', 'error');
    }
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    if (!newAgenda || !newDate || (newType === 'Course' && !newCourseId) || !editingTask) {
      showNotification('Please fill all required fields', 'error');
      return;
    }
    try {
      new Date(newDate); // Validate date
      setTasks(
        tasks.map((task) =>
          task.id === editingTask.id
            ? { ...task, agenda: newAgenda, date: newDate, courseId: newType === 'Course' ? parseInt(newCourseId) : null, type: newType, priority: newPriority, category: newCategory }
            : task
        )
      );
      showNotification('Task updated successfully', 'success');
      resetForm();
    } catch {
      showNotification('Invalid date format', 'error');
    }
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Delete this task?')) {
      setTasks(tasks.filter((task) => task.id !== id));
      setOpenMenuId(null);
      showNotification('Task deleted successfully', 'success');
    }
  };

  const handleDuplicateTask = (task) => {
    const newTask = { ...task, id: tasks.length + 1, completed: false };
    setTasks([...tasks, newTask]);
    setOpenMenuId(null);
    showNotification('Task duplicated successfully', 'success');
  };

  const handleToggleComplete = (id) => {
    const task = tasks.find((task) => task.id === id);
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)));
    showNotification(task.completed ? 'Task marked as incomplete' : 'Task marked as complete', 'success');
  };

  const handleTaskClick = (task) => {
    navigate(`/task/${task.id}`, { state: { task } });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortByDateAsc = () => {
    setTasks([...tasks].sort((a, b) => new Date(a.date) - new Date(b.date)));
    setIsSortModalOpen(false);
    showNotification('Tasks sorted by date (ascending)', 'success');
  };

  const handleSortByDateDesc = () => {
    setTasks([...tasks].sort((a, b) => new Date(b.date) - new Date(a.date)));
    setIsSortModalOpen(false);
    showNotification('Tasks sorted by date (descending)', 'success');
  };

  const handleDeleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setIsSortModalOpen(false);
    showNotification('Completed tasks deleted', 'success');
  };

  const resetForm = () => {
    setNewAgenda('');
    setNewDate('');
    setNewCourseId('');
    setNewPriority('Medium');
    setNewCategory(newType === 'General' ? 'Personal' : 'Assignment');
    setNewType('General');
    setIsModalOpen(false);
    setEditingTask(null);
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter(
      (task) =>
        task.agenda.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (!typeFilter || task.type === typeFilter)
    );
  }, [tasks, searchQuery, typeFilter]);

  const pendingTasks = useMemo(() => filteredTasks.filter((task) => !task.completed), [filteredTasks]);
  const completedTasks = useMemo(() => filteredTasks.filter((task) => task.completed), [filteredTasks]);

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Unknown';
  };

  return (
    <div className="p-4 pb-24 relative min-h-screen bg-gray-50">
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

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Task List</h2>

      {/* Filter Type */}
      {/* <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition mb-4"
        aria-label="Filter by type"
      >
        <option value="">All Types</option>
        {CONFIG.TYPES.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select> */}

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition mb-6"
        aria-label="Search tasks"
      />

      {/* Pending Tasks */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Pending Tasks</h3>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 italic">No pending tasks.</p>
        ) : (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all flex justify-between items-center border border-gray-100 mb-2 cursor-pointer relative"
              onClick={() => handleTaskClick(task)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTaskClick(task)}
              aria-label={`View task: ${task.agenda}`}
            >
              <div>
                <p className="font-medium text-gray-800">{task.agenda}</p>
                <p className="text-sm text-gray-500">
                  Type: {task.type === 'General' ? 'General' : getCourseName(task.courseId)} | Priority: {task.priority} | Category: {task.category}
                </p>
                <p className="text-sm text-gray-500">Date: {task.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-blue-500 accent-blue-500"
                  aria-label={`Mark ${task.agenda} as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === task.id ? null : task.id);
                  }}
                  className="text-gray-600 text-xl"
                  aria-label={`Menu for ${task.agenda}`}
                >
                  ⋮
                </button>
                {openMenuId === task.id && (
                  <div
                    ref={(el) => (menuRefs.current[task.id] = el)}
                    className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg p-2 w-32 z-50 border"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTask(task);
                        setNewAgenda(task.agenda);
                        setNewDate(task.date);
                        setNewCourseId(task.courseId ? task.courseId.toString() : '');
                        setNewPriority(task.priority);
                        setNewCategory(task.category);
                        setNewType(task.type);
                        setIsModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm text-red-500"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateTask(task);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Duplicate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Completed Tasks */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Completed Tasks</h3>
        {completedTasks.length === 0 ? (
          <p className="text-gray-500 italic">No completed tasks.</p>
        ) : (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all flex justify-between items-center border border-gray-100 mb-2 cursor-pointer relative"
              onClick={() => handleTaskClick(task)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTaskClick(task)}
              aria-label={`View task: ${task.agenda}`}
            >
              <div>
                <p className="font-medium text-gray-500 line-through">{task.agenda}</p>
                <p className="text-sm text-gray-400">
                  Type: {task.type === 'General' ? 'General' : getCourseName(task.courseId)} | Priority: {task.priority} | Category: {task.category}
                </p>
                <p className="text-sm text-gray-400">Date: {task.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-blue-500 accent-blue-500"
                  aria-label={`Mark ${task.agenda} as ${task.completed ? 'incomplete' : 'complete'}`}
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === task.id ? null : task.id);
                  }}
                  className="text-gray-600 text-xl"
                  aria-label={`Menu for ${task.agenda}`}
                >
                  ⋮
                </button>
                {openMenuId === task.id && (
                  <div
                    ref={(el) => (menuRefs.current[task.id] = el)}
                    className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg p-2 w-32 z-50 border"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditingTask(task);
                        setNewAgenda(task.agenda);
                        setNewDate(task.date);
                        setNewCourseId(task.courseId ? task.courseId.toString() : '');
                        setNewPriority(task.priority);
                        setNewCategory(task.category);
                        setNewType(task.type);
                        setIsModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task.id);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm text-red-500"
                    >
                      Delete
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDuplicateTask(task);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Duplicate
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Button */}
      <button
        onClick={() => {
          setEditingTask(null);
          setNewAgenda('');
          setNewDate('');
          setNewCourseId('');
          setNewPriority('Medium');
          setNewCategory('Personal');
          setNewType('General');
          setIsModalOpen(true);
        }}
        className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-blue-600 transition-all z-50"
        aria-label="Add task"
      >
        <span className="text-3xl font-bold">+</span>
      </button>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{editingTask ? 'Edit Task' : 'Add Task'}</h3>
            <form onSubmit={editingTask ? handleEditTask : handleAddTask} className="space-y-4">
              <input
                type="text"
                placeholder="Agenda"
                value={newAgenda}
                onChange={(e) => setNewAgenda(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Task agenda"
              />
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Task date"
              />
              <select
                value={newType}
                onChange={(e) => {
                  setNewType(e.target.value);
                  setNewCourseId('');
                  setNewCategory(e.target.value === 'General' ? 'Personal' : 'Assignment');
                }}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                aria-label="Task type"
              >
                {CONFIG.TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              {newType === 'Course' && (
                <select
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                  disabled={courses.length === 0}
                  aria-label="Select course"
                >
                  <option value="" disabled>
                    {courses.length === 0 ? 'No courses available' : 'Select Course'}
                  </option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.name} ({course.code})
                    </option>
                  ))}
                </select>
              )}
              <select
                value={newPriority}
                onChange={(e) => setNewPriority(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                aria-label="Task priority"
              >
                {CONFIG.PRIORITIES.map((priority) => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                aria-label="Task category"
              >
                {CONFIG.CATEGORIES[newType].map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label={editingTask ? 'Save task' : 'Add task'}
                >
                  {editingTask ? 'Save' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Sort Modal */}
      {isSortModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Sort Tasks</h3>
            <div className="space-y-2">
              <button
                onClick={handleSortByDateAsc}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                aria-label="Sort by date ascending"
              >
                Sort by Date (Ascending)
              </button>
              <button
                onClick={handleSortByDateDesc}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
                aria-label="Sort by date descending"
              >
                Sort by Date (Descending)
              </button>
              <button
                onClick={handleDeleteCompleted}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-500"
                aria-label="Delete completed tasks"
              >
                Delete Completed Tasks
              </button>
              <button
                onClick={() => setIsSortModalOpen(false)}
                className="w-full text-left px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                aria-label="Close sort modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

TasksPage.propTypes = {
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

export default TasksPage;