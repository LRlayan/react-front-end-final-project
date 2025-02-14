import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddStaff from "./AddStaff.tsx";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import Table from "../../components/table/Table";
import UpdateStaff from "./UpdateStaff.tsx";
import DeleteStaff from "./DeleteStaff.tsx";
import {Staff} from "../../model/Staff.ts";
import {getAllStaff, StaffRootState} from "../../reducer/StaffSlice.ts";
import SearchingTableData from "../../util/SearchingTableData.ts";
import {Log} from "../../model/Log.ts";
import {Field} from "../../model/Field.ts";
import {Vehicle} from "../../model/Vehicle.ts";
import {Equipment} from "../../model/Equipment.ts";
import {AppDispatch} from "../../store/store.ts";

interface StaffDataType {
    key: React.Key;
    code:string;
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    joinedDate:string;
    designation:string;
    gender:string;
    dob:string;
    addressLine01:string;
    addressLine02:string;
    addressLine03:string;
    addressLine04:string;
    addressLine05:string;
    mobile:string;
    assignLogs: Log[];
    assignFields: Field[];
    assignVehicles: Vehicle[];
    assignEquipments: Equipment[];
}

const StaffPage = () => {

    const [open, setOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [modalType, setModalType] = useState("");
    const staff = useSelector((state: StaffRootState) => state.staff.staffs) || [];
    const [filteredStaff, setFilteredStaff] = useState<Staff[]>(staff);
    const dispatch = useDispatch<AppDispatch>();
    const searchingTableData = new SearchingTableData();

    const columns = [
        {
            title: 'Member Code',
            dataIndex: 'code',
            fixed:'left',
            key: 'code',
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            fixed:'left',
            key: 'firstName',
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            fixed:'left',
            key: 'role',
            filters: [
                { text: 'MANAGER', value: 'MANAGER' },
                { text: 'ADMINISTRATIVE', value: 'ADMINISTRATIVE' },
                { text: 'SCIENTIST', value: 'SCIENTIST' },
                { text: 'OTHER', value: 'OTHER' },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Staff) => record.role.includes(value),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Joined Date',
            dataIndex: 'joinedDate',
            key: 'joinedDate',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
            key: 'designation',
            filters: [
                {text: "ASSISTANT MANAGER", value: "ASSISTANT MANAGER"},
                {text: "ADMIN AND HR STAFF", value: "ADMIN AND HR STAFF"},
                {text: "OFFICE ASSISTANT", value: "OFFICE ASSISTANT"},
                {text: "SENIOR AGRONOMIST", value: "SENIOR AGRONOMIST"},
                {text: "AGRONOMIST", value: "AGRONOMIST"},
                {text: "SOIL SCIENTIST", value: "SOILS SCIENTIST"},
                {text: "SENIOR TECHNICIAN", value: "SENIOR TECHNICIAN"},
                {text: "TECHNICIAN", value: "TECHNICIAN"},
                {text: "SUPERVISOR", value: "SUPERVISOR"},
                {text: "LABOUR", value: "LABOUR"},
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Staff) => record.designation.includes(value),
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
            filters: [
                { text: 'MALE', value: 'MALE' },
                { text: 'FEMALE', value: 'FEMALE' },
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Staff) => record.gender.includes(value),
        },
        {
            title: 'Date Of Birth',
            dataIndex: 'dob',
            key: 'dob',
        },
        {
            title: 'Address Line 01',
            dataIndex: 'addressLine01',
            key: 'addressLine01',
        },
        {
            title: 'Address Line 02',
            dataIndex: 'addressLine02',
            key: 'addressLine02',
        },
        {
            title: 'Address Line 03',
            dataIndex: 'addressLine03',
            key: 'addressLine03',
        },
        {
            title: 'Address Line 04',
            dataIndex: 'addressLine04',
            key: 'addressLine04',
        },
        {
            title: 'Address Line 05',
            dataIndex: 'addressLine05',
            key: 'addressLine05',
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
        },
        {
            title: 'Assign Logs',
            dataIndex: 'logs',
            key: 'logs',
            render: (logs: Log[]) =>
                logs && Array.isArray(logs)
                    ? logs.map((log: Log) => log.name).join(', ')
                    : 'No Log',

        },
        {
            title: 'Assign Fields',
            dataIndex: 'fields',
            key: 'fields',
            render: (fields: Field[]) =>
                fields && Array.isArray(fields)
                    ? fields.map((field: Field) => field.name).join(', ')
                    : 'No Fields',

        },
        {
            title: 'Assign Vehicles',
            dataIndex: 'vehicle',
            key: 'vehicle',
            render: (vehicles: Vehicle[]) =>
                vehicles && Array.isArray(vehicles)
                    ? vehicles.map((vehicles: Vehicle) => vehicles.vehicleName).join(', ')
                    : 'No vehicles',

        },
        {
            title: 'Assign Equipments',
            dataIndex: 'equipment',
            key: 'equipment',
            render: (equipments: Equipment[]) =>
                equipments && Array.isArray(equipments)
                    ? equipments.map((equipments: Equipment) => equipments.name).join(', ')
                    : 'No equipments',

        },
        {
            title: 'Action 1',
            key: 'update',
            fixed:'right',
            render: (_: Staff, record: StaffDataType) => (
                <Button
                    className="text-blue-500"
                    type="link"
                    onClick={() => {
                        openUpdateModal(record)
                    }}
                >
                    Edit
                </Button>
            ),
        },
        {
            title: 'Action 2',
            key: 'delete',
            fixed:'right',
            render: (_: Staff, record: StaffDataType) => (
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
        setFilteredStaff(staff);
    }, [staff]);

    useEffect(() => {
        dispatch(getAllStaff());
    },[dispatch])

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    const openUpdateModal = (staff: Staff) => {
        setOpen(true);
        setSelectedStaff(staff);
        setModalType("update");
    }

    const openDeleteModal = (staff: Staff) => {
        setOpen(true);
        setSelectedStaff(staff);
        setModalType("delete");
    }

    const searching = (value:string) => {
        const filteredData = searchingTableData.findData(value,staff,"STAFF");
        setFilteredStaff(filteredData);
    }

    return (
        <>
            <section id="staff-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="Search staff by name, designation, firstName, lastName, email, gender" enterButton onChange={(e) => {searching(e.target.value)}}/>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            className="btn bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => openAddModal()}
                        >
                            New
                        </Button>
                    </div>
                </div>
                <Table<Staff>
                    columns={columns}
                    dataSource={filteredStaff.map((staff) => ({
                        ...staff,
                        key: staff.code,
                        logs: staff.assignLogs || "No Logs",
                        fields: staff.assignFields || "No Fields",
                        vehicle: staff.assignVehicles || "No Vehicles",
                        equipment: staff.assignEquipments || "No Equipments",
                    }))}
                />
                {open && modalType === "add" && (
                    <AddStaff
                        isType={"ADD STAFF"}
                        buttonType={"Save"}
                        isOpen={open}
                        onClose={() => setOpen(false)}
                    />
                )}
                {open && modalType === "update" && selectedStaff && (
                    <UpdateStaff
                        isType={"UPDATE STAFF"}
                        buttonType={"Update"}
                        isOpen={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedStaff(null);
                        }}
                        staff={selectedStaff}
                    />
                )}
                {open && modalType === "delete" && selectedStaff && (
                    <DeleteStaff
                        isType={"DELETE STAFF"}
                        isOpen={open}
                        buttonType={"Yes,I'm Sure"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedStaff(null);
                        }}
                        staff={selectedStaff}
                    />
                )}
            </section>
        </>
    );
};

export default StaffPage;
