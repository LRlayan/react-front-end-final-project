import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";
import AddLog from "./AddLog.tsx";

const LogPage = () => {
    const [open, setOpen] = useState(false);
    const [isSelected, setSelected] = useState(null);
    const [modalType, setModalType] = useState("");
    const logs = useSelector((state) => state.logs.log) || [];

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    return(
        <>
            <section id="log-sec" className="mt-4 p-6">
                <div className="container mx-auto">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {logs.map((log, index) => (
                            <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                                {log.image && (
                                    <img
                                        src={URL.createObjectURL(log.image)}
                                        alt={log.cropName}
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                    />
                                )}
                                <h4 className="text-lg font-semibold">{log.code}</h4>
                                <p className="text-sm">Scientific Name: {log.cropName}</p>
                                <p className="text-sm">Scientific Name: {log.scientificName}</p>
                                <p className="text-sm">Category: {log.category}</p>
                                <p className="text-sm">Season: {log.season}</p>
                                <div className="flex space-x-2 mt-2">
                                    {/* Update Button */}
                                    <Button
                                        type="primary"
                                        className="btn bg-green-500 hover:bg-green-600 text-white"
                                        style={{width: '140px'}}
                                        onClick={() => openUpdateModal(log)}
                                    >
                                        Update
                                    </Button>

                                    {/* Delete Button */}
                                    <Button
                                        type="danger"
                                        className="btn bg-red-500 hover:bg-red-600 text-white"
                                        style={{width: '140px'}}
                                        onClick={() => openDeleteModal(log)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {open && modalType === "add" && (
                    <AddLog
                        isOpen={open}
                        onClose={() => {
                            setOpen(false);
                            setSelected(null);
                        }}
                        logs={isSelected}
                    />

                )}
            </section>
        </>
    )
}

export default LogPage;