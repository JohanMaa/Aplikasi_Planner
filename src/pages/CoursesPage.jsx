import React, { useState, useEffect, useRef } from 'react';

const CoursesPage = ({ courses, setCourses, tasks, setTasks }) => {
  const [newName, setNewName] = useState('');
  const [newCode, setNewCode] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [newTaskAgenda, setNewTaskAgenda] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState('Sedang');
  const [newTaskCategory, setNewTaskCategory] = useState('Tugas');
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
  };

  const handleDeleteCourse = (id) => {
    if (tasks.some((task) => task.courseId === id)) {
      alert('Tidak dapat menghapus mata kuliah yang memiliki tugas terkait.');
      return;
    }
    if (window.confirm('Hapus mata kuliah ini?')) {
      setCourses(courses.filter((course) => course.id !== id));
      setOpenMenuId(null);
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
  };

  const resetCourseForm = () => {
    setNewName('');
    setNewCode('');
    setIsModalOpen(false);
    setEditingCourse(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const resetTaskForm = () => {
    setNewTaskAgenda('');
    setNewTaskDate('');
    setNewTaskPriority('Sedang');
    setNewTaskCategory('Tugas');
    setIsTaskModalOpen(false);
    setSelectedCourseId(null);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      {/* Notifikasi */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999]">
          ✅ {editingCourse ? 'Mata kuliah diperbarui!' : isTaskModalOpen ? 'Tugas ditambahkan!' : 'Mata kuliah ditambahkan!'}
        </div>
      )}

      <h2 className="text-2xl font-bold mb-6 text-gray-800">📚 Mata Kuliah</h2>

      {/* Daftar Mata Kuliah */}
      <div className="mb-8">
        {courses.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada mata kuliah.</p>
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
                  aria-label={`Menu untuk ${course.name}`}
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
                      Hapus
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id.toString());
                        setIsTaskModalOpen(true);
                        setOpenMenuId(null);
                      }}
                      className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm"
                    >
                      Tambah Tugas
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Tombol Tambah Mata Kuliah */}
      <button
        onClick={() => {
          setEditingCourse(null);
          setNewName('');
          setNewCode('');
          setIsModalOpen(true);
        }}
        className="fixed bottom-20 right-4 bg-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl hover:bg-blue-600 transition-all z-50"
        aria-label="Tambah mata kuliah"
      >
        <span className="text-3xl font-bold">＋</span>
      </button>

      {/* Modal Tambah/Edit Mata Kuliah */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">
              {editingCourse ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
            </h3>
            <form onSubmit={editingCourse ? handleEditCourse : handleAddCourse} className="space-y-4">
              <input
                type="text"
                placeholder="Nama Mata Kuliah"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="text"
                placeholder="Kode Mata Kuliah"
                value={newCode}
                onChange={(e) => setNewCode(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetCourseForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  {editingCourse ? 'Simpan' : 'Tambah'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Tambah Tugas */}
      {isTaskModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Tambah Tugas</h3>
            <form onSubmit={handleAddTask} className="space-y-4">
              <input
                type="text"
                placeholder="Agenda"
                value={newTaskAgenda}
                onChange={(e) => setNewTaskAgenda(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="date"
                value={newTaskDate}
                onChange={(e) => setNewTaskDate(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="Tinggi">Tinggi</option>
                <option value="Sedang">Sedang</option>
                <option value="Rendah">Rendah</option>
              </select>
              <select
                value={newTaskCategory}
                onChange={(e) => setNewTaskCategory(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                <option value="Tugas">Tugas</option>
                <option value="Ujian">Ujian</option>
                <option value="Proyek">Proyek</option>
              </select>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={resetTaskForm}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Tambah
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;