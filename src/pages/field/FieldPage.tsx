import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Field} from "../../model/Field.ts";
import {addField} from "../../reducer/FieldSlice.ts";
import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import AddField from "./AddField.tsx";
import UpdateField from "./UpdateField.tsx";

export function FieldPage() {

    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()
    const fields = useSelector((state) => state.field.fields) || []
    const [modalType , setModalType] = useState("");
    const [selectedField, setSelectedField] = useState(null)

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    return(
        <>
            <section id="fields-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    {/* Search Bar */}
                    <div className="flex justify-between items-center mb-4">
                        <Search placeholder="search crop by name" enterButton/>
                        <h3 className="text-xl font-bold text-white">Crop Details</h3>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined/>}
                            className="btn bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => openAddModal()}
                        >
                            New
                        </Button>
                    </div>

                    {/* Field Card */}
                    <div id="fieldCard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add card dynamically */}
                        {
                            fields.map((field, index) => (
                                <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                                    {field.image && (
                                        <img
                                            src={URL.createObjectURL(field.image)}
                                            alt={field.fieldName}
                                            className="w-full h-32 object-cover rounded-md mb-2"
                                        />
                                    )}
                                    <h4 className="text-lg font-semibold">{field.code}</h4>
                                    <p className="text-sm">Name: {field.fieldName}</p>
                                    <p className="text-sm">Location: {field.location}</p>
                                    <p className="text-sm">Extent Size: {field.extentSize}</p>
                                    <div className="flex space-x-2 mt-2">
                                        {/* Update Button */}
                                        <Button
                                            type="primary"
                                            className="btn bg-green-500 hover:bg-green-600 text-white"
                                            style={{width: '140px'}}
                                            onClick={() => openUpdateModal(field)}
                                        >
                                            Update
                                        </Button>

                                        {/* Delete Button */}
                                        <Button
                                            type="danger"
                                            className="btn bg-red-500 hover:bg-red-600 text-white"
                                            style={{width: '140px'}}
                                            onClick={() => openDeleteModal(field)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {open && modalType === "add" && (
                    <AddField
                        isOpen={open}
                        onClose={() => {
                            setOpen(false);
                            setSelectedField(null);
                        }}
                        field={selectedField}
                    />
                )}
            </section>
        </>
    )
}