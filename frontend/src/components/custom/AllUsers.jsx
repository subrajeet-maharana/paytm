import { Input } from "../ui/input";
import User from "./User";

const AllUsers = ({ users }) => {
  return (
    <div>
      <div className="text-lg font-bold mt-6 ">Users</div>
      <Input placeholder="Search users..." className="mt-2" />

      {users.map((user) => (
        <User key={Math.random().toFixed(3) * 1000} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
