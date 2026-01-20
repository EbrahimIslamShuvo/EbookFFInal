import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full text-center">
        <div className="mb-6">
          <svg
            className="w-24 h-24 mx-auto text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h1>

        <p className="text-gray-600 mb-2">
          Thank you for your purchase. Your book has been added to your library.
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Redirecting to your dashboard in 5 seconds...
        </p>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition duration-200"
        >
          Go to Dashboard
        </button>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            You can access your purchased books anytime from your dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
