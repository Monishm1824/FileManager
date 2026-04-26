import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md text-center">
        <AlertCircle size={64} className="mx-auto text-red-600 mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <Link
          to="/dashboard"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition inline-block"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
