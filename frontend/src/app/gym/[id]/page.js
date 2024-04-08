'use client'
import { useContext, useEffect, useState } from "react"
import { getUser } from "@/api/users";
import AuthContext from "@/context/AuthProvider"
import { GetGym } from "@/api/gyms";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import GymScore from "@/components/GymScore";


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Gym = ({ params }) => {

    const [gym, setGym] = useState({});
    const [lastUpdated, setLastUpdated] = useState(0);
    const [timeDiff, setTimeDiff] = useState(0);

    useEffect(() => {
        getGymInfo()


    }, [])


    const getGymInfo = async () => {
        const res = await GetGym(params.id);
        if (res?.status === 200) {
            console.log("success!")
            console.log(res);
            setGym(res.data)
            let date = new Date(res.data.lastUpdated)
            let now = new Date()
            let timeSinceSec = (now.getTime() - date.getTime()) / 1000
            let timeSinceMin = timeSinceSec / 60
            setTimeDiff(Math.round(timeSinceMin))

            setLastUpdated(Math.round(timeSinceMin / 1440))


        }
        else {
            console.log("error!") / home / m4xm / Classes / 1530 / group8_1530 / frontend / src / app / friends
            return;
        }
    }





    return (
        <>
            <div className="bg-white sm:px-6 lg:px-8 h-screen">






                <div className="text-royal text-3xl font-bold p-10 pb-0 ">{gym.name}</div>

                <div className="p-10">
                    {/* <h3 className="text-base font-semibold leading-6 text-gray-900">Lsast 30 days</h3> */}
                    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">

                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">Crowd Level</dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-semibold text-gold">
                                    {gym.crowdLevel}
                                    <span className="ml-2 text-sm font-medium text-gray-500">out of 10</span>
                                </div>

                                <div
                                    className={classNames(
                                        gym.crowdLevel >= gym.previousCrowdLevel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                        'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                                    )}
                                >
                                    {gym.crowdLevel >= gym.previousCrowdLevel ? (
                                        <ArrowUpIcon
                                            className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-green-500"
                                            aria-hidden="true"
                                        />
                                    ) : (
                                        <ArrowDownIcon
                                            className="-ml-1 mr-0.5 h-5 w-5 flex-shrink-0 self-center text-red-500"
                                            aria-hidden="true"
                                        />
                                    )}

                                    {gym.crowdLevel - gym.previousCrowdLevel || 0}
                                </div>
                            </dd>
                        </div>
                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">Last Updated</dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-semibold text-gold">
                                    {lastUpdated == 0 ? (<div>Today</div>) : (<div>{lastUpdated} days ago</div>)}
                                </div>

                                <div
                                    className={classNames(
                                        lastUpdated == 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                        'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                                    )}
                                >


                                    {timeDiff} min ago
                                </div>
                            </dd>
                        </div>
                    </dl>
                </div>

                <GymScore id={params.id} />

            </div>

        </>
    );
};

export default Gym;