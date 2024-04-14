'use client'
import { Inter } from "next/font/google";
import "../globals.css";
import { Auth0Provider } from '@auth0/auth0-react';

const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }) {
  return (

    // <Auth0Provider
    //   domain="dev-d04zvoa7dhk3jwhl.us.auth0.com"
    //   clientId="0i11AU4jqSInbczIyjWLuXML5Gel6vjq"
    //   authorizationParams={ {
    //     redirect_uri: "http://localhost:3000"
    //   } }
    // >
    //   { children }
    // </Auth0Provider>
    <>

      {children}

    </>



  );
}
