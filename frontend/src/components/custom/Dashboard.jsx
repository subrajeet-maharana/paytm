import Appbar from "./Appbar";
import Balance from "./Balance";
import AllUsers from "./AllUsers";

const Dashboard = () => {
  return (
    <>
      <Appbar />
      <div className="m-4">
        <Balance balance={6000} />
        <AllUsers
          users={[
            { fullName: "Rakesh Kumar Nahak" },
            { fullName: "Subrajeet maharana" },
          ]}
        />
      </div>
    </>
  );
};

export default Dashboard;
