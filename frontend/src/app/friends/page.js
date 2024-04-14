'use client'
import { useContext, useEffect, useState } from "react"
import { AddFriend, getUser, GetFriendData, AcceptFriend } from "@/api/users";
import AuthContext from "@/context/AuthProvider"
import ToastContext from '@/context/ToastContext';



const Friends = () => {
    const { msg, type, setMsg, setType } = useContext(ToastContext);
    const { auth, setAuth } = useContext(AuthContext);
    const [friendEmail, setFriendEmail] = useState("");
    const [finalFriends, setFinalFriends] = useState([]);
    const [pendingFriends, setPendingFriends] = useState([]);
    const [acceptedFriends, setAcceptedFriends] = useState([]);
    const [sentFriends, setSentFriends] = useState([]);
    const [recievedFriends, setRecievedFriends] = useState([]);



    useEffect(() => {
        handleFriendData()

        let list = []
        for (person in acceptedFriends) {
            let time = "";
            if (person.lastAtGym) time = new Date(person.lastAtGym).toDateString();
            else time = "N/A"
            list.push(

                <tr key={person.email}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {person.email}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{time}</td>
                    <td>
                        <button
                            onClick={() => {
                                handleAcceptRequest(person.email)
                            }}
                            type="button"
                            className="block rounded-md bg-royal px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                        >
                            Accept
                        </button>
                    </td>
                </tr>

            )
        }
        setAcceptedFriends(list);
        console.log(list)

    }, [auth])


    const handleGetUser = async () => {
        const res = await getUser(auth);
        if (res?.status === 200) {
            console.log("success!")
            setAuth(prev => {
                return {
                    ...prev,
                    accessjwt: res?.data?.accessjwt,
                    friends: res?.data?.friends
                }
            })
        }
        else {
            console.log("error!")
            setMsg(res?.response?.data?.message || "Unknown Error");
            setType(0)
            return;
        }
    }


    const handleAddFriend = async () => {
        let data = {
            sender: auth?.email,
            reciever: friendEmail
        }
        const res = await AddFriend(data, auth);
        if (res?.status === 200) {
            handleGetUser(auth);
            setMsg(res?.response?.data?.message || "Success");
            setType(1)

        }
        else {
            setMsg(res?.response?.data?.message || "Unknown Error");
            setType(0)
            return;
        }
    }

    const handleFriendData = async () => {
        console.log(auth?.friends)
        const res = await GetFriendData(auth);
        if (res?.status === 200) {
            console.log("success!")
            setAcceptedFriends(res.data.acceptedFriends);
            setSentFriends(res.data.sentFriends);
            setRecievedFriends(res.data.recievedFriends);
        }
        else {
            setMsg(res?.response?.data?.message || "Unknown Error");
            setType(0)
            return;
        }
        console.log(sentFriends)
    }


    const handleAcceptRequest = async (email) => {
        let data = {
            sender: email,
            reciever: auth.email
        }
        const res = await AcceptFriend(data, auth)
        if (res?.status === 200) {
            setMsg(res?.response?.data?.message || "Success");
            setType(1)
            handleGetUser();
        }
        else {
            setMsg(res?.response?.data?.message || "Unknown Error");
            setType(0)
            return;
        }
    }

    return (
        <>
            <div className="bg-white sm:px-6 lg:px-8 h-full">
                <div className="px-4 sm:px-6 lg:px-8 pt-6" >
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            {/* <h1 className="text-3xl font-semibold leading-5 text-gold">Friends</h1> */}
                            {/* <p className="mt-2 text-xs text-gray-700">
                                A list of all the friends in your account including  those requested.
                            </p> */}
                        </div>
                        <div className="mt-4 mb-6 sm:ml-16 sm:mt-0 sm:flex-none">

                            <div className="mt-2 mb-2">
                                <label htmlFor="email" className="block text-xs font-medium leading-6 text-gray-900">
                                    Add a friend (by "pitt.edu" email)
                                </label>
                                <input
                                    onChange={(event) => {
                                        setFriendEmail(event?.target?.value)
                                    }}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-2"
                                    placeholder="friend@pitt.edu"
                                />
                            </div>
                            <button
                                onClick={handleAddFriend}
                                type="button"
                                className="block rounded-md bg-royal px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                            >
                                Add Friend
                            </button>
                        </div>
                    </div>
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold leading-5 text-royal">Friends</h1>
                            {/* <p className="mt-2 text-xs text-gray-700">
                                A list of all the friends in your account including  those requested.
                            </p> */}
                        </div>

                    </div>
                    <div className="mt-4 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    {acceptedFriends.length > 0 && <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Last At Gym
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">

                                            </th>

                                        </tr>
                                    </thead>}
                                    <tbody className="divide-y divide-gray-200">
                                        {acceptedFriends.length === 0 ?
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gold sm:pl-0">
                                                No friends
                                            </th>
                                            : acceptedFriends.map((person) => (
                                                <tr key={person.email}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                        {person.email}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.lastAtGym || "N/A"}</td>

                                                </tr>
                                                // person

                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="px-4 sm:px-6 lg:px-8 pt-6 mt-14" >
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold leading-5 text-royal">Friend Requests</h1>
                            {/* <p className="mt-2 text-xs text-gray-700">
                                A list of all the friends in your account including  those requested.
                            </p> */}
                        </div>

                    </div>
                    <div className="mt-4 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">





                                    {recievedFriends.length > 0 && <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">

                                            </th>

                                        </tr>
                                    </thead>}

                                    <tbody className="divide-y divide-gray-200">
                                        {recievedFriends.length === 0 ?
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gold sm:pl-0">
                                                No Waiting Requests
                                            </th>
                                            : recievedFriends.map((person) => (
                                                <tr key={person.email}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                        {person.email}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status || "N/A"}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                handleAcceptRequest(person.email)
                                                            }}
                                                            type="button"
                                                            className="block rounded-md bg-royal px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                                                        >
                                                            Accept
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="px-4 sm:px-6 lg:px-8 pt-6 mt-14" >
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold leading-5 text-royal">Sent Requests</h1>
                            {/* <p className="mt-2 text-xs text-gray-700">
                                A list of all the friends in your account including  those requested.
                            </p> */}
                        </div>

                    </div>
                    <div className="mt-4 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                                <table className="min-w-full divide-y divide-gray-300">
                                    {sentFriends.length > 0 && <thead>
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                                                Email
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Status
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-gray-900">

                                            </th>

                                        </tr>
                                    </thead>}
                                    <tbody className="divide-y divide-gray-200">
                                        {sentFriends.length === 0 ? <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gold sm:pl-0">
                                            No Waiting Requests
                                        </th> : sentFriends.map((person) => (
                                            <tr key={person.email}>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                                                    {person.email}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.status || "N/A"}</td>
                                                <td>

                                                </td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>










            </div>

        </>
    );
};

export default Friends;