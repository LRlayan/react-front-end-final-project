import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useState} from "react";
import {useSelector} from "react-redux";
import AddLog from "./AddLog.tsx";
import UpdateLog from "./UpdateLog.tsx";
import DeleteLog from "./DeleteLog.tsx";
import {Log} from "../../model/Log.ts";
import {RootState} from "../../reducer/LogSlice.ts";

const LogPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedLogs, setSelectedLogs] = useState<Log | null>();
    const [modalType, setModalType] = useState("");
    const logs = useSelector((state: RootState) => state.log.logs) || [];

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    function openUpdateModal(logs: Log) {
        setOpen(true);
        setSelectedLogs(logs);
        setModalType("update");
    }

    function openDeleteModal(logs: Log) {
        setOpen(true);
        setSelectedLogs(logs);
        setModalType("delete");
    }

    return(
        <>
            <section id="log-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="search log by name" enterButton/>
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
                                        alt="log image"
                                        className="w-full h-32 object-cover rounded-md mb-2"
                                    />
                                )}
                                <h4 className="text-lg font-semibold">{log.code}</h4>
                                <p className="text-sm">Log Date: {log.logDate}</p>
                                <p className="text-sm">Log Details: {log.logDetails}</p>
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
                                        className="btn bg-red-500 hover:bg-red-600 text-white border-red-500"
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
                        isType={"ADD LOG"}
                        buttonType={"Save"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedLogs(null);
                        }}
                    />

                )}
                {open && modalType === "update" && selectedLogs && (
                    <UpdateLog
                        isOpen={open}
                        isType={"UPDATE LOG"}
                        buttonType={"Update"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedLogs(null);
                        }}
                        logs={selectedLogs}
                    />
                )}
                {open && modalType === "delete" && selectedLogs && (
                    <DeleteLog
                        isOpen={open}
                        isType={"DELETE LOG"}
                        buttonType={"Yes,I'm Sure"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedLogs(null);
                        }}
                        logs={selectedLogs}
                    />
                )}
            </section>
        </>
    )
}

export default LogPage;