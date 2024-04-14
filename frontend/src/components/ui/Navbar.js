"use client"
import AuthContext from "@/context/AuthProvider"
import { useContext, useEffect, useState } from "react"
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import useLogout from '@/hooks/useLogout'

const loggedOutNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Register', href: '/register' },
]
const loggedInNavigation = [
    { name: 'Home', href: '/' },
    { name: 'Friends', href: '/friends' },
    { name: 'Profile', href: '/profile' },
    { name: 'Workout Plan', href: '/plan' }
]

export default function Navbar() {
    const { auth } = useContext(AuthContext);
    const router = useRouter();
    const [authed, setAuthed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const logout = useLogout();

    useEffect(() => {
        if (JSON.stringify(auth) !== "{}") {
            setAuthed(true);
        }
        else {
            setAuthed(false);
        }

    }, [auth])

    const handleLogout = async () => {
        const res = await logout();
        if (res?.status === 204) {
            router.push("/");
        }
    }



    return (
        <header className="bg-royal">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex flex-1">
                    <div className="hidden lg:flex lg:gap-x-12">
                        {
                            (authed ?

                                loggedInNavigation.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-sm font-black leading-6 text-gold">
                                        {item.name}
                                    </Link>
                                ))

                                :

                                loggedOutNavigation.map((item) => (
                                    <Link key={item.name} href={item.href} className="text-sm font-black leading-6 text-gold">
                                        {item.name}
                                    </Link>
                                ))

                            )
                        }
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gold"
                            onClick={() => setMobileMenuOpen(true)}
                        >
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                </div>
                <Link href="/" className="-m-1.5 p-1.5">
                    <span className="sr-only">Your Company</span>
                    <img
                        className="h-12 w-auto"
                        src="/logo_no_text.png"
                        alt=""
                    />                </Link>
                <div className="flex flex-1 justify-end">
                    {
                        (authed ?
                            <div onClick={handleLogout} className="text-sm font-black leading-6 text-gold">
                                Log out
                            </div>
                            :
                            <Link href="/login" className="text-sm font-black leading-6 text-gold">
                                Log in
                            </Link>
                        )
                    }
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 left-0 z-10 w-full overflow-y-auto bg-royal px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-1">
                            <button
                                type="button"
                                className="-m-2.5 rounded-md p-2.5 text-gold"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <span className="sr-only">Close menu</span>
                                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                        </div>
                        <Link href="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-12 w-auto"
                                src="/logo_no_text.png"
                                alt=""
                            />
                        </Link>
                        <div className="flex flex-1 justify-end">
                            {
                                (authed ?
                                    <div onClick={handleLogout} className="text-sm font-black leading-6 text-gold">
                                        Log out
                                    </div>
                                    :
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-sm font-semibold leading-6 text-gold">
                                        Log in
                                    </Link>
                                )
                            }
                        </div>
                    </div>
                    <div className="mt-6 space-y-2">

                        {
                            (authed ?

                                loggedInNavigation.map((item) => (
                                    <Link
                                        onClick={() => setMobileMenuOpen(false)}
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-black leading-7 text-gold hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))
                                :
                                loggedOutNavigation.map((item) => (
                                    <Link
                                        onClick={() => setMobileMenuOpen(false)}
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-black leading-7 text-gold hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </Link>
                                ))
                            )
                        }
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}