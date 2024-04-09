
"use client"
import { useEffect, useContext, useState } from 'react'
import { PostScore } from '@/api/gyms';
import Slider from '@mui/material/Slider';
import { useRouter } from 'next/navigation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToastContext from '@/context/ToastContext';

export default function Toast() {
    const { msg, type, setMsg, setType } = useContext(ToastContext);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (count != 0) {
            if (type == 0) toast.error(msg);
            else if (type == 1) toast.success(msg);
            else if (type == 2) toast.info(msg);
        }
        setCount(1)
        setMsg("")
        setType(-1)
    }, [type, msg])



    return (
        <div>
            <ToastContainer />
        </div>

    )
}