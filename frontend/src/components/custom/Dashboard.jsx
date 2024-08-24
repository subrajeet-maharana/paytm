import { useState, useEffect } from "react";
import Appbar from "./Appbar";
import Balance from "./Balance";
import AllUsers from "./AllUsers";
import axios from "../../axiosConfig";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    try {
      axios
        .get("/user/allusers", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((res) => {
          setUsers(res.data.users);
        });
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  return (
    <>
      <Appbar />
      <div className="m-4">
        <Balance />
        <AllUsers users={users} />
      </div>
    </>
  );
};
export default Dashboard;
