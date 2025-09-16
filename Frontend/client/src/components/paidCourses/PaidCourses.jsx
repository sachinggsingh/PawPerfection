import React, { useEffect, useMemo, useState } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

export const PaidCourses = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await api.get('/payment/user-payments');
        if (res?.data?.success) {
          setPayments(res.data.data || []);
        } else {
          setError('Failed to fetch purchases');
        }
      } catch (e) {
        setError(e.response?.data?.msg || 'Unable to load purchases');
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const completedCourses = useMemo(() => {
    const completed = payments.filter((p) => p.status === 'completed' && p.trainingProgramId);
    // Deduplicate by trainingProgramId
    const seen = new Set();
    return completed.filter(({ trainingProgramId }) => {
      const id = typeof trainingProgramId === 'object' ? trainingProgramId._id : trainingProgramId;
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [payments]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-lg bg-red-50 border border-red-200">
        <p className="text-red-700 text-sm">{error}</p>
      </div>
    );
  }

  if (completedCourses.length === 0) {
    return (
      <div className="text-center p-10">
        <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">No purchases yet</h3>
        <p className="text-gray-600 text-sm mt-1">Purchased courses will appear here once your payment completes.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">Your Purchases</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {completedCourses.map((payment) => {
          const course = payment.trainingProgramId || {};
          const courseId = course._id || payment.trainingProgramId;
          return (
            <div key={payment._id} className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{course.title || 'Training Program'}</h3>
                    <p className="text-sm text-gray-600 mt-1">Week {course.week || '—'}</p>
                  </div>
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">Purchased</span>
                </div>
                {course.description && (
                  <p className="text-gray-700 text-sm mt-3 line-clamp-3">{course.description}</p>
                )}

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-500">Amount Paid</p>
                    <p className="font-semibold text-gray-900">₹{payment.price}</p>
                  </div>
                  <div className="p-3 bg-gray-50 rounded-lg border">
                    <p className="text-gray-500">Purchased On</p>
                    <p className="font-semibold text-gray-900">{new Date(payment.paymentDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <a
                    href={`/course/${courseId}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium"
                  >
                    Continue Learning
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
