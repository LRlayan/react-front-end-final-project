import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../reducer/EquipmentSlice.ts";
import {Equipment} from "../../model/Equipment.ts";
import Table from "../../components/table/Table.tsx";
import AddEquipment from "./AddEquipment.tsx";
import UpdateEquipment from "./UpdateEquipment.tsx";
import DeleteEquipment from "./DeleteEquipment.tsx";

interface EquipmentDataType {
    key: React.Key;
    code: string;
    name: string;
    type: string;
    status: string;
    count: number;
}

const EquipmentPage = () => {

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const equipment = useSelector((state:RootState) => state.equipment.equipments) || [];

    const openAddModal = () => {
        setOpen(true);
        setModalType("add");
    }

    const openUpdateModal = (equipment: Equipment) => {
        setOpen(true);
        setSelectedEquipment(equipment);
        setModalType("update");
    }

    const openDeleteModal = (equipment: Equipment) => {
        setOpen(true);
        setSelectedEquipment(equipment);
        setModalType("delete");
    }

    const columns = [
        {
            title:"Code",
            dataIndex:"code",
            fixed:"left",
            key:"code"
        },
        {
            title:"Equipment Name",
            dataIndex:"name",
            fixed:"left",
            key:"name"
        },
        {
            title:"Type",
            dataIndex:"type",
            key:"type"
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status"
        },
        {
            title:"Count",
            dataIndex:"count",
            key:"count"
        },
        {
            title: 'Action 1',
            key: 'update',
            fixed: 'right',
            render: (_:Equipment, record: EquipmentDataType) => (
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
            render: (_:Equipment, record: EquipmentDataType) => (
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

    return(
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
                <Table<Equipment>
                    columns={columns}
                    dataSource={equipment.map((equipment) => ({
                        ...equipment,
                        key: equipment.code,
                    }))}
                />
                {open && modalType === "add" && (
                    <AddEquipment
                        isOpen={open}
                        isType={"ADD EQUIPMENT"}
                        buttonType={"Save"}
                        onClose={() => {
                            setOpen(false);
                        }}
                    />
                )}
                {open && selectedEquipment && modalType === "update" && (
                    <UpdateEquipment
                        isType={"UPDATE EQUIPMENT"}
                        isOpen={open}
                        buttonType={"Update"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedEquipment(null);
                        }}
                        equipments={selectedEquipment}
                    />
                )}
                {open && modalType === "delete" && selectedEquipment && (
                    <DeleteEquipment
                        isOpen={open}
                        isType={"DELETE EQUIPMENT"}
                        buttonType={"Delete"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedEquipment(null);
                        }}
                        equipments={selectedEquipment}
                    />
                )}
            </section>
        </>
    )
}

export default EquipmentPage;