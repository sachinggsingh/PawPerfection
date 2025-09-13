import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    const sId = searchParams.get("session_id");
    if (sId) setSessionId(sId);
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full text-center p-8 border rounded-lg">
        <h1 className="text-2xl font-bold mb-2">Payment Successful 🎉</h1>
        <p className="text-gray-600 mb-4">Thank you! Your payment has been processed.</p>
        {sessionId && (
          <p className="text-xs text-gray-500 mb-4">Session ID: {sessionId}</p>
        )}
        <button
          onClick={() => navigate("/course")}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Go to Courses
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;


