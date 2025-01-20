import {Vehicle} from "../../model/Vehicle.ts";
import React, {useEffect, useState} from "react";
import {Button} from "antd";
import Search from "antd/es/input/Search";
import {PlusCircleOutlined} from "@ant-design/icons";
import Table from "../../components/table/Table.tsx";
import {useSelector} from "react-redux";
import {VehicleRootState} from "../../reducer/VehicleSlice.ts";
import AddVehicle from "./AddVehicle.tsx";
import UpdateVehicle from "./UpdateVehicle.tsx";
import DeleteVehicle from "./DeleteVehicle.tsx";
import SearchingTableData from "../../util/SearchingTableData.ts";
import {Staff} from "../../model/Staff.ts";

interface VehicleDataType {
    key: React.Key;
    code: string;
    licensePlateNumber: string;
    vehicleName: string;
    category: string;
    fuelType: string;
    status: string;
    remark: string;
    assignStaffMember: Staff;
}

const VehiclePage = () => {

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const vehicles = useSelector((state:VehicleRootState) => state.vehicle.vehicles) || [];
    const [filteredVehicle, setFilteredVehicle] = useState<Vehicle[]>(vehicles);
    const searchingTableData = new SearchingTableData();

    const columns = [
        {
            title: 'Code',
            dataIndex: 'code',
            fixed: 'left',
            key: 'code',
        },
        {
            title: 'License Plate Number',
            dataIndex: 'licensePlateNumber',
            fixed: 'left',
            key: 'licensePlateNumber',
        },
        {
            title: 'Vehicle Name',
            dataIndex: 'vehicleName',
            key: 'vehicleName',
        },
        {
            title: 'Category',
            dataIndex: 'category',
            key: 'category',
            filters: [
                { text: 'Car', value: 'Car' },
                { text: 'Van', value: 'Van' },
                { text: 'Motorbike', value: 'Motorbike' },
                { text: 'Tractors-Land masters', value: 'Tractors-Land masters' },
                { text: 'Tractors-4WD', value: 'Tractors-4WD' },
                { text: 'Tankers truck', value: 'Tankers truck' },
                { text: 'Land vehicles', value: 'Land vehicles' },
                { text: 'Lorry', value: 'Lorry' },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Vehicle) => record.category.includes(value),
        },
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            key: 'fuelType',
            filters: [
                { text: 'Petrol', value: 'Petrol' },
                { text: 'Diesel', value: 'Diesel' },
                { text: 'Electric', value: 'Electric' },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Vehicle) => record.fuelType.includes(value),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Available', value: 'Available' },
                { text: 'Unavailable', value: 'Unavailable' },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Vehicle) => record.status.includes(value),
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark',
        },
        {
            title: 'Assign Staff Member',
            dataIndex: 'staff',
            key: 'staff',
            render: (staff: Staff) => staff ? staff.code : 'No Member',

        },
        {
            title: 'Action 1',
            key: 'update',
            fixed: 'right',
            render: (_: Vehicle, record: VehicleDataType) => (
                <Button
                    className="text-blue-500"
                    type="link"
                    onClick={() => {
                        openUpdateModal(record);
                    }}
                >
                    Edit
                </Button>
            ),
        },
        {
            title: 'Action 2',
            key: 'delete',
            fixed: 'right',
            render: (_: Vehicle, record: VehicleDataType) => (
                <Button
                    className="text-red-500"
                    type="link"
                    onClick={() => {
                        openDeleteModal(record);
                    }}
                >
                    Delete
                </Button>
            ),
        },
    ];

    useEffect(() => {
        setFilteredVehicle(vehicles);
    }, [vehicles]);

    const openAddModal = () => {
        setOpen(true);
        setModalType("add");
    }

    const openUpdateModal = (vehicle: Vehicle) => {
        setOpen(true);
        setSelectedVehicle(vehicle);
        setModalType("update");
    }

    const openDeleteModal = (vehicle: Vehicle) => {
        setOpen(true);
        setSelectedVehicle(vehicle);
        setModalType("delete");
    }

    const searching = (value:string) => {
        const filteredData = searchingTableData.findData(value,vehicles,"VEHICLE");
        setFilteredVehicle(filteredData);
    }

    return (
        <>
            <section id="staff-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="Search staff by name or vehicleName, category, status, licensePlateNumber" enterButton onChange={(e) => {searching(e.target.value)}}/>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined/>}
                            className="btn bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => openAddModal()}
                        >
                            New
                        </Button>
                    </div>
                </div>
                <Table<Vehicle>
                    columns={columns}
                    dataSource={filteredVehicle.map((vehicle) => ({
                        ...vehicle,
                        key: vehicle.code,
                        staff: vehicle.assignStaffMember || "No Staff Member",
                    }))}
                />
                {open && modalType === "add" && (
                    <AddVehicle
                        isOpen={open}
                        isType={"ADD VEHICLE"}
                        buttonType={"Save"}
                        onClose={() => setOpen(false)}
                    />
                )}
                {open && modalType === "update" && selectedVehicle && (
                    <UpdateVehicle
                        isOpen={open}
                        isType={"UPDATE VEHICLE"}
                        buttonType={"Update"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedVehicle(null);
                        }}
                        vehicles={selectedVehicle}
                    />
                )}
                {open && modalType === "delete" && selectedVehicle && (
                    <DeleteVehicle
                        isOpen={open}
                        isType={"DELETE VEHICLE"}
                        buttonType={"Yes,I'm Sure"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedVehicle(null);
                        }}
                        vehicles={selectedVehicle}
                    />
                )}
            </section>
        </>
    )
}


export default VehiclePage;