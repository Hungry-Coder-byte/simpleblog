import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      // Handle successful logout (e.g., redirect or update state)
    } catch (err) {
      setError('Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">SimpleBlog</Link>
        <div className="flex space-x-4">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
          <Link to="/create" className="text-gray-300 hover:text-white">Create Article</Link>
          <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
          <button 
            onClick={handleLogout} 
            className="text-gray-300 hover:text-white"
            disabled={loading}
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
    </nav>
  );
};

export default Navbar;