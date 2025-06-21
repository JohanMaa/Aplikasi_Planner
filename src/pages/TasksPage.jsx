import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const TasksPage = ({ tasks, setTasks, courses }) => {
  const [newAgenda, setNewAgenda] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCourseId, setNewCourseId] = useState('');
  const [newPriority, setNewPriority] = useState('Sedang');
  const [newCategory, setNewCategory] = useState('Tugas');
  const [newType, setNewType] = useState('General');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newAgenda || !newDate || (newType === 'Course' && !newCourseId)) return;

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
    setNotificationMessage('Agenda ditambahkan!');
    resetForm();
  };

  const handleEditTask = (e) => {
    e.preventDefault();
    if (!newAgenda || !newDate || (newType === 'Course' && !newCourseId) || !editingTask) return;

    setTasks(
      tasks.map((task) =>
        task.id === editingTask.id
          ? {
              ...task,
              agenda: newAgenda,
              date: newDate,
              courseId: newType === 'Course' ? parseInt(newCourseId) : null,
              type: newType,
              priority: newPriority,
              category: newCategory,
            }
          : task
      )
    );
    setNotificationMessage('Agenda diperbarui!');
    resetForm();
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Hapus tugas ini?')) {
      setTasks(tasks.filter((task) => task.id !== id));
      setOpenMenuId(null);
      setNotificationMessage('Agenda dihapus!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
    }
  };

  const handleDuplicateTask = (task) => {
    const newTask = {
      id: tasks.length + 1,
      agenda: task.agenda,
      date: task.date,
      completed: false,
      courseId: task.courseId,
      type: task.type,
      priority: task.priority,
      category: task.category,
    };
    setTasks([...tasks, newTask]);
    setOpenMenuId(null);
    setNotificationMessage('Agenda diduplikasi!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const task = tasks.find((task) => task.id === id);
    setNotificationMessage(task.completed ? 'Agenda belum selesai!' : 'Agenda selesai!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
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
  };

  const handleSortByDateDesc = () => {
    setTasks([...tasks].sort((a, b) => new Date(b.date) - new Date(a.date)));
    setIsSortModalOpen(false);
  };

  const handleDeleteCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
    setIsSortModalOpen(false);
    setNotificationMessage('Agenda selesai dihapus!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const resetForm = () => {
    setNewAgenda('');
    setNewDate('');
    setNewCourseId('');
    setNewPriority('Sedang');
    setNewCategory(newType === 'General' ? 'Pribadi' : 'Tugas');
    setNewType('General');
    setIsModalOpen(false);
    setEditingTask(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filteredTasks = tasks.filter((task) =>
    task.agenda.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (!typeFilter || task.type === typeFilter)
  );

  const pendingTasks = filteredTasks.filter((task) => !task.completed);
  const completedTasks = filteredTasks.filter((task) => task.completed);

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Tidak Diketahui';
  };

  return (
    <div className="p-4 pb-24 relative min-h-screen bg-gray-50">
      {/* Notifikasi */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999]">
          ✅ {notificationMessage}
        </div>
      )}

      {/* Tombol menu utama */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="fixed top-4 right-4 text-gray-600 text-2xl z-10"
        aria-label="Menu utama"
      >
        ⋮
      </button>

      {/* Dropdown Menu utama */}
      {isMenuOpen && (
        <div className="fixed top-12 right-4 bg-white shadow-lg rounded-lg p-4 w-40 z-50 border transition">
          <button
            onClick={() => {
              setIsSortModalOpen(true);
              setIsMenuOpen(false);
            }}
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
          >
            Sortir Agenda
          </button>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-800">📋 Daftar Agenda</h2>

      {/* Filter Type */}
      <select
        value={typeFilter}
        onChange={(e) => setTypeFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition mb-4"
      >
        <option value="">Semua Tipe</option>
        <option value="General">General</option>
        <option value="Course">Kuliah</option>
      </select>

      {/* Input pencarian */}
      <input
        type="text"
        placeholder="Cari agenda..."
        value={searchQuery}
        onChange={handleSearch}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none transition mb-6"
      />

      {/* Belum selesai */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Belum Selesai</h3>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada agenda belum selesai.</p>
        ) : (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all flex justify-between items-center border border-gray-100 mb-2 cursor-pointer relative"
              onClick={() => handleTaskClick(task)}
            >
              <div>
                <p className="font-medium text-gray-800">{task.agenda}</p>
                <p className="text-sm text-gray-500">
                  {task.type === 'General' ? '📄' : '📚'} {task.type === 'General' ? 'General' : getCourseName(task.courseId)} | ⭐ {task.priority} | 📌 {task.category}
                </p>
                <p className="text-sm text-gray-500">📅 {task.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-blue-500 accent-blue-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === task.id ? null : task.id);
                  }}
                  className="text-gray-600 text-xl"
                  aria-label={`Menu untuk ${task.agenda}`}
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

      {/* Selesai */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Selesai</h3>
        {completedTasks.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada agenda selesai.</p>
        ) : (
          completedTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all flex justify-between items-center border border-gray-100 mb-2 cursor-pointer relative"
              onClick={() => handleTaskClick(task)}
            >
              <div>
                <p className="font-medium text-gray-500 line-through">{task.agenda}</p>
                <p className="text-sm text-gray-400">
                  {task.type === 'General' ? '📄' : '📚'} {task.type === 'General' ? 'General' : getCourseName(task.courseId)} | ⭐ {task.priority} | 📌 {task.category}
                </p>
                <p className="text-sm text-gray-400">📅 {task.date}</p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => handleToggleComplete(task.id)}
                  onClick={(e) => e.stopPropagation()}
                  className="w-5 h-5 text-blue-500 accent-blue-500"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpenMenuId(openMenuId === task.id ? null : task.id);
                  }}
                  className="text-gray-600 text-xl"
                  aria-label={`Menu untuk ${task.agenda}`}
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

      {/* Tombol Tambah */}
      <button
        onClick={() => {
          setEditingTask(null);
          setNewAgenda('');
          setNewDate('');
          setNewCourseId('');
          setNewPriority('Sedang');
          setNewCategory('Pribadi');
          setNewType('General');
          setIsModalOpen(true);
        }}
        className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-blue-600 transition-all z-50"
        aria-label="Tambah agenda"
      >
        <span className="text-3xl font-bold">＋</span>
      </button>

      {/* Modal Tambah/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">{editingTask ? 'Edit Agenda' : 'Tambah Agenda'}</h3>
            <form onSubmit={editingTask ? handleEditTask : handleAddTask} className="space-y-4">
              <input
                type="text"
                placeholder="Agenda"
                value={newAgenda}
                onChange={(e) => setNewAgenda(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <select
                value={newType}
                onChange={(e) => {
                  setNewType(e.target.value);
                  setNewCourseId('');
                  setNewCategory(e.target.value === 'General' ? 'Pribadi' : 'Tugas');
                }}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="General">General</option>
                <option value="Course">Kuliah</option>
              </select>
              {newType === 'Course' && (
                <select
                  value={newCourseId}
                  onChange={(e) => setNewCourseId(e.target.value)}
                  className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  required
                >
                  <option value="" disabled>Pilih Mata Kuliah</option>
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
              >
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                {newType === 'General' ? (
                  <>
                    <option value="Pribadi">Pribadi</option>
                    <option value="Kerja">Kerja</option>
                    <option value="Lainnya">Lainnya</option>
                  </>
                ) : (
                  <>
                    <option value="Tugas">Tugas</option>
                    <option value="Ujian">Ujian</option>
                    <option value="Proyek">Proyek</option>
                  </>
                )}
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingTask ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Sortir */}
      {isSortModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Sortir Agenda</h3>
            <div className="space-y-2">
              <button
                onClick={handleSortByDateAsc}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Urutkan berdasarkan Tanggal (Asc)
              </button>
              <button
                onClick={handleSortByDateDesc}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded"
              >
                Urutkan berdasarkan Tanggal (Desc)
              </button>
              <button
                onClick={handleDeleteCompleted}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded text-red-500"
              >
                Hapus Agenda Selesai
              </button>
              <button
                onClick={() => setIsSortModalOpen(false)}
                className="w-full text-left px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksPage;