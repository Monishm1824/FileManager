import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { taskService } from '../services/api';
import { authService } from '../services/api';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function TasksPage() {
  const user = authService.getUser();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'pending',
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      if (user?.role === 'employee') {
        const data = await taskService.getMyTasks();
        setTasks(data.data || []);
      } else {
        const data = await taskService.getAllTasks();
        setTasks(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await taskService.updateTask(editingId, formData);
      } else {
        await taskService.createTask(formData);
      }
      setFormData({ title: '', description: '', status: 'pending' });
      setEditingId(null);
      setShowForm(false);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await taskService.deleteTask(id);
        fetchTasks();
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    in_progress: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div className="flex h-screen">
      <Sidebar userRole={user?.role} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Tasks</h2>
            {(user?.role === 'manager' || user?.role === 'admin') && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <Plus size={20} /> New Task
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Task Title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="border rounded px-3 py-2"
                  required
                />
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="border rounded px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full border rounded px-3 py-2 mt-4"
                rows="4"
              />
              <div className="flex gap-2 mt-4">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  {editingId ? 'Update' : 'Create'} Task
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setFormData({ title: '', description: '', status: 'pending' });
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="space-y-4">
              {tasks.length === 0 ? (
                <p className="text-gray-500">No tasks found</p>
              ) : (
                tasks.map((task) => (
                  <div key={task.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{task.title}</h3>
                        <p className="text-gray-600 mt-2">{task.description}</p>
                        <div className="flex gap-4 mt-4">
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[task.status]}`}>
                            {task.status?.replace('_', ' ').toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-500">Created: {new Date(task.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {(user?.role === 'manager' || user?.role === 'admin') && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setEditingId(task.id);
                              setFormData({
                                title: task.title,
                                description: task.description,
                                status: task.status,
                              });
                              setShowForm(true);
                            }}
                            className="text-blue-500 hover:text-blue-700"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
