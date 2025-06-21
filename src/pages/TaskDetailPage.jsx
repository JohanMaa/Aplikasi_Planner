import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const TaskDetailPage = ({ tasks, setTasks, courses }) => {
  const { state } = useLocation();
  const { task } = state || {};
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  if (!task) {
    return (
      <div className="p-4 text-center text-gray-500">
        Tugas tidak ditemukan.
      </div>
    );
  }

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Tidak Diketahui';
  };

  const handleToggleComplete = () => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
    setNotificationMessage(task.completed ? 'Agenda belum selesai!' : 'Agenda selesai!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="p-4 pb-24 min-h-screen bg-gray-50">
      {/* Notifikasi */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-[999]">
          ✅ {notificationMessage}
        </div>
      )}

      {/* Tombol kembali */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition mb-6"
      >
        <FaArrowLeft className="text-sm" />
        Kembali
      </button>

      {/* Judul */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📌 Detail Tugas</h2>

      {/* Kartu Detail */}
      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 space-y-4">
        <div>
          <p className="text-gray-600 text-sm">Agenda</p>
          <p className="text-lg font-semibold text-gray-800">{task.agenda}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Tenggat</p>
          <p className="text-base text-gray-700">📅 {task.date}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Tipe</p>
          <p className="text-base text-gray-700">
            {task.type === 'General' ? '📄 General' : `📚 ${getCourseName(task.courseId)}`}
          </p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Prioritas</p>
          <p className="text-base text-gray-700">⭐ {task.priority}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Kategori</p>
          <p className="text-base text-gray-700">📌 {task.category}</p>
        </div>
        <div>
          <p className="text-gray-600 text-sm">Status</p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="w-5 h-5 text-blue-500 accent-blue-500"
            />
            <span
              className={`inline-block px-3 py-1 text-sm rounded-full ${
                task.completed
                  ? 'text-green-700 bg-green-100'
                  : 'text-gray-600 bg-gray-200'
              }`}
            >
              {task.completed ? 'Selesai' : 'Belum Selesai'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailPage;