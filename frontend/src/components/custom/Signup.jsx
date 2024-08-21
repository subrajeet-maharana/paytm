import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Signup() {
  return (
    <Card className="items-center w-[350px]">
      <CardHeader className="gap-2">
        <CardTitle className="font-bold text-4xl">Sign Up</CardTitle>
        <CardDescription className="text-lg font-semibold text-gray-400">Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full gap-4">
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="name" className="font-semibold text-base">First Name</Label>
              <Input id="name" placeholder="Subrajeet" />
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="name" className="font-semibold text-base">Last Name</Label>
              <Input id="name" placeholder="Maharana" />
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="email" className="font-semibold text-base">Email</Label>
              <Input id="name" type="email" placeholder="Subrajeet@example.com" />
            </div>
            <div className="flex flex-col items-start space-y-1.5">
              <Label htmlFor="password" className="font-semibold text-base">Password</Label>
              <Input id="name" type="password" placeholder="Password" />
            </div>
           </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full">Sign Up</Button>
        <div> 
            <Label className="mr-2.5">Already have an account?</Label>
            <a href="" className="font-medium underline">Login</a>
        </div>
      </CardFooter>
    </Card>
  )
}
