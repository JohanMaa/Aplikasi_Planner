import React from 'react';
import { FaTasks, FaCalendar, FaUser, FaBook } from 'react-icons/fa';

const navItems = [
  { id: 'tasks', label: 'Tugas', icon: FaTasks },
  { id: 'calendar', label: 'Kalender', icon: FaCalendar },
  { id: 'courses', label: 'Mata Kuliah', icon: FaBook },
  { id: 'account', label: 'Akun', icon: FaUser },
];

const BottomNav = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] z-50">
      <div className="flex justify-around items-center h-full px-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`relative flex flex-col items-center justify-center flex-1 py-2 transition-all duration-300 ease-in-out group ${
                isActive ? 'text-blue-600' : 'text-gray-500 hover:text-blue-500'
              } focus:outline-none`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div
                className={`rounded-full p-2 transition-all duration-300 ${
                  isActive
                    ? 'bg-blue-100 shadow-inner scale-110'
                    : 'group-hover:bg-blue-50'
                }`}
              >
                <Icon
                  className={`text-xl transition-transform duration-300 ${
                    isActive ? 'scale-110' : 'group-hover:scale-105'
                  }`}
                />
              </div>

              <span
                className={`mt-1 text-[11px] font-medium transition-all ${
                  isActive ? 'text-blue-600' : ''
                }`}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-500 rounded-full mt-1" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
