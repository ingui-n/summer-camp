'use client';
import LoginForm from "@/components/loginForm";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function LoginPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/");
    }
  }, [router, session]);

  return (
    <>
      <h2>Login form</h2>
      <LoginForm/>
    </>
  );
}
