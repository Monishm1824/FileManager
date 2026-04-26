import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, CheckSquare, FileText, BarChart3 } from 'lucide-react';

export default function Sidebar({ userRole }) {
  const navigate = useNavigate();

  const menuItems = {
    employee: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'My Tasks', path: '/tasks', icon: CheckSquare },
      { name: 'My Notes', path: '/notes', icon: FileText },
      { name: 'Submit Report', path: '/reports', icon: BarChart3 },
    ],
    manager: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Tasks', path: '/tasks', icon: CheckSquare },
      { name: 'Employees', path: '/employees', icon: FileText },
      { name: 'Reports', path: '/reports', icon: BarChart3 },
    ],
    admin: [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Users', path: '/users', icon: CheckSquare },
      { name: 'Tasks', path: '/tasks', icon: FileText },
      { name: 'Reports', path: '/reports', icon: BarChart3 },
    ],
  };

  const items = menuItems[userRole] || menuItems.employee;

  return (
    <aside className="w-64 bg-gray-900 text-white h-screen">
      <div className="p-4">
        <h2 className="text-xl font-bold mb-8">Menu</h2>
        <nav className="space-y-2">
          {items.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-700 transition"
            >
              <item.icon size={20} />
              {item.name}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
