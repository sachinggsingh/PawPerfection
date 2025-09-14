import React, { useState } from 'react';
import api from '../../utils/api';

const PaymentTest = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const testStripeConnection = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.get('/payment/test-stripe');
      setResult(response.data);
      console.log('Stripe test result:', response.data);
    } catch (error) {
      console.error('Stripe test error:', error);
      setError(error.response?.data?.msg || error.message || 'Test failed');
    } finally {
      setLoading(false);
    }
  };

  const testPaymentCreation = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.post('/payment/create-payment', {
        price: 100,
        trainingProgramId: '507f1f77bcf86cd799439011' // Replace with a valid training program ID
      });
      setResult(response.data);
      console.log('Payment creation result:', response.data);
    } catch (error) {
      console.error('Payment creation error:', error);
      setError(error.response?.data?.msg || error.message || 'Payment creation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Payment System Test</h2>
      
      <div className="space-y-4">
        <button
          onClick={testStripeConnection}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Stripe Connection'}
        </button>

        <button
          onClick={testPaymentCreation}
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Testing...' : 'Test Payment Creation'}
        </button>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Test Result:</h3>
          <pre className="text-sm text-green-700 overflow-auto">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Error:</h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}
    </div>
  );
};

export default PaymentTest;
