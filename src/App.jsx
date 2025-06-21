import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BottomNav from './components/BottomNav';
import TasksPage from './pages/TasksPage';
import CalendarPage from './pages/CalendarPage';
import AccountPage from './pages/AccountPage';
import CoursesPage from './pages/CoursesPage';
import TaskDetailPage from './pages/TaskDetailPage';

const App = () => {
  const [activeTab, setActiveTab] = useState('tasks');
  const [tasks, setTasks] = useState([
    {
      id: 1,
      agenda: 'Selesaikan laporan',
      date: '2025-06-20',
      completed: false,
      courseId: 1,
      type: 'Course',
      priority: 'Sedang',
      category: 'Tugas',
    },
    {
      id: 2,
      agenda: 'Rapat tim',
      date: '2025-06-21',
      completed: true,
      courseId: null,
      type: 'General',
      priority: 'Tinggi',
      category: 'Kerja',
    },
  ]);
  const [courses, setCourses] = useState([
    { id: 1, name: 'Algoritma', code: 'ALPRO101' },
    { id: 2, name: 'Basis Data', code: 'DB101' },
  ]);

  const renderContent = () => {
    switch (activeTab) {
      case 'tasks':
        return <TasksPage tasks={tasks} setTasks={setTasks} courses={courses} />;
      case 'calendar':
        return <CalendarPage tasks={tasks} courses={courses} />;
      case 'account':
        return <AccountPage tasks={tasks} courses={courses} />;
      case 'courses':
        return <CoursesPage courses={courses} setCourses={setCourses} tasks={tasks} setTasks={setTasks} />;
      default:
        return null;
    }
  };

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={renderContent()} />
            <Route path="/task/:id" element={<TaskDetailPage tasks={tasks} courses={courses} />} />
          </Routes>
        </div>
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>
    </Router>
  );
};

export default App;