import React from "react";
import Search from "antd/es/input/Search";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Table from "../../components/table/Table";

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
    contactNo:string;
}

const staffColumns = [
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
        render: () => <a className="text-blue-500">Edit</a>,
    },
    {
        title: 'Action 2',
        key: 'delete',
        fixed:'right',
        render: () => <a className="text-red-500">Delete</a>,
    },

];

const staffData: StaffDataType[] = [
    { key: '1', firstName: 'John ', lastName:"Doe",role: '1', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '2', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '3', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '4', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '5', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '6', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '7', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '8', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '9', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '10', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '11', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},
    { key: '1', firstName: 'John ', lastName:"Doe",role: '12', email: 'john.doe@example.com', joinedDate:"44444", designation:"cds", gender:"male", dob:"455", addressLine01:"sdc", addressLine02:"sc", addressLine03:"asc", addressLine04:"asc", addressLine05:"sc", mobile:"563453458"},

];

const StaffPage = () => {
    const openAddModal = () => {
        console.log("Add Modal Opened");
    };

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
                            onClick={openAddModal}
                        >
                            New
                        </Button>
                    </div>
                </div>
                <Table columns={staffColumns} dataSource={staffData} />
            </section>
        </>
    );
};

export default StaffPage;
