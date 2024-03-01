'use client'
import Image from "next/image";

export default function Home() {
  return (

    <main className="flex min-h-screen flex-col items-center bg-white justify-between p-24">
      <div>
        <div className="mt-2">
          <p className="text-gold text-center text-lg font-semibold">Select a Pitt Gym</p>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Baierl Student Rec Center
          </button>
        </div>
        <div className="mt-2">
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Trees Hall Fitness Center & Lower Multi-Purpose Room
          </button>
        </div>
      </div>    </main>
  );
}
