
const Button = ({ generateDie, tenzies }) => {
  return (
    <div
      className="bg-[#5035FF] roll rounded text-white font-bold text-base px-16 py-4 cursor-pointer"
      onClick={generateDie}
    >
      {tenzies ? "New Game" : "Roll"}
    </div>
  );
};

export default Button;
