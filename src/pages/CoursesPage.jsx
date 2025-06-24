import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CoursesPage = ({ courses, setCourses, tasks, setTasks }) => {
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskAgenda, setNewTaskAgenda] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Medium');
  const [newTaskCategory, setNewTaskCategory] = useState('Assignment');
  const [selectedCourseId, setSelectedCourseId] = useState(null);
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

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newName || !newCode) return;

    const newCourse = {
      id: courses.length + 1,
      name: newName,
      code: newCode,
    };

    setCourses([...courses, newCourse]);
    resetCourseForm();
    showNotification('Course successfully added', 'success');
  };

  const handleEditCourse = (e) => {
    e.preventDefault();
    if (!newName || !newCode || !editingCourse) return;

    setCourses(
      courses.map((course) =>
        course.id === editingCourse.id ? { ...course, name: newName, code: newCode } : course
      )
    );
    resetCourseForm();
    showNotification('Course successfully updated', 'success');
  };

  const handleDeleteCourse = (id) => {
    if (tasks.some((task) => task.courseId === id)) {
      showNotification('Cannot delete course with associated tasks', 'error');
      return;
    }
    if (window.confirm('Delete this course?')) {
      setCourses(courses.filter((course) => course.id !== id));
      setOpenMenuId(null);
      showNotification('Course successfully deleted', 'success');
    }
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskAgenda || !newTaskDate || !selectedCourseId) return;

    const newTask = {
      id: tasks.length + 1,
      agenda: newTaskAgenda,
      date: newTaskDate,
      completed: false,
      courseId: parseInt(selectedCourseId),
      type: 'Course',
      priority: newTaskPriority,
      category: newTaskCategory,
    };

    setTasks([...tasks, newTask]);
    resetTaskForm();
    showNotification('Task successfully added', 'success');
  };

  const resetCourseForm = () => {
    setNewName('');
    setNewCode('');
    setIsModalOpen(false);
    setEditingCourse(null);
  };

  const resetTaskForm = () => {
    setNewTaskAgenda('');
    setNewTaskDate('');
    setNewTaskPriority('Medium');
    setNewTaskCategory('Assignment');
    setIsTaskModalOpen(false);
    setSelectedCourseId(null);
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

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Courses</h2>

      {/* Course List */}
      <div className="mb-8">
        {courses.length === 0 ? (
          <p className="text-gray-500 italic">No courses available.</p>
        ) : (
          courses.map((course) => (
            <div
              key={course.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all flex justify-between items-center border border-gray-100 mb-2 relative"
            >
              <div>
                <p className="font-medium text-gray-800">{course.name}</p>
                <p className="text-sm text-gray-500">{course.code}</p>
              </div>
              <div>
                <button
                  onClick={() => setOpenMenuId(openMenuId === course.id ? null : course.id)}
                  className="text-gray-600 text-xl"
                  aria-label={`Menu for ${course.name}`}
                >
                  ⋮
                </button>
                {openMenuId === course.id && (
                  <div
                    ref={(el) => (menuRefs.current[course.id] = el)}
                    className="absolute right-0 top-full mt-1 bg-white shadow-lg rounded-lg p-2 w-32 z-50 border"
                  >
                    <button
                      onClick={() => {
                        setEditingCourse(course);
                        setNewName(course.name);
                        setNewCode(course.code);
                        setIsModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        handleDeleteCourse(course.id);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm text-red-500"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id.toString());
                        setIsTaskModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Add Task
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Course Button */}
      <button
        onClick={() => {
          setEditingCourse(null);
          setNewName('');
          setNewCode('');
          setIsModalOpen(true);
        }}
        className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-blue-600 transition-all z-50"
        aria-label="Add course"
      >
        <span className="text-3xl font-bold">＋</span>
      </button>

      {/* Add/Edit Course Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingCourse ? 'Edit Course' : 'Add Course'}
            </h3>
            <form onSubmit={editingCourse ? handleEditCourse : handleAddCourse} className="space-y-4">
              <input
                type="text"
                placeholder="Course Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Course name"
              />
              <input
                type="text"
                placeholder="Course Code"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Course code"
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetCourseForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label={editingCourse ? 'Save course' : 'Add course'}
                >
                  {editingCourse ? 'Save' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Task Modal */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Task</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                type="text"
                placeholder="Agenda"
                value={newTaskAgenda}
                onChange={(e) => setNewTaskAgenda(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Task agenda"
              />
              <input
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
                aria-label="Task date"
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                aria-label="Task priority"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                aria-label="Task category"
              >
                <option value="Assignment">Assignment</option>
                <option value="Exam">Exam</option>
                <option value="Project">Project</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetTaskForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                  aria-label="Cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label="Add task"
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

CoursesPage.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    })
  ).isRequired,
  setCourses: PropTypes.func.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      courseId: PropTypes.number.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default CoursesPage;