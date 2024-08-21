import User from "./User";

const AllUsers = ({ users }) => {
  return (
    <div>
      <div className="text-lg font-bold mt-6 ">Users</div>
      <input
        type="text"
        placeholder="Search users..."
        className="mt-2 px-2 py-1 w-full border rounded border-slate-900"
      />
      {users.map((user) => (
        <User key={Math.random().toFixed(2) * 1000} user={user} />
      ))}
    </div>
  );
};

export default AllUsers;
