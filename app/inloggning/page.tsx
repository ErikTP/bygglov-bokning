"use client"

//shadcn ui

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {Separator} from "@/components/ui/separator"
import Link from "next/link"

//react icons
import { FaGithub } from "react-icons/fa"
import { FcGoogle } from "react-icons/fc"

const inloggning = () => {
  return (
    <div className="h-full flex items-center justify-center bg-[#18153f]">
        <Card className="w-full max-w-[600px] p-10 shadow-xl">
            <CardHeader>
                <CardTitle className="text-5xl font-bold text-center">
                    Logga in
                </CardTitle>
                <CardDescription className="text-xl text-center text-muted-foreground mt-2">
                    Använd Email eller Bank ID för att logga in
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <form action="" className=" m-4 flex flex-col gap-6"> 
                    <Input 
                        className="h-14" 
                        type="email"
                        disabled= {false}
                        placeholder="Email"
                        value={""}
                        onChange={()=>{}}
                        required
                    />   

                    <Input 
                        className="h-14" 
                        type="password"
                        disabled= {false}
                        placeholder="Lösenord"
                        value={""}
                        onChange={()=>{}}
                        required
                    />   
                     
                    <Button 
                        className="h-14 w-full"
                        size="lg"
                        disabled={false}
                    > Logga in
                    </Button>
                </form>
          <div className="mt-8 space-y-6">
            <Separator />
                <div className="flex my-2 justify-evenly mx-auto items-center">
                    <Button
                    disabled={false}
                    onClick={() => {}}
                    variant="outline"
                    size="lg"
                    className="h-16 w-16 bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                    <FcGoogle className="size-10 left-2.5 top-2.5" />
                    </Button>
                    <Button
                    disabled={false}
                    onClick={() => {}}
                    variant="outline"
                    size="lg"
                    className="h-16 w-16 bg-slate-300 hover:bg-slate-400 hover:scale-110"
                    >
                    <FaGithub className="size-10 left-2.5 top-2.5" />
                    </Button>
                </div>
                <p className="text-center text-2xl mt-6 text-muted-foreground">
                    Skapa nytt konto
                    <Link
                    className="text-sky-700 ml-4 hover:underline cursor-pointer"
                    href="registrering"
                    >
                    Registrera{" "}
                    </Link>
                </p>
          </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default inloggning