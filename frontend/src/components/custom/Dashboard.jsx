import { useState, useEffect } from "react";
import Appbar from "./Appbar";
import Balance from "./Balance";
import AllUsers from "./AllUsers";
import axios from "axios";
const Dashboard = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        try {
            axios
                .get("/user/allusers", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                })
                .then((res) => {
                    console.log(res.data.users);
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