import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { reportService } from '../services/api';
import { authService } from '../services/api';
import { Plus, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function ReportsPage() {
  const user = authService.getUser();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [summary, setSummary] = useState('');

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      if (user?.role === 'employee') {
        const data = await reportService.getMyReports();
        setReports(data.data || []);
      } else {
        const data = await reportService.getAllReports();
        setReports(data.data || []);
      }
    } catch (error) {
      console.error('Error fetching reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await reportService.createReport(summary);
      setSummary('');
      setShowForm(false);
      fetchReports();
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await reportService.approveReport(id);
      fetchReports();
    } catch (error) {
      console.error('Error approving report:', error);
    }
  };

  const handleReject = async (id) => {
    const reason = window.prompt('Rejection reason:');
    if (reason) {
      try {
        await reportService.rejectReport(id, reason);
        fetchReports();
      } catch (error) {
        console.error('Error rejecting report:', error);
      }
    }
  };

  const statusColors = {
    submitted: 'bg-blue-100 text-blue-800',
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };

  const statusIcons = {
    approved: <CheckCircle size={20} className="text-green-600" />,
    rejected: <XCircle size={20} className="text-red-600" />,
    pending: <Clock size={20} className="text-yellow-600" />,
    submitted: <Clock size={20} className="text-blue-600" />,
  };

  return (
    <div className="flex h-screen">
      <Sidebar userRole={user?.role} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-8 bg-gray-100">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Reports</h2>
            {user?.role === 'employee' && (
              <button
                onClick={() => setShowForm(!showForm)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
              >
                <Plus size={20} /> Submit Report
              </button>
            )}
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow mb-8">
              <textarea
                placeholder="Write your end-of-day report..."
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full border rounded px-3 py-2 mb-4"
                rows="6"
                required
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Submit Report
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setSummary('');
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
              {reports.length === 0 ? (
                <p className="text-gray-500">No reports found</p>
              ) : (
                reports.map((report) => (
                  <div key={report.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {statusIcons[report.status]}
                          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusColors[report.status]}`}>
                            {report.status?.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{report.summary}</p>
                        <div className="mt-4 flex justify-between text-sm text-gray-500">
                          <span>User: {report.name}</span>
                          <span>Submitted: {new Date(report.created_at).toLocaleDateString()}</span>
                        </div>
                      </div>
                      {(user?.role === 'manager' || user?.role === 'admin') && report.status === 'submitted' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleApprove(report.id)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(report.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                          >
                            Reject
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
