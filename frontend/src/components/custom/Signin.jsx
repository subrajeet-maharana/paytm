import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";

const axiosAuth = axios.create();

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosAuth
        .post("/user/signin", {
          email,
          password,
        })
        .then((response) => {
          console.log(response.data);
          localStorage.setItem("accessToken", response.data.accessToken);
          localStorage.setItem("refreshToken", response.data.refreshToken);
          navigate("/dashboard");
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="items-center w-[350px]">
        <CardHeader className="gap-2">
          <CardTitle className="font-bold text-4xl text-center">
            Sign In
          </CardTitle>
          <CardDescription className="text-base text-center font-semibold text-gray-400">
            Enter your credentials to access your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full gap-4">
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
            Sign In
          </Button>
          <div>
            <Label className="mr-2.5">Don&apos;t have an account?</Label>
            <Link to="/signup" className="font-medium text-sm underline">
              Sign Up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;
