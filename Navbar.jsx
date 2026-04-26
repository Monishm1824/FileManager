import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/api';
import { LogOut, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const user = authService.getUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">TaskMaster</h1>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden flex items-center"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className={`${isOpen ? 'block' : 'hidden'} md:flex items-center gap-4`}>
            <span className="text-sm">{user?.name}</span>
            <span className="text-xs bg-blue-800 px-2 py-1 rounded">{user?.role?.toUpperCase()}</span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-3 py-2 rounded"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
