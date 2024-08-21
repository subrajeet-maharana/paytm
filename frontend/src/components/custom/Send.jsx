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

export function Send() {
  return (
    <Card className="items-center w-[350px]">
      <CardHeader className="gap-2 mb-8">
        <CardTitle className="font-bold text-4xl">Send Money</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full gap-4">
            <div className="flex flex-col  items-start space-y-1.5">
                <div className="flex items-center gap-4">
                <img alt=""
          src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
        />
            <h2 className="font-bold text-2xl">Friend's Name</h2>
            </div>
              <Label htmlFor="password" className="font-semibold text-base">Amount (in Rs)</Label>
              <Input id="name" type="number" placeholder="Enter Amount" />
            </div>
           </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-3">
        <Button className="w-full bg-green-500 hover:bg-green-600">Initiate Transfer</Button>
      </CardFooter>
    </Card>
  )
}

