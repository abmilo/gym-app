import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { Providers } from "@/context/Providers";
import PersistWrapper from "@/components/ui/PersistanceWrapper";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "1530 Group 8",

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <PersistWrapper>

            <Navbar />

            {children}

            <Footer />
          </PersistWrapper>
        </Providers>
      </body>
    </html>
  );
}
