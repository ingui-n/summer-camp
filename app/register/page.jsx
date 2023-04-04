'use client';
import RegisterForm from "@/components/registerForm";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function RegisterPage() {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.replace("/");
    }
  }, [router, session]);

  return (
    <>
      <h2>Registration form</h2>
      <RegisterForm/>
    </>
  );
}