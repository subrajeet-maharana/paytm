import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { toTitleCase } from "@/lib/utils";
const User = ({ user }) => {
  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex justify-center items-center gap-2">
        <div className="w-7 h-7 flex justify-center items-center text-slate-900 font-medium bg-slate-200  rounded-full ">
          <div>{user.firstName[0].toUpperCase()}</div>
        </div>
        <div>{toTitleCase(user.firstName + " " + user.lastName)}</div>
      </div>
      <div>
        <Link to="/send">
          <Button>Send Money</Button>
        </Link>
      </div>
    </div>
  );
};

export default User;
