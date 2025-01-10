import {Navbar} from "./navigation/Navbar.tsx";
import {Outlet} from "react-router";

export function RootLayout() {
    return(
        <>
            <div className="flex flex-col h-screen bg-gray-800">
                {/* Navbar at the top */}
                <Navbar/>
                {/* Main content area */}
                <section className="absolute right-0 w-[78.5%] h-[97vh] overflow-y-auto p-5">
                    <Outlet/>
                </section>
            </div>
        </>
    )
}