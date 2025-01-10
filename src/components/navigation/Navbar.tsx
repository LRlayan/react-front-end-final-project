import {Link} from "react-router";

export function Navbar() {
    return(
        <>
            <header>
                <div id="header-sec">
                    {/*Sidebar */}
                    <div className="flex flex-col bg-gray-800 text-white h-screen fixed w-64 md:w-72">
                        <h3 className="text-center py-5 text-xl font-bold border-b border-gray-600">Dashboard</h3>
                        <nav className="flex-grow">
                            <Link to="/" className="block px-4 py-2 hover:bg-green-600">Dashboard</Link>
                            <Link to="/fieldManagement" className="block px-4 py-2 hover:bg-green-600">Field Management</Link>
                            <Link to="/cropsManagement" className="block px-4 py-2 hover:bg-green-600">Crops Management</Link>
                            <Link to="/staffManagement" className="block px-4 py-2 hover:bg-green-600">Staff Management</Link>
                            <Link to="/logManagement" className="block px-4 py-2 hover:bg-green-600">Monitoring Log Service</Link>
                            <Link to="/vehileManagement" className="block px-4 py-2 hover:bg-green-600">Vehicle Management</Link>
                            <Link to="/equipmentManagement" className="block px-4 py-2 hover:bg-green-600">Equipment Service</Link>
                        </nav>
                        {/*Logout button*/}
                        <button type="button" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mx-4 mb-4 mt-auto">Logout</button>
                    </div>
                </div>
            </header>
        </>
    )
}