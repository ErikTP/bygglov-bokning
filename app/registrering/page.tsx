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
import {toast} from "sonner"
import { useRouter } from "next/navigation"
import { TriangleAlert } from "lucide-react"
import { signIn } from "next-auth/react"


const registrering = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
        const data = await res.json();

    if (res.ok) {
      setPending(false);
      toast.success(data.message);
      router.push("/inloggning");
    } else if (res.status === 400) {
      setError(data.message);
      setPending(false);
    } else if (res.status === 500) {
      setError(data.message);
      setPending(false);
    }
  };

    const handleProvider = (
    event: React.MouseEvent<HTMLButtonElement>,
    value: "github" | "google"
  ) => {
    event.preventDefault();
    signIn(value, { callbackUrl: "/redirect" });
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#29547B]">
        <Card className="w-full max-w-150 p-10 shadow-xl">
            <CardHeader>
                <CardTitle className="text-5xl font-bold text-center">
                    Registrera dig
                </CardTitle>
                <CardDescription className="text-xl text-center text-muted-foreground mt-2">
                    Använd Email eller Bank ID för att skapa account
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
                        type="text"
                        disabled= {pending}
                        placeholder="Användarnamn"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required

                    />   
                    <Input 
                        className="h-14" 
                        type="email"
                        disabled= {pending}
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                    />   

                    <Input 
                        className="h-14" 
                        type="password"
                        disabled= {pending}
                        placeholder="Lösenord"
                        value={form.password}
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                        required
                    />   
                    
                    <Input 
                        className="h-14" 
                        type="password"
                        disabled= {pending}
                        placeholder="Bekräfta lösenord"
                        value={form.confirmPassword}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                        required
                    />   
                    <Button 
                        className="h-14 w-full"
                        size="lg"
                        disabled={false}
                    > Registrera
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
                    className="h-16 w-16 bg-slate-100 hover:bg-slate-300 hover:scale-110"
                    >
                    <FcGoogle className="size-10 left-2.5 top-2.5" />
                    </Button>
                    <Button
                    disabled={false}
                    onClick={(e) => handleProvider(e, "github")}
                    variant="outline"
                    size="lg"
                    className="h-16 w-16 bg-slate-100 hover:bg-slate-300 hover:scale-110"
                    >
                    <FaGithub className="size-10 left-2.5 top-2.5" />
                    </Button>
                </div>
                <p className="text-center text-2xl mt-6 text-muted-foreground">
                    Har du redan ett konto?
                    <Link
                    className="text-sky-700 ml-4 hover:underline cursor-pointer"
                    href="inloggning"
                    >
                    Logga in{" "}
                    </Link>
                </p>
          </div>
            </CardContent>
        </Card>
    </div>
  )
}

export default registrering