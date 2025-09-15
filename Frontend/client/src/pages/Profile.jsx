import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PaymentHistory from "../components/payment/PaymentHistory";
import api from "../utils/api";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { PaidCourses } from '../components/paidCourses/PaidCourses';

export const Profile = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/auth/profile');
      if (response?.data?.user) {
        useDispatch(user(response.data.user));
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
    } 
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSpinner size="lg" />
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen  py-8 mt-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {user?.name?.charAt(0)?.toUpperCase() ||
                    user?.email?.charAt(0)?.toUpperCase() ||
                    'U'}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">
                  {user?.name || user?.email?.split('@')[0] || 'U'}
                </h1>
                <p className="text-gray-600">{user?.email}</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'profile'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Profile Information
                </button>
                <button
                  onClick={() => setActiveTab('payments')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'payments'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Payment History
                </button>
                <button
                  onClick={() => setActiveTab('purchases')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'purchases'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Purchases
                </button>
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800">Profile Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {user?.name || user?.email?.split('@')[0] || 'Not provided'}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="p-3 bg-gray-50 rounded-lg border">
                        {user?.email}
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-2 ">
                    <button
                      onClick={() => navigate('/course')}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                    >
                      Browse Courses
                    </button>
                    <button
                      onClick={handleLogout}
                      className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-300 transition-colors cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'payments' && <PaymentHistory />}

              {activeTab === 'purchases' && <PaidCourses />}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
