import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../utils/api';
import LoadingSpinner from '../common/LoadingSpinner';

const Payment = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [paymentData, setPaymentData] = useState(null);

    // Get payment data from location state or props
    const trainingProgram = location.state?.trainingProgram;
    const price = location.state?.price;

    useEffect(() => {
        if (!trainingProgram || !price) {
            setError('Missing payment information. Please try again.');
        }
    }, [trainingProgram, price]);

    const handlePayment = async () => {
        if (!trainingProgram || !price) {
            setError('Missing payment information');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const response = await api.post('/payment/create-payment', {
                trainingProgramId: trainingProgram._id,
                price: price
            });

            if (response.data.success && response.data.data.url) {
                // Redirect to Stripe Checkout
                window.location.href = response.data.data.url;
            } else {
                setError('Failed to create payment session');
            }
        } catch (error) {
            console.error('Payment creation error:', error);
            setError(
                error.response?.data?.msg || 
                'Failed to create payment. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    if (!trainingProgram || !price) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="text-red-500 mb-4">
                        <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 mb-2">Payment Error</h2>
                    <p className="text-gray-600 mb-6">{error || 'Missing payment information'}</p>
                    <button
                        onClick={() => navigate('/courses')}
                        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Courses
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-2xl mx-auto px-4">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6 text-white">
                        <h1 className="text-2xl font-bold">Complete Your Payment</h1>
                        <p className="text-blue-100 mt-1">Secure payment powered by Stripe</p>
                    </div>

                    {/* Payment Summary */}
                    <div className="p-8">
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
                            <div className="bg-gray-50 rounded-lg p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-semibold text-gray-800">{trainingProgram.title}</h3>
                                        <p className="text-gray-600 text-sm mt-1">
                                            Week {trainingProgram.week} • Dog Training Program
                                        </p>
                                        {trainingProgram.description && (
                                            <p className="text-gray-500 text-sm mt-2">
                                                {trainingProgram.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center text-lg font-semibold">
                                        <span>Total Amount</span>
                                        <span className="text-green-600">₹{price}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Payment Features */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">Secure Payment Features</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-600">SSL Encrypted</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-600">Stripe Protected</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm text-gray-600">Card & UPI</span>
                                </div>
                            </div>
                        </div>

                        {/* Error Display */}
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-red-700 text-sm">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Payment Button */}
                        <div className="space-y-4">
                            <button
                                onClick={handlePayment}
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            >
                                {loading ? (
                                    <>
                                        <LoadingSpinner size="sm" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span>Pay ₹{price}</span>
                                    </>
                                )}
                            </button>
                            
                            <button
                                onClick={() => navigate('/courses')}
                                className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                            >
                                Cancel & Return to Courses
                            </button>
                        </div>

                        {/* Security Notice */}
                        <div className="mt-6 text-center">
                            <p className="text-xs text-gray-500">
                                Your payment information is secure and encrypted. 
                                We use Stripe for secure payment processing.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
