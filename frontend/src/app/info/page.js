'use client'
import Image from "next/image";
import Link from "next/link";

export default function Info() {
    return (
        <div className="bg-white text-black text-center pr-8 pl-8 pt-10">
            <Link href="/" className="flex p-1.5 justify-center">
                <img
                    className="h-20 w-auto"
                    src="/logo1530.png"
                    alt=""
                />
            </Link>
            {/* <p className="text-4xl pt-12 pb-4 text-gold font-bold">GymCrowd</p> */}
            <div className="py-4 px-8 shadow">
                Our mission at GymCrowd is to make staying in shape easy for students. However, we can't do this without your help! Our data relies solely on Busyness Ratings from the users of GymCrowd. Every time you leave a review on a Pitt gym, you are not only helping us maintain accurate ratings of each location, but also helping fellow students who are also looking to use our app to manage their workout.
                <p className="pt-8">Thank you for your continued support of GymCrowd! We look forward to continuing to streamline your fitness journey.</p>
            </div>
            <br className="pt-4"></br>
            <Link href="/">
                <button
                    type="submit"
                    className="mx-auto w-40 flex justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    Leave a Review!
                </button>
            </Link>
            <p className="mt-10 text-center text-sm text-gray-500">
                Still curious? {" "}
                <Link
                    href="/faq"
                    className="font-semibold  text-center leading-6 text-royal hover:text-gold"
                >
                    Check out some FAQs!
                </Link>
            </p>
        </div>

    );
}
