import React, { useState, useEffect } from 'react';
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

const AccountPage = ({ tasks, courses }) => {
  const [filter, setFilter] = useState('all');
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser
      ? JSON.parse(savedUser)
      : { name: 'John Doe', email: 'john.doe@example.com' };
  });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);

  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const completedByDay = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'].reduce(
    (acc, _, index) => {
      acc[index] = 0;
      return acc;
    },
    {}
  );

  tasks
    .filter((task) => task.completed)
    .forEach((task) => {
      const date = new Date(task.date);
      const dayIndex = date.getDay();
      completedByDay[dayIndex] = (completedByDay[dayIndex] || 0) + 1;
    });

  const barData = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'],
    datasets: [
      {
        label: 'Tugas Selesai per Hari',
        data: Object.values(completedByDay),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        title: { display: true, text: 'Jumlah Tugas' },
        min: 0,
        max: 8,
        ticks: { stepSize: 1, callback: (value) => Number.isInteger(value) ? value : null },
      },
      x: { title: { display: true, text: 'Hari' } },
    },
  };

  const today = new Date();
  const getDaysDifference = (date) => {
    const taskDate = new Date(date);
    const diffTime = taskDate - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredPendingTasks = tasks.filter((task) => {
    if (task.completed) return false;
    if (filter === '7days') return getDaysDifference(task.date) <= 7;
    if (filter === '30days') return getDaysDifference(task.date) <= 30;
    return true;
  });

  const pieCategories = {
    today: 0,
    tomorrow: 0,
    next7days: 0,
    next30days: 0,
    beyond30days: 0,
  };

  filteredPendingTasks.forEach((task) => {
    const daysDiff = getDaysDifference(task.date);
    if (daysDiff <= 0) pieCategories.today += 1;
    else if (daysDiff === 1) pieCategories.tomorrow += 1;
    else if (daysDiff <= 7) pieCategories.next7days += 1;
    else if (daysDiff <= 30) pieCategories.next30days += 1;
    else pieCategories.beyond30days += 1;
  });

  const pieData = {
    labels: ['Hari Ini', 'Besok', '7 Hari Ke Depan', '30 Hari Ke Depan', 'Lebih dari 30 Hari'],
    datasets: [
      {
        data: [
          pieCategories.today,
          pieCategories.tomorrow,
          pieCategories.next7days,
          pieCategories.next30days,
          pieCategories.beyond30days,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(153, 102, 255, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tasksByCourse = courses.reduce((acc, course) => {
    acc[course.id] = tasks.filter((task) => task.courseId === course.id).length;
    return acc;
  }, {});

  const pieCoursesData = {
    labels: courses.map((course) => course.name),
    datasets: [
      {
        data: Object.values(tasksByCourse),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tasksByPriority = ['Tinggi', 'Sedang', 'Rendah'].reduce((acc, priority) => {
    acc[priority] = tasks.filter((task) => task.priority === priority).length;
    return acc;
  }, {});

  const piePriorityData = {
    labels: ['Tinggi', 'Sedang', 'Rendah'],
    datasets: [
      {
        data: Object.values(tasksByPriority),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const tasksByCategory = ['Tugas', 'Ujian', 'Proyek'].reduce((acc, category) => {
    acc[category] = tasks.filter((task) => task.category === category).length;
    return acc;
  }, {});

  const pieCategoryData = {
    labels: ['Tugas', 'Ujian', 'Proyek'],
    datasets: [
      {
        data: Object.values(tasksByCategory),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const handleEditProfile = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      setNotificationMessage('Nama tidak boleh kosong!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    if (!editEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(editEmail)) {
      setNotificationMessage('Email tidak valid!');
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return;
    }
    setUser({ name: editName, email: editEmail });
    setIsEditModalOpen(false);
    setNotificationMessage('Profil diperbarui!');
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      {/* Notifikasi */}
      {showNotification && (
        <div
          className={`fixed top-6 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg z-[999] ${
            notificationMessage.includes('diperbarui') ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notificationMessage.includes('diperbarui') ? '✅' : '❌'} {notificationMessage}
        </div>
      )}

      {/* Profil */}
      <div className="mb-8 text-center">
        <div className="w-24 h-24 bg-blue-500 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold shadow-md">
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
        >
          Edit Profil
        </button>
      </div>

      {/* Modal Edit Profil */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Profil</h3>
            <form onSubmit={handleEditProfile} className="space-y-4">
              <input
                type="text"
                placeholder="Nama"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
                required
              />
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Ringkasan */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📊 Ringkasan Tugas</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-3xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-gray-600 mt-1">Tugas Selesai</p>
          </div>
          <div className="bg-white p-5 rounded-xl shadow text-center">
            <p className="text-3xl font-bold text-red-500">{pendingTasks}</p>
            <p className="text-gray-600 mt-1">Tugas Tertunda</p>
          </div>
        </div>
      </div>

      {/* Chart Bar */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📅 Tugas Selesai Harian</h3>
        {Object.values(completedByDay).every((count) => count === 0) ? (
          <p className="text-gray-500 italic">Belum ada data tugas selesai.</p>
        ) : (
          <div className="bg-white p-5 rounded-xl shadow">
            <Bar data={barData} options={barOptions} height={200} />
          </div>
        )}
      </div>

      {/* Chart Pie (Waktu) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🧩 Klasifikasi Tugas Tertunda</h3>
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
            >
              {option === '7days' ? '7 Hari' : option === '30days' ? '30 Hari' : 'Semua'}
            </button>
          ))}
        </div>
        {filteredPendingTasks.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada tugas tertunda untuk ditampilkan.</p>
        ) : (
          <div className="bg-white p-5 rounded-xl shadow">
            <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} height={200} />
          </div>
        )}
      </div>

      {/* Chart Pie (Mata Kuliah) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Tugas per Mata Kuliah</h3>
        {courses.length === 0 ? (
          <p className="text-gray-500 italic">Belum ada mata kuliah.</p>
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

      {/* Chart Pie (Prioritas) */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">⭐ Tugas per Prioritas</h3>
        <div className="bg-white p-5 rounded-xl shadow">
          <Pie
            data={piePriorityData}
            options={{ responsive: true, maintainAspectRatio: false }}
            height={200}
          />
        </div>
      </div>

      {/* Chart Pie (Kategori) */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">📌 Tugas per Kategori</h3>
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

export default AccountPage;