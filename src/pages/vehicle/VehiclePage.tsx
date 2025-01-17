import {Vehicle} from "../../model/Vehicle.ts";
import React, {useState} from "react";
import {Button} from "antd";
import Search from "antd/es/input/Search";
import {PlusCircleOutlined} from "@ant-design/icons";
import Table from "../../components/table/Table.tsx";
import {useSelector} from "react-redux";
import {RootState} from "../../reducer/VehicleSlice.ts";
import AddVehicle from "./AddVehicle.tsx";
import UpdateVehicle from "./UpdateVehicle.tsx";

interface VehicleDataType {
    key: React.Key;
    code: string;
    licensePlateNumber: string;
    vehicleName: string;
    category: string;
    fuelType: string;
    status: string;
    remark: string;
}

const VehiclePage = () => {

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const vehicles = useSelector((state:RootState) => state.vehicle.vehicles) || [];

    const columns = [
        {
            title:'Code',
            dataIndex:'code',
            fixed:'left',
            key:'code'
        },
        {
            title:'License Plate Number',
            dataIndex:'licensePlateNumber',
            fixed:'left',
            key:'licensePlateNumber'
        },
        {
            title:'Vehicle Name',
            dataIndex:'vehicleName',
            key: 'vehicleName'
        },
        {
            title:'Category',
            dataIndex: 'category',
            key: 'category'
        },
        {
            title: 'Fuel Type',
            dataIndex: 'fuelType',
            key: 'fuelType'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Remark',
            dataIndex: 'remark',
            key: 'remark'
        },
        {
            title: 'Action 1',
            key: 'update',
            fixed: 'right',
            render: (_:Vehicle, record: VehicleDataType) => (
                <Button
                    className="text-blue-500"
                    type="link"
                    onClick={() => {
                        openUpdateModal(record)
                    }}
                >
                    Edit
                </Button>
            )
        },
        {
            title: 'Action 2',
            key: 'delete',
            fixed: 'right',
            render: (_:Vehicle, record: VehicleDataType) => (
                <Button
                    className="text-red-500"
                    type="link"
                    onClick={() => {
                        openDeleteModal(record)
                    }}
                >
                    Delete
                </Button>
            )
        }
    ];

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

    }

    return (
        <>
            <section id="staff-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="Search staff by name or role" enterButton/>
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
                    dataSource={vehicles.map((vehicle:Vehicle) => ({
                        ...vehicle,
                        key: vehicle.licensePlateNumber,
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
            </section>
        </>
    )
}


export default VehiclePage;