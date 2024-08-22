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
import { Link } from "react-router-dom";

const Signin = () => {
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
                  id="name"
                  type="email"
                  placeholder="Subrajeet@example.com"
                />
              </div>
              <div className="flex flex-col items-start space-y-1.5">
                <Label htmlFor="password" className="font-semibold text-base">
                  Password
                </Label>
                <Input id="name" type="password" placeholder="Password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">Sign In</Button>
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
