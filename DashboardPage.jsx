import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { authService } from '../services/api';
import { Users, CheckSquare, FileText, BarChart3 } from 'lucide-react';

export default function DashboardPage() {
  const user = authService.getUser();
  const [stats, setStats] = useState({
    tasks: 0,
    notes: 0,
    reports: 0,
    users: 0,
  });

  useEffect(() => {
    // Placeholder for fetching dashboard stats
    // In production, fetch from API
    setStats({
      tasks: 12,
      notes: 8,
      reports: 5,
      users: 24,
    });
  }, []);

  const cards = [
    { title: 'Total Tasks', value: stats.tasks, icon: CheckSquare, color: 'bg-blue-500' },
    { title: 'Notes', value: stats.notes, icon: FileText, color: 'bg-green-500' },
    { title: 'Reports', value: stats.reports, icon: BarChart3, color: 'bg-purple-500' },
  ];

  if (user?.role === 'admin') {
    cards.push({ title: 'Total Users', value: stats.users, icon: Users, color: 'bg-orange-500' });
  }

  return (
    <div className="flex h-screen">
      <Sidebar userRole={user?.role} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8 bg-gray-100">
          <h2 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cards.map((card, idx) => (
              <div key={idx} className={`${card.color} rounded-lg shadow-lg p-6 text-white`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm opacity-90">{card.title}</p>
                    <p className="text-3xl font-bold">{card.value}</p>
                  </div>
                  <card.icon size={40} className="opacity-50" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition">
                Create Task
              </button>
              <button className="bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">
                Add Note
              </button>
              <button className="bg-purple-500 text-white py-3 rounded hover:bg-purple-600 transition">
                Submit Report
              </button>
              <button className="bg-orange-500 text-white py-3 rounded hover:bg-orange-600 transition">
                View Analytics
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
