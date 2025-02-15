import CountCard from "../components/dashboard/count-card/CountCard.tsx";
import StatusCard from "../components/dashboard/status-card/StatusCard.tsx";
import List from "../components/unordered-list/List.tsx";
import {useDispatch, useSelector} from "react-redux";
import {EquipmentRootState, getAllEquipment} from "../reducer/EquipmentSlice.ts";
import {useEffect} from "react";
import {AppDispatch} from "../store/store.ts";
import {getAllVehicle, VehicleRootState} from "../reducer/VehicleSlice.ts";
import {getAllStaff, StaffRootState} from "../reducer/StaffSlice.ts";

export function Dashboard() {
    const dispatch = useDispatch<AppDispatch>();
    const equipment = useSelector((state:EquipmentRootState) => state.equipment.equipments);
    const vehicle = useSelector((state:VehicleRootState) => state.vehicle.vehicles);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);
    const equCount = equipment.length;
    const vehicleCount = vehicle.length;
    const staffCount = staff.length;

    useEffect(() => {
        dispatch(getAllEquipment());
        dispatch(getAllVehicle());
        dispatch(getAllStaff());
    },[dispatch]);

    return(
        <>
            <section id="dashboard-sec" className="flex flex-col p-4 w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-4">
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <CountCard countCardType={"Available Employees"} count={staffCount}/>
                    </div>
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <CountCard countCardType={"Available Equipment"} count={equCount}/>
                    </div>
                    <div className="bg-teal-500 text-gray-900 rounded-lg shadow-md p-6">
                        <CountCard countCardType={"Available Vehicles"} count={vehicleCount}/>
                    </div>
                </div>

                {/*Status Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white">
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <StatusCard statusCardType={"Employee Status"}>
                            <ul className="mt-4 space-y-2">
                                <List listName={"Manager"} id={"Manager"} count={0}/>
                                <List listName={"Senior Assistant Managers"} id={"Senior-Assistant-Managers"} count={0}/>
                                <List listName={"Assistant Managers"} id={"Assistant-Managers"} count={0}/>
                                <List listName={"Admin and HR Staff"} id={"Admin-and-HR-Staff"} count={0}/>
                                <List listName={"Office Assistants"} id={"Office-Assistants"} count={0}/>
                                <List listName={"Senior Agronomists"} id={"Senior-Agronomists"} count={0}/>
                                <List listName={"Agronomists"} id={"Agronomists"} count={0}/>
                                <List listName={"Soil Scientists"} id={"Soil-Scientists"} count={0}/>
                                <List listName={"Senior Technicians"} id={"Senior-Technicians"} count={0}/>
                                <List listName={"Technicians"} id={"Technicians"} count={0}/>
                                <List listName={"Supervisors"} id={"Supervisors"} count={0}/>
                                <List listName={"Labors"} id={"Labors"} count={0}/>
                            </ul>
                        </StatusCard>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <StatusCard statusCardType={"Equipment Status"}>
                            <ul className="mt-4 space-y-2">
                                <List listName={"Hand Tools"} id={"HandTools"} count={0}/>
                                <List listName={"Irrigation Equipment"} id={"Irrigation-Equipment"} count={0}/>
                                <List listName={"Power Tools and Machinery"} id={"Power-Tools-and-Machinery"} count={0}/>
                                <List listName={"Ploughing"} id={"Ploughing"} count={0}/>
                                <List listName={"Weeding and Pest"} id={"Weeding-and-Pest"} count={0}/>
                                <List listName={"Harvesting"} id={"Harvesting"} count={0}/>
                                <List listName={"Post-Harvest"} id={"Post-Harvest"} count={0}/>
                                <List listName={"Monitoring and Measuring Tools"} id={"Monitoring-and-Measuring-Tools"} count={0}/>
                                <List listName={"Protective"} id={"Protective"} count={0}/>
                            </ul>
                        </StatusCard>
                    </div>
                    <div className="bg-gray-900 rounded-lg shadow-md p-6 max-h-80 overflow-y-auto">
                        <StatusCard statusCardType={"Vehicle Status"}>
                            <ul className="mt-4 space-y-2">
                                <List listName={"Car"} id={"Car"} count={0}/>
                                <List listName={"Motor Bike"} id={"Motor-Bike"} count={0}/>
                                <List listName={"Van"} id={"Van"} count={0}/>
                                <List listName={"Land Masters"} id={"Land-Masters"} count={0}/>
                                <List listName={"Tractor–4WD"} id={"Tractor–4WD"} count={0}/>
                                <List listName={"Tankers Truck"} id={"Tankers-Truck"} count={0}/>
                                <List listName={"Land Vehicles"} id={"Land-Vehicles"} count={0}/>
                                <List listName={"Lorry"} id={"Lorry"} count={0}/>
                            </ul>
                        </StatusCard>
                    </div>
                </div>
            </section>
        </>
    )
}