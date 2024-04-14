import { Inter } from "next/font/google";
import "../globals.css";
import { Providers } from "@/context/Providers";
import PersistWrapper from "@/components/ui/PersistanceWrapper";
import Toast from "@/components/overlay/toast";
const inter = Inter({ subsets: ["latin"] });


export default function Layout({ children }) {
    return (
        <>
            { children }

        </>



    );
}
