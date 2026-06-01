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
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { TriangleAlert } from "lucide-react"

const inloggning = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [pending, setPending] = useState(false);
    const router = useRouter()
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setPending(true);
        const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
        });
        if (res?.ok) {
        router.push("/");
        toast.success("login successful");
        } else if (res?.status === 401) {
        setError("Invalid Credentials");
        setPending(false);
        } else {
        setError("Something went wrong");
        }
    };

  return (
    <div className="h-full flex items-center justify-center bg-[#18153f]">
        <Card className="w-full max-w-150 p-10 shadow-xl">
            <CardHeader>
                <CardTitle className="text-5xl font-bold text-center">
                    Logga in
                </CardTitle>
                <CardDescription className="text-xl text-center text-muted-foreground mt-2">
                    Använd Email eller Bank ID för att logga in
                </CardDescription>
            </CardHeader>
            {!!error && (
                    <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive mb-6">
                        <TriangleAlert />
                        <p>{error}</p>
                    </div>
                )}
            <CardContent className="space-y-6">
                <form onSubmit={handleSubmit} className=" m-4 flex flex-col gap-6"> 
                    <Input 
                        className="h-14" 
                        type="email"
                        disabled= {pending}
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />   

                    <Input 
                        className="h-14" 
                        type="password"
                        disabled= {pending}
                        placeholder="Lösenord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />   
                     
                    <Button 
                        className="h-14 w-full"
                        size="lg"
                        disabled={pending}
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