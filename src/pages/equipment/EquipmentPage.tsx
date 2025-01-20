import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {EquipmentRootState} from "../../reducer/EquipmentSlice.ts";
import {Equipment} from "../../model/Equipment.ts";
import Table from "../../components/table/Table.tsx";
import AddEquipment from "./AddEquipment.tsx";
import UpdateEquipment from "./UpdateEquipment.tsx";
import DeleteEquipment from "./DeleteEquipment.tsx";
import SearchingTableData from "../../util/SearchingTableData.ts";
import {Staff} from "../../model/Staff.ts";
import {Field} from "../../model/Field.ts";

interface EquipmentDataType {
    key: React.Key;
    code: string;
    name: string;
    type: string;
    status: string;
    count: number;
    assignStaffMembers: Staff[];
    assignFields: Field[];
}

const EquipmentPage = () => {

    const [open, setOpen] = useState(false);
    const [modalType, setModalType] = useState("");
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
    const equipment = useSelector((state:EquipmentRootState) => state.equipment.equipments) || [];
    const [filteredEquipment, setFilteredEquipment] = useState<Equipment[]>(equipment);
    const searchingTableData = new SearchingTableData();

    useEffect(() => {
        setFilteredEquipment(equipment);
    }, [equipment]);

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

    const searching = (value:string) => {
        const filteredData = searchingTableData.findData(value,equipment,"EQUIPMENT");
        setFilteredEquipment(filteredData);
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
            key:"type",
            filters: [
                { text:"Plough", value: 'Plough'},
                { text:"Mamotee'", value: 'Mamotee'},
                { text:"Shovel'", value: 'Shovel'},
                { text:"Irrigation pumps", value: 'Irrigation pumps'},
                { text:"Wheelbarrow'", value: 'Wheelbarrow'},
                { text:"Sprayer'", value: 'Sprayer'},
                { text:"Axe'", value: 'Axe'},
                { text:"Chain saw", value: 'Chain saw'},
                { text:"Combine harvester", value: 'Combine harvester'},
                { text:"Seeder'", value: 'Seeder'},
                { text:"Weeder'", value: 'Weeder'},
                { text:"Wheel wrench", value: 'Wheel wrench'},
                { text:"Screw drivers", value: 'Screw drivers'},
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Equipment) => record.type.includes(value),
        },
        {
            title:"Status",
            dataIndex:"status",
            key:"status",
            filters: [
                {text:"Available", value:"Available"},
                {text:"Unavailable", value:"Unavailable"},
            ],
            filterMode: 'tree',
            filterSearch: true,
            onFilter: (value:string, record:Equipment) => record.status.includes(value),

        },
        {
            title:"Count",
            dataIndex:"count",
            key:"count"
        },
        {
            title: 'Assign Members',
            dataIndex: 'staff',
            key: 'staff',
            render: (staff: Staff[]) =>
                staff && Array.isArray(staff)
                    ? staff.map((staff: Staff) => staff.code).join(', ')
                    : 'No Members',
        },
        {
            title: 'Assign Fields',
            dataIndex: 'field',
            key: 'field',
            render: (field: Field[]) =>
                field && Array.isArray(field)
                    ? field.map((field: Field) => field.name).join(', ')
                    : 'No Fields',
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
                        <Search className="mr-5" placeholder="Search staff by name, type, status" enterButton onChange={(e) => {searching(e.target.value)}}/>
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
                    dataSource={filteredEquipment.map((equipment) => ({
                        ...equipment,
                        key: equipment.code,
                        equipment: equipment.assignStaffMembers || "No Members",
                        field: equipment.assignFields || "No Fields",
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