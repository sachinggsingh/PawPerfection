import React, { useState, useEffect } from 'react';
import api from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

const PaymentHistory = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await api.get('/payment/user-payments');
      if (response.data.success) {
        setPayments(response.data.data);
      } else {
        setError('Failed to fetch payment history');
      }
    } catch (error) {
      console.error('Payment history error:', error);
      setError('Failed to load payment history');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'canceled':
        return 'bg-gray-100 text-gray-800';
      case 'expired':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-500 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Payments</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button
          onClick={fetchPayments}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">No Payment History</h3>
        <p className="text-gray-600">You haven't made any payments yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Payment History</h2>
        <span className="text-sm text-gray-500">{payments.length} payment{payments.length !== 1 ? 's' : ''}</span>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div key={payment._id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {payment.trainingProgramId?.title || 'Training Program'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Week {payment.trainingProgramId?.week || 'N/A'} • {payment.trainingProgramId?.description || 'Dog Training Program'}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xl font-bold text-gray-800">₹{payment.price}</div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Payment Date:</span>
                  <p className="font-medium text-gray-800">{formatDate(payment.paymentDate)}</p>
                </div>
                <div>
                  <span className="text-gray-500">Payment Method:</span>
                  <p className="font-medium text-gray-800 capitalize">{payment.paymentMethod}</p>
                </div>
                <div>
                  <span className="text-gray-500">Currency:</span>
                  <p className="font-medium text-gray-800">{payment.paymentCurrency}</p>
                </div>
              </div>

              {payment.paymentOrderId && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-gray-500 text-xs">Order ID: {payment.paymentOrderId}</span>
                </div>
              )}
            </div>

            {payment.status === 'completed' && (
              <div className="bg-green-50 px-6 py-3 border-t border-green-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-green-700 text-sm font-medium">Payment completed successfully</span>
                </div>
              </div>
            )}

            {payment.status === 'failed' && (
              <div className="bg-red-50 px-6 py-3 border-t border-red-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-red-700 text-sm font-medium">Payment failed</span>
                </div>
              </div>
            )}

            {payment.status === 'pending' && (
              <div className="bg-yellow-50 px-6 py-3 border-t border-yellow-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-yellow-700 text-sm font-medium">Payment is being processed</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
