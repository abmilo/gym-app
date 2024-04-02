'use client'
import Link from "next/link"
import { register } from "@/api/users";
import { useState } from 'react'
import { useRouter } from 'next/navigation'


export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const router = useRouter();

    const emailRegex = new RegExp(/^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]*@pitt.edu+$/);
    const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

    const validate = async () => {
        // email checks
        const isValidEmail = emailRegex.test(email);
        if (!isValidEmail) {
            console.log("not a valid email")
            return;
        }

        // password checks
        const isValidPassword = passwordRegex.test(password);
        if (!isValidPassword) {
            console.log("Not a valid password.");
            return;
        }
        if (password !== confirmedPassword) {
            console.log("Passwords do not match");
            return;
        }

        // passed data
        const data = {
            email,
            password,
        }

        send(data);
    }


    const send = async (data) => {
        const res = await register(data);
        console.log(res);
        if (res?.status === 201) {
            console.log("success!")
            router.push("/login");
        }
        else {

            console.log("error!")
            return;
        }
    }


    return (
        <>

            <div className="bg-white flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">

                    <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gold">
                        Register
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
                                        onChange={ (event) => {
                                            setEmail(event?.target?.value)
                                        } }
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
                                        onChange={ (event) => {
                                            setPassword(event?.target?.value)
                                        } }
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Confirm password
                                </label>
                                <div className="mt-2">
                                    <input
                                        onChange={ (event) => {
                                            setConfirmedPassword(event?.target?.value)
                                        } }
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="current-password"
                                        required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>



                            <div>
                                <button
                                    onClick={ () => {
                                        validate();
                                    } }
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Register
                                </button>
                            </div>
                        </div>


                    </div>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{ ' ' }
                        <Link href="/login" className="font-semibold leading-6 text-royal hover:text-gold">
                            Sign In Here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}