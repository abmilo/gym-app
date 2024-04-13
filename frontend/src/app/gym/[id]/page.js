'use client'
import { useContext, useEffect, useState } from "react"
import { getUser } from "@/api/users";
import AuthContext from "@/context/AuthProvider"
import { GetGym } from "@/api/gyms";
import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import GymScore from "@/components/GymScore";
import Link from "next/link"
import { InformationCircleIcon } from '@heroicons/react/20/solid'
import Slider from '@mui/material/Slider';
import { PostScore } from '@/api/gyms';
import { useRouter } from "next/navigation";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


const Gym = ({ params }) => {
    const { auth, setAuth } = useContext(AuthContext);
    const [gym, setGym] = useState({});
    const [lastUpdated, setLastUpdated] = useState(0);
    const [timeDiff, setTimeDiff] = useState(0);
    const [value, setValue] = useState(5);
    const [showScore, setShowScore] = useState(false);
    const router = useRouter();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
            console.log("error!")
            return;
        }
    }




    const handlePostScore = async () => {
        let data = {
            user_id: auth.email,
            gym_id: params.id,
            score: value
        }
        const res = await PostScore(data);
        console.log("here?")
        if (res?.status === 200) {
            console.log("success! post score")
            console.log(res);
            location.reload();
            // router.push(`/gym/${params.id}`);
            // router.refresh();
        }
        else {
            console.log("error!")
            return;
        }
    }





    return (
        <>
            <div className="bg-white sm:px-6 lg:px-8 h-screen">
                <div className="pl-10 pt-5">
                    <Link href="/" >
                        <ArrowBackIcon color="disabled" />

                    </Link>

                </div>



                <div className="text-royal text-3xl font-bold p-10 pb-0 pt-5 ">{gym.name}</div>

                <div className="p-10">
                    {/* <h3 className="text-base font-semibold leading-6 text-gray-900">Lsast 30 days</h3> */}
                    <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:grid-cols-3 md:divide-x md:divide-y-0">

                        <div className="px-4 py-5 sm:p-6">
                            <dt className="text-base font-normal text-gray-900">Crowd Level</dt>
                            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                <div className="flex items-baseline text-2xl font-semibold text-gold">
                                    {Math.round(gym.crowdLevel * 100) / 100}
                                    <span className="ml-2 text-sm font-medium text-gray-500">out of 10</span>
                                </div>

                                <div
                                    className={classNames(
                                        gym.crowdLevel >= gym.previousLevel ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800',
                                        'inline-flex items-baseline rounded-full px-2.5 py-0.5 text-sm font-medium md:mt-2 lg:mt-0'
                                    )}
                                >
                                    {gym.crowdLevel >= gym.previousLevel ? (
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

                                    {Math.round(Math.abs(gym.crowdLevel - gym.previousLevel) * 100) / 100}
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

                {JSON.stringify(auth) !== "{}" ? (
                    <>

                        <GymScore gym_id={params.id} user_id={auth.email} />




                    </>


                ) : (
                    <div className="px-10">
                        <dl className="mt-5 grid grid-cols-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow md:divide-x md:divide-y-0">

                            <div className="px-4 py-5 sm:p-6 shadow">
                                <dt className="text-base font-normal text-gray-900 mb-3">Want to submit a crowd level report?</dt>
                                <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
                                    <div className="flex items-baseline text-2xl font-semibold text-gold">
                                        <Link href="/login">
                                            <button

                                                type="submit"
                                                className="flex justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            >
                                                Sign In
                                            </button>
                                        </Link>
                                    </div>
                                </dd>
                            </div>
                        </dl>
                    </div>

                )}

                <div className="m-10 rounded-md bg-blue-50 p-4">
                    <div className="flex">
                        <div className="flex-shrink-0">
                            <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                        </div>
                        <div className="ml-3 flex-1 md:flex md:justify-between">
                            <p className="text-sm text-blue-700">User Input is how we collect the data necessary to run this app. Please consider contributing.</p>
                            <p className="mt-3 text-sm md:ml-6 md:mt-0">
                                <Link href="/info" className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                                    Details
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div >

        </>
    );
};

export default Gym;