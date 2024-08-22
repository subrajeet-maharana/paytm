import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "../../axiosConfig";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//Creating a new axios instance for signup
const axiosAuth = axios.create();

const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      axiosAuth
        .post("/user/signup", {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        })
        .then((response) => console.log(response.data))
        .catch((error) => console.log(error));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="items-center w-[400px]">
        <CardHeader className="gap-2">
          <CardTitle className="font-bold text-4xl text-center">
            Sign Up
          </CardTitle>
          <CardDescription className="text-base text-center font-semibold text-gray-400">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full gap-4">
              <div className="flex flex-col items-start space-y-1.5">
                <Label htmlFor="firstName" className="font-semibold text-base">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  placeholder="Subrajeet"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5">
                <Label htmlFor="lastName" className="font-semibold text-base">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  placeholder="Maharana"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5">
                <Label htmlFor="email" className="font-semibold text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Subrajeet@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5">
                <Label htmlFor="password" className="font-semibold text-base">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" onClick={handleSubmit}>
            Sign Up
          </Button>
          <div>
            <Label className="mr-2.5">Already have an account?</Label>
            <Link to="/signin" className="font-medium underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;
