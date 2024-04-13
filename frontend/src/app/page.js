'use client'
import Image from "next/image";
import Link from "next/link";

const gyms = ["660f1cc2ccdcbd83e05578f8", "660f1d34ccdcbd83e05578f9", "6619afcbdb4bfdf59a0b58b1", "6619aff5db4bfdf59a0b58b2", "6619b015db4bfdf59a0b58b3", "6619b01edb4bfdf59a0b58b4", "6619b033db4bfdf59a0b58b5", "6619b04cdb4bfdf59a0b58b6"]
const names = ["Baierl Student Rec Center", "Trees Hall Fitness Center & Lower Multi-Purpose Room", "Bellefield Hall Basketball Court & Fitness Center", "Fitzgerald Field House Balcony, Indoor Track, & Squash", "Trees Hall Basketball & Racquetball Courts", "Trees Hall Climbing Wall & Driving Range", "Trees Hall Pool", "William Pitt Union Fitness Center"]

export default function Home() {

  let buttons = []
  for (let i = 0; i < gyms.length; i++) {
    buttons.push(<div className="mt-4">
      <Link href={`gym/${gyms[i]}`} >
        <button

          type="submit"
          className="flex w-full justify-center rounded-md bg-royal px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {names[i]}
        </button>
      </Link>

    </div>)
  }




  return (

    <main className="flex min-h-screen flex-col items-center bg-white justify-between p-16">
      <div>
        <div className="mt-2">
          <p className="text-gold text-center text-3xl font-black pb-6">Select a Pitt Gym</p>
        </div>

        {buttons.map((button) => (
          button
        ))}

      </div>
    </main>
  );
}
