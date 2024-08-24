import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toTitleCase } from "@/lib/utils";
import axios from "axios";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Send = () => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state || {};
  const handleTransfer = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem("accessToken");
    try {
      await axios
        .post(
          "/account/transfer",
          { to: user._id, amount, headers: { authorization: `Bearer ${accessToken}` } },
        )
        .then((response) => {
          alert(response.data.message);
          navigate("/dashboard");
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className=" items-center w-[350px]">
        <CardHeader className="gap-2 mb-8">
          <CardTitle className="font-bold text-center text-4xl">
            Send Money
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full gap-4">
              <div className="flex flex-col  items-start space-y-1.5">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  />
                  <h2 className="font-bold text-center text-2xl ">
                    {toTitleCase(user.firstName + " " + user.lastName)}
                  </h2>
                </div>
                <Label htmlFor="password" className="font-semibold text-base">
                  Amount (in Rs)
                </Label>
                <Input
                  id="name"
                  type="number"
                  placeholder="Enter Amount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Link to="/dashboard">
            <Button
              className="w-full bg-green-500 hover:bg-green-600 "
              onClick={handleTransfer}
            >
              Initiate Transfer
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Send;
