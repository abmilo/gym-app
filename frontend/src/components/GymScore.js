
"use client"
import { useEffect, useContext, useState } from 'react'
import { PostScore } from '@/api/gyms';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation'
import ToastContext from '@/context/ToastContext';

export default function GymScore({ gym_id, user_id }) {

    const [value, setValue] = useState(5);
    const [showScore, setShowScore] = useState(false);
    const { msg, type, setMsg, setType } = useContext(ToastContext);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const handlePostScore = async () => {
        let data = {
            user_id: user_id,
            gym_id: gym_id,
            score: value
        }
        const res = await PostScore(data);
        if (res?.status === 200) {
            location.reload();
        }
        else {
            setShowScore(false);

            setMsg(res?.response?.data?.message || "Unknown Error");
            setType(0);
            return;
        }
    }


    return (
        <>

            {showScore ? (<>
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
                        onClick={handlePostScore}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Submit Score
                    </button>
                </div>

            </>) : (<>
                <div className='p-10'>

                    <button
                        onClick={() => setShowScore(true)}
                        type="submit"
                        className="flex w-full justify-center rounded-md bg-royal px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Enter a score
                    </button>
                </div>
            </>)}

        </>

    )
}