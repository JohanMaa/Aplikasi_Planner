import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendarcustom.css';

const CalendarPage = ({ tasks, courses }) => {
  const [date, setDate] = useState(new Date());
  const [courseFilter, setCourseFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const navigate = useNavigate();

  const pendingTasks = tasks.filter((task) => {
    if (task.completed) return false;
    if (typeFilter && task.type !== typeFilter) return false;
    if (courseFilter && task.courseId !== parseInt(courseFilter)) return false;
    if (priorityFilter && task.priority !== priorityFilter) return false;
    if (categoryFilter && task.category !== categoryFilter) return false;
    return true;
  });

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = date.toISOString().split('T')[0];
      const hasTask = pendingTasks.some((task) => task.date === formattedDate);
      return hasTask ? (
        <div className="flex justify-center mt-1">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
        </div>
      ) : null;
    }
  };

  const handleTaskClick = (task) => {
    navigate(`/task/${task.id}`, { state: { task } });
  };

  const getCourseName = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    return course ? course.name : 'Tidak Diketahui';
  };

  return (
    <div className="p-4 pb-24 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">📆 Kalender</h2>

      {/* Filter */}
      <div className="mb-4 space-y-2">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Semua Tipe</option>
          <option value="General">General</option>
          <option value="Course">Kuliah</option>
        </select>
        <select
          value={courseFilter}
          onChange={(e) => setCourseFilter(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          disabled={typeFilter === 'General'}
        >
          <option value="">Semua Mata Kuliah</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name} ({course.code})
            </option>
          ))}
        </select>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Semua Prioritas</option>
          <option value="Tinggi">Tinggi</option>
          <option value="Sedang">Sedang</option>
          <option value="Rendah">Rendah</option>
        </select>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full px-4 py-2 rounded border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
        >
          <option value="">Semua Kategori</option>
          {typeFilter === 'General' ? (
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
      </div>

      {/* Kalender */}
      <div className="mb-8">
        <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <Calendar
            onChange={setDate}
            value={date}
            tileContent={tileContent}
            className="react-calendar w-full p-4"
          />
        </div>
      </div>

      {/* Agenda Belum Selesai */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Agenda Belum Selesai</h3>
        {pendingTasks.length === 0 ? (
          <p className="text-gray-500 italic">Tidak ada agenda belum selesai.</p>
        ) : (
          pendingTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition-all border border-gray-100 mb-2 cursor-pointer"
              onClick={() => handleTaskClick(task)}
            >
              <p className="font-medium text-gray-800">{task.agenda}</p>
              <p className="text-sm text-gray-500">
                {task.type === 'General' ? '📄' : '📚'} {task.type === 'General' ? 'General' : getCourseName(task.courseId)} | ⭐ {task.priority} | 📌 {task.category}
              </p>
              <p className="text-sm text-gray-500">📅 {task.date}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CalendarPage;