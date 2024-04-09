'use client'
import Link from "next/link"
import { login } from "@/api/users";
import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthProvider"
import { useRouter } from 'next/navigation'
import ToastContext from '@/context/ToastContext';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { auth, setAuth } = useContext(AuthContext);
    const router = useRouter();
    const { msg, type, setMsg, setType } = useContext(ToastContext);


    const validate = async () => {
        if (!email) {
            console.log("Email Required");
            return;
        }
        if (!password) {
            console.log("Password Required");
            return;
        }

        const data = {
            email,
            password
        }

        send(data);
    }

    const send = async (data) => {
        const res = await login(data);
        if (res?.status === 201) {
            console.log("success!")
            console.log(res);
            setAuth(res?.data?.data);
            router.push("/profile");

        }
        else {
            setMsg(res?.response?.data?.message || "Unknown Error");
            setType(0);
            return;
        }
    }



    return (
        <>

            <div className="bg-white flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">

                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gold">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(event) => {
                                            setEmail(event?.target?.value)
                                        }}
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={(event) => {
                                            setPassword(event?.target?.value)
                                        }}
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-gold focus:ring-gold"
                                    />
                                    <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm leading-6">
                                    <a href="#" className="font-semibold text-royal hover:text-gold">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    onClick={() => {
                                        validate();
                                    }}
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </div>


                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link href="/register" className="font-semibold leading-6 text-royal hover:text-gold">
                            Create Account Here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}