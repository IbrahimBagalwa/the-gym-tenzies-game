const Die = ({ value, isHeld, holdDie }) => {
  return (
    <div
      className={`h-14 w-14 die rounded-xl flex items-center justify-center cursor-pointer ${
        isHeld ? "bg-[#59E391]" : "bg-white"
      }`}
      onClick={holdDie}
    >
      <h2 className="text-4xl font-bold">{value}</h2>
    </div>
  );
};
export default Die;
