export function Dashboard() {
    return(
        <>
            <section id="dashboard-sec" className="flex flex-col p-4 w-full">
                {/*Header Section */}
                <div className="flex justify-between items-center text-white mb-4">
                    <h3 className="font-bold text-2xl text-teal-500">Green Shadow PVT (Ltd)</h3>
                    <div className="text-right">
                        <p className="mb-0">Date: <span id="current-date"></span></p>
                        <p className="mb-0">Time: <span id="current-time"></span></p>
                    </div>
                </div>

                {/*Available Counts Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <h5 className="text-lg font-medium">Available Employees</h5>
                        <h2 id="employees" className="text-4xl font-bold">0</h2>
                    </div>
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <h5 className="text-lg font-medium">Available Equipment</h5>
                        <h2 id="equipmentCount" className="text-4xl font-bold">0</h2>
                    </div>
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <h5 className="text-lg font-medium">Available Vehicles</h5>
                        <h2 id="vehicleCount" className="text-4xl font-bold">0</h2>
                    </div>
                </div>

                {/*Status Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <h5 className="text-lg font-medium">Employee Status</h5>
                        <ul className="mt-4 space-y-2">
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Managers <span id="Manager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Senior Assistant Managers <span id="SeniorAssistantManager"
                                                                className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Assistant Managers <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Admin and HR Staff <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Office Assistants <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Senior Agronomists <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Agronomists <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Soil Scientists <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Senior Technicians <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Technicians <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Supervisors <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Labors <span id="AssistantManager" className="font-bold">0</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <h5 className="text-lg font-medium">Equipment Status</h5>
                        <ul className="mt-4 space-y-2">
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Hand Tools <span id="hand" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Irrigation Equipment <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Power Tools and Machinery <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Ploughing <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Weeding and Pest <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Harvesting <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Post-Harvest <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Monitoring and Measuring Tools <span id="irrigation" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Protective <span id="irrigation" className="font-bold">0</span>
                            </li>
                        </ul>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <h5 className="text-lg font-medium">Vehicle Status</h5>
                        <ul className="mt-4 space-y-2">
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Car <span id="Car" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Motor Bike <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Motor Bike <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Van <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Land Masters <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Tractor–4WD <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Tankers Truck <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Land Vehicles <span id="MotorBike" className="font-bold">0</span>
                            </li>
                            <li className="flex justify-between border-b border-gray-600 pb-1">
                                Lorry <span id="MotorBike" className="font-bold">0</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}