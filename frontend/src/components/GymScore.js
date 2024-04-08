
"use client"
import { useEffect, useContext, useState } from 'react'

import Slider from '@mui/material/Slider';


export default function GymScore({ id }) {

    const [value, setValue] = useState(5);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {

    }, [])


    return (
        <>
            <div className='p-10'>
                <div className='text-royal text-center text-xl font-bold'>Give the crowd level a score: <span className='text-gold'>{value}</span></div>

                <Slider
                    defaultValue={5}
                    valueLabelDisplay="auto"
                    shiftStep={30}
                    step={1}
                    marks
                    min={0}
                    max={10}
                    onChange={handleChange}
                />

                <button

                    type="submit"
                    className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Submit Score
                </button>
            </div>


        </>

    )
}