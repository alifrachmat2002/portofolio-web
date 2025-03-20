import { ReactNode } from "react";
import Navbar from "../navbar";
import Footer from "../footer";

export default function MainLayout({ children } : { children: ReactNode}) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <Navbar variant="default"/>
            {children}
            <Footer />
        </div>
    )
}