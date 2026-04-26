import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { noteService } from '../services/api';
import { authService } from '../services/api';
import { Trash2, Edit2, Plus } from 'lucide-react';

export default function NotesPage() {
  const user = authService.getUser();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await noteService.getMyNotes();
      setNotes(data.data || []);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await noteService.updateNote(editingId, content);
      } else {
        await noteService.createNote(content);
      }
      setContent('');
      setEditingId(null);
      setShowForm(false);
      fetchNotes();
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await noteService.deleteNote(id);
        fetchNotes();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar userRole={user?.role} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">My Notes</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
            >
              <Plus size={20} /> New Note
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
              <textarea
                placeholder="Write your note here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
                rows="6"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  {editingId ? 'Update' : 'Save'} Note
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingId(null);
                    setContent('');
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notes.length === 0 ? (
                <p className="text-gray-500">No notes found</p>
              ) : (
                notes.map((note) => (
                  <div key={note.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                    <p className="text-gray-600">{note.content}</p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">{new Date(note.created_at).toLocaleDateString()}</span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setEditingId(note.id);
                            setContent(note.content);
                            setShowForm(true);
                          }}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(note.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
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
