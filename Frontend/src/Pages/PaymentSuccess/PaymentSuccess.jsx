import { useEffect } from "react";
import { clearCartList } from "../../Data/addToCartList";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 🔥 clear cart after successful payment
    clearCartList();

    // optional: redirect after 2s
    setTimeout(() => {
      navigate("localhost:5173");
    }, 5000);
  }, [navigate]);

  return (
    <div className="max-w-xl mx-auto py-20 text-center">
      <h2 className="text-3xl font-bold text-green-600 mb-4">
        Payment Successful 🎉
      </h2>
      <p className="text-gray-600">
        Your books are now available in My Library
      </p>
    </div>
  );
};

export default PaymentSuccess;
