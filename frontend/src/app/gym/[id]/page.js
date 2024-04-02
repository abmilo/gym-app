'use client'
import { useContext, useEffect, useState } from "react"
import { getUser } from "@/api/users";
import AuthContext from "@/context/AuthProvider"




const Gym = ({ params }) => {





    return (
        <>
            <div className="bg-white sm:px-6 lg:px-8 h-screen">






                <div className="text-royal">{ params.id }</div>

                <div className="bg-white p-10" >
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">User Information</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">UUID</dt>
                            </div>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Date Joined: </dt>
                            </div>
                        </dl>
                    </div>
                </div>




            </div>

        </>
    );
};

export default Gym;