
"use client"
import { useEffect, useContext, useState } from 'react'
import AuthContext from '@/context/AuthProvider'
import useRefreshToken from '@/hooks/useRefreshToken'


export default function PersistWrapper({ children }) {

    const refresh = useRefreshToken();
    const { auth } = useContext(AuthContext);

    useEffect(() => {

        const verifyRefreshToken = async () => {
            try {
                await refresh().then(res => {
                }).catch(err => {
                    console.log(err);
                });
            }
            catch (err) {
                console.log(err);
            }
            finally {
                // isMounted && setLoading(false);
            }
        }
        !auth?.accessToken ? verifyRefreshToken() : setLoading(false);

    }, [])


    return (
        <>
            {
                children
            }

        </>

    )
}