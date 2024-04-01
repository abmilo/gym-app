'use client'
import { useContext, useEffect, useState } from "react"
import { getUser } from "@/api/users";
import AuthContext from "@/context/AuthProvider"


const people = [


    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
]

const Profile = () => {

    const { auth, setAuth } = useContext(AuthContext);

    const handleGetUser = async () => {
        const res = await getUser(auth);
        if (res?.status === 200) {
            console.log("success!")
            console.log(res);
            // setAuth(prev => {
            //     return {
            //         ...prev,
            //         accessjwt: res?.data?.accessjwt
            //     }
            // })
            // router.push("/login");
        }
        else {
            // console.log(res);
            console.log("error!")
            return;
        }
    }

    useEffect(() => {

    }, [auth])




    return (
        <>
            <div className="bg-white sm:px-6 lg:px-8 h-screen">








                <div className="bg-white p-10" >
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ auth.email }</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">UUID</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ auth.uuid }</dd>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Date Joined: </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{ auth.joined }</dd>
                            </div>
                        </dl>
                    </div>
                </div>




            </div>

        </>
    );
};

export default Profile;