import React, { useState } from 'react';
import api from '../../utils/api';

const WebhookTest = () => {
  const [sessionId, setSessionId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const triggerWebhook = async (eventType = 'checkout.session.completed') => {
    if (!sessionId.trim()) {
      setError('Please enter a session ID');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await api.post('/webhook/debug-trigger', {
        sessionId: sessionId.trim(),
        eventType: eventType
      });
      setResult(response.data);
      console.log('Webhook trigger result:', response.data);
    } catch (error) {
      console.error('Webhook trigger error:', error);
      setError(error.response?.data?.error || error.message || 'Webhook trigger failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Webhook Test</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Session ID
          </label>
          <input
            type="text"
            value={sessionId}
            onChange={(e) => setSessionId(e.target.value)}
            placeholder="Enter Stripe session ID (cs_test_...)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => triggerWebhook('checkout.session.completed')}
            disabled={loading}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Triggering...' : 'Trigger Success Webhook'}
          </button>

          <button
            onClick={() => triggerWebhook('checkout.session.expired')}
            disabled={loading}
            className="flex-1 bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'Triggering...' : 'Trigger Expired Webhook'}
          </button>
        </div>
      </div>

      {result && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="font-semibold text-green-800 mb-2">Webhook Result:</h3>
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

      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="font-semibold text-blue-800 mb-2">Instructions:</h3>
        <ol className="text-sm text-blue-700 space-y-1 list-decimal list-inside">
          <li>Complete a payment to get a session ID</li>
          <li>Copy the session ID from the URL or console logs</li>
          <li>Paste it above and click "Trigger Success Webhook"</li>
          <li>Check your database to see if the payment status updated</li>
        </ol>
      </div>
    </div>
  );
};

export default WebhookTest;
