const Balance = ({ balance }) => {
  return (
    <div className=" flex justify-left gap-2 mt-4 text-lg">
      <div className="font-bold ">Your Balance</div>
      <div className="font-semibold">Rs: {balance}</div>
    </div>
  );
};

export default Balance;
