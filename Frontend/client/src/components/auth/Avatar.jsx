import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/loginSlice';
import { User, LogOut, Settings, PawPrint } from 'lucide-react';

const Avatar = () => {
  const { user } = useSelector(state => state.auth);

  console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async()=>
  {
    try
    {
      await dispatch(logout()).unwrap()
      navigate('/')
    }
    catch(error)
    {
      console.log(error)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/login')}
          className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-50"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          {user.image ? (
            <img
              src={user.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-indigo-600" />
          )}
        </div>
       
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded shadow-lg ring-1 ring-black ring-opacity-10 z-50">
  <div className="px-4 py-3 border-b border-gray-100">
    <p className="text-sm text-gray-600">Signed in as</p>
    <p className="text-sm font-medium text-gray-900 truncate">{user.email}</p>
  </div>

  <div className="py-1">
    <button
      onClick={() => navigate('/profile')}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
    >
      <Settings className="w-4 h-4 mr-2 text-gray-500" />
      Profile Settings
    </button>

    <button
      onClick={() => navigate('/pet')}
      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors"
    >
      <PawPrint className="w-4 h-4 mr-2 text-gray-500" />
      Pet Register
    </button>

    <button
      onClick={handleLogout}
      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-300 transition-colors"
    >
      <LogOut className="w-4 h-4 mr-2 text-red-500" />
      Logout
    </button>
  </div>
</div>
      )}
    </div>
  );
};

export default Avatar;