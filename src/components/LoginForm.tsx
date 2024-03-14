"use client";

import { signIn } from "next-auth/react";
// import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import Link from "next/link";
// import { Link } from "lucide-react";

export default function LoginForm() {
  return (
    <div className="container flex h-screen w-full items-center justify-center">
      <div className="form">
        <LoginButton />
      </div>
    </div>
  );
}

function LoginButton() {
  return (
    <>
    <Link href="/register">Register</Link>
    <Button
      className="mt-4 w-full p-12 text-[20px] font-extrabold active:bg-black active:text-white"
      variant={"outline"}
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Log in with Google
    </Button>
    </>
  );
}