import { useState, useEffect } from "react";
import axios from "../../axiosConfig.js";
const Balance = () => {
  const [balance, setBalance] = useState("");
  useEffect(() => {
    try {
      axios
        .get("/account/balance", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          console.log(res.data.balance);
          setBalance(res.data.balance);
        });
    } catch (error) {
      console.error(error.message);
    }
  }
  );

  return (
    <div className=" flex justify-left gap-2 mt-4 text-lg">
      <div className="font-bold ">Your Balance</div>
      <div className="font-semibold">Rs: {balance}</div>
    </div>
  );
};

export default Balance;
