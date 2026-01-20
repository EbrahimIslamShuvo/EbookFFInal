import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authHeader, API_BASE_URL } from "../../config/api";
import { getCartList } from "../../Data/addToCartList";

const Checkout = ({ book }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get book from props, location state, or cart
  const checkoutBook =
    book ||
    location.state?.book ||
    (getCartList().length > 0 ? getCartList()[0] : null);

  const handlePayment = async () => {
    if (!checkoutBook) {
      setError("No book selected for checkout");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const bookId = checkoutBook._id || checkoutBook.id;
      const amount = checkoutBook.price;

      if (!bookId || !amount) {
        throw new Error("Invalid book data");
      }

      const res = await fetch(`${API_BASE_URL}/payment/init`, {
        method: "POST",
        headers: {
          ...authHeader(),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          amount,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Payment initialization failed");
      }

      const data = await res.json();

      if (!data.success || !data.url) {
        throw new Error("Failed to get payment gateway URL");
      }

      // Redirect to SSLCommerz payment gateway
      window.location.href = data.url;
    } catch (err) {
      setError(err.message || "An error occurred during payment");
      setLoading(false);
    }
  };

  // If no book, show message
  if (!checkoutBook) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">No Book Selected</h2>
        <p className="text-gray-600 mb-6">
          Please add a book to your cart first
        </p>
        <button
          onClick={() => navigate("/all-books")}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded"
        >
          Browse Books
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

        {/* Book Summary */}
        <div className="border-b pb-6 mb-6">
          <div className="flex gap-4">
            <img
              src={
                checkoutBook.cover?.startsWith("http")
                  ? checkoutBook.cover
                  : `http://localhost:3000${checkoutBook.cover}`
              }
              alt={checkoutBook.title}
              className="w-24 h-32 object-cover rounded"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/150x200?text=No+Image";
              }}
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-2">
                {checkoutBook.title}
              </h3>
              <p className="text-gray-600 mb-2">
                Author: {checkoutBook.author || "Unknown"}
              </p>
              <p className="text-lg font-bold text-blue-600">
                ৳ {checkoutBook.price}
              </p>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>৳ {checkoutBook.price}</span>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span>৳ {checkoutBook.price}</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full px-6 py-3 font-bold rounded transition duration-200 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {loading ? "Processing..." : "Proceed to Payment"}
        </button>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="w-full mt-3 px-6 py-3 font-bold rounded border border-gray-300 text-gray-700 hover:bg-gray-50 transition duration-200"
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Checkout;
