const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-[#3059b8] text-white px-5 py-2 rounded hover:bg-[#244a9a]"
    >
      {text}
    </button>
  );
};

export default Button;
