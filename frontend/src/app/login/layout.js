'use client'
import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { redirect } from 'next/navigation'
const inter = Inter({ subsets: ["latin"] });
import { useContext, useEffect, useState } from "react"
import AuthContext from "@/context/AuthProvider"


export default function Layout({ children }) {


  const { auth } = useContext(AuthContext);
  const router = useRouter();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (JSON.stringify(auth) !== "{}") {
      setAuthed(true);
      redirect('/profile')

    }
    else {
      setAuthed(false);
    }

  }, [auth])
  return (


    <>

      {!authed && children}

    </>



  );
}
