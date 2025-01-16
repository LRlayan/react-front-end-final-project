import React, {useState} from "react";
import {useSelector} from "react-redux";
import AddStaff from "./AddStaff.tsx";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import Table from "../../components/table/Table";
import UpdateStaff from "./UpdateStaff.tsx";
import DeleteStaff from "./DeleteStaff.tsx";
import {Staff} from "../../model/Staff.ts";

interface StaffDataType {
    key: React.Key;
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
}

const StaffPage = () => {

    const columns = [
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
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
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
            title: 'Action 1',
            key: 'update',
            fixed:'right',
            render: (_: any, record: StaffDataType) => (
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
            render: (_: any, record: StaffDataType) => (
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

    const [open, setOpen] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
    const [modalType, setModalType] = useState("");
    const staff = useSelector((state) => state.staff.staffs) || [];

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    const openUpdateModal = (staff: any) => {
        setOpen(true);
        setSelectedStaff(staff);
        setModalType("update");
    }

    const openDeleteModal = (staff: Staff) => {
        setOpen(true);
        setSelectedStaff(staff);
        setModalType("delete");
    }

    return (
        <>
            <section id="staff-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="Search staff by name or role" enterButton />
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
                <Table<StaffDataType>
                    columns={columns}
                    dataSource={staff.map((staff: StaffDataType) => ({
                        ...staff,
                        key: staff.email,
                    }))}
                />
                {open && modalType === "add" && (
                    <AddStaff
                        isType="ADD STAFF"
                        buttonType="Save"
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
                        buttonType={"Yes'I'm Sure"}
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
