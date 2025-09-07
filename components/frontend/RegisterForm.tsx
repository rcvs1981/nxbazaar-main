"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import SubmitButton from "../FormInputs/SubmitButton";
import TextInput from "../FormInputs/TextInput";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  role?: string;
  plan?: string | null;
}

export default function RegisterForm({ role = "USER" }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan");
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>();
  const [loading, setLoading] = useState(false);
  const [emailErr, setEmailErr] = useState("");

  async function onSubmit(data: RegisterFormData) {
    data.plan = plan;
    setLoading(true);
    setEmailErr("");
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();

      if (response.ok) {
        toast.success("User Created Successfully");
        reset();
        const { data } = responseData;
        if (role === "USER") router.push("/");
        else router.push(`/verify-email?userId=${data.id}`);
      } else {
        if (response.status === 409) setEmailErr("User with this Email already exists");
        toast.error(responseData?.error || "Something Went Wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Network Error: Please Try Again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextInput {...{ label: "", name: "role", register, errors, type: "hidden", defaultValue: role }} />
      <TextInput {...{ label: "Your Full Name", name: "name", register, errors, type: "text" }} />
      <TextInput {...{ label: "Email Address", name: "email", register, errors, type: "email" }} />
      {emailErr && <small className="text-red-600">{emailErr}</small>}
      <TextInput {...{ label: "Password", name: "password", register, errors, type: "password" }} />
      <SubmitButton isLoading={loading} buttonTitle="Register" loadingButtonTitle="Creating Please wait..." />
      <div className="flex gap-2 justify-between">
        <p>Already have an account? <Link href="/login">Login</Link></p>
        {role === "USER" ? (
          <p>Are you a Farmer? <Link href="/farmer-pricing">Register here</Link></p>
        ) : (
          <p>Are you a User? <Link href="/register">Register here</Link></p>
        )}
      </div>
    </form>
  );
}
