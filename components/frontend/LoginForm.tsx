"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Link from "next/link";

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      setLoading(true);

      const loginData = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (loginData?.error) {
        toast.error("Sign-in error: Check your credentials");
      } else {
        toast.success("Login Successful");
        reset();
        router.push("/");
      }
    } catch (error) {
      console.error("Network Error:", error);
      toast.error("It seems something is wrong with your Network");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          {...register("email", { required: true })}
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                     focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@company.com"
          required
        />
        {errors.email && (
          <small className="text-red-600 text-sm">This field is required</small>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          {...register("password", { required: true })}
          type="password"
          id="password"
          placeholder="••••••••"
          className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg
                     focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5
                     dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                     dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {errors.password && (
          <small className="text-red-600 text-sm">This field is required</small>
        )}
      </div>

      <div className="flex gap-4 items-center">
        <Link
          href="/forgot-password"
          className="shrink-0 font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Forgot Password
        </Link>

        {loading ? (
          <button
            disabled
            type="button"
            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                       text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600
                       dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-white animate-spin"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051..."
                fill="#E5E7EB"
              />
              <path
                d="M93.9676 39.0409C96.393..."
                fill="currentColor"
              />
            </svg>
            Signing you in please wait...
          </button>
        ) : (
          <button
            type="submit"
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4
                       focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                       text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                       dark:focus:ring-blue-800"
          >
            Login
          </button>
        )}
      </div>

      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline dark:text-blue-500"
        >
          Sign Up
        </Link>
      </p>
    </form>
  );
}
