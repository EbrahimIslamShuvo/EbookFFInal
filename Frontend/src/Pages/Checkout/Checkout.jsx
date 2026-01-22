import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL, authHeader } from "../../config/api";
import {
  getCartList,
  clearCartList,
} from "../../Data/addToCartList";

const Checkout = () => {
  const navigate = useNavigate();

  const [cartItems] = useState(getCartList());
  const [purchasedIds, setPurchasedIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔥 Load purchased books
  useEffect(() => {
    const loadPurchased = async () => {
      try {
        const res = await fetch(
          `${API_BASE_URL}/books/purchased/my`,
          { headers: authHeader() }
        );
        const data = await res.json();

        const ids =
          data?.data?.map((p) =>
            p.bookId?._id?.toString()
          ) || [];

        setPurchasedIds(ids);
      } catch {
        setPurchasedIds([]);
      }
    };

    loadPurchased();
  }, []);

  // 🔎 split cart items
  const purchasableBooks = cartItems.filter(
    (b) =>
      !purchasedIds.includes(b._id || b.id)
  );

  const blockedBooks = cartItems.filter((b) =>
    purchasedIds.includes(b._id || b.id)
  );

  const totalAmount = purchasableBooks.reduce(
    (sum, b) => sum + Number(b.price || 0),
    0
  );

  const handlePayment = async () => {
    if (purchasableBooks.length === 0) {
      setError(
        "All selected books are already purchased"
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_BASE_URL}/payment/init`,
        {
          method: "POST",
          headers: {
            ...authHeader(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookIds: purchasableBooks.map(
              (b) => b._id || b.id
            ),
            amount: totalAmount,
          }),
        }
      );

      const data = await res.json();

      if (!data.success) {
        throw new Error(
          data.message || "Payment failed"
        );
      }

      clearCartList();
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h2 className="text-2xl font-bold mb-6">
        Checkout
      </h2>

      {/* 🛒 CART */}
      {cartItems.map((book) => {
        const id = book._id || book.id;
        const purchased = purchasedIds.includes(id);

        return (
          <div
            key={id}
            className="flex gap-4 border-b pb-4 mb-4"
          >
            <img
              src={`http://localhost:3000${book.cover}`}
              className="w-20 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-semibold">
                {book.title}
              </h3>

              {purchased ? (
                <span className="text-sm text-red-500 font-semibold">
                  ✔ Already Purchased
                </span>
              ) : (
                <p className="font-bold text-[#3059b8]">
                  ৳ {book.price}
                </p>
              )}
            </div>
          </div>
        );
      })}

      {/* 💰 TOTAL */}
      <div className="flex justify-between font-bold mb-6">
        <span>Total</span>
        <span className="text-[#3059b8]">
          ৳ {totalAmount}
        </span>
      </div>

      {/* ❌ ERROR */}
      {error && (
        <p className="text-red-500 mb-4">
          {error}
        </p>
      )}

      {/* 💳 PAY */}
      <button
        onClick={handlePayment}
        disabled={
          loading || purchasableBooks.length === 0
        }
        className={`w-full py-3 rounded text-white font-semibold ${
          loading || purchasableBooks.length === 0
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-[#3059b8] hover:bg-blue-700"
        }`}
      >
        {loading
          ? "Processing..."
          : "Proceed to Payment"}
      </button>

      <button
        onClick={() => navigate(-1)}
        className="w-full mt-3 border py-3 rounded"
      >
        Go Back
      </button>
    </div>
  );
};

export default Checkout;
