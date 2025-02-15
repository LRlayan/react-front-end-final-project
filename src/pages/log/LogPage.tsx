import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddLog from "./AddLog.tsx";
import UpdateLog from "./UpdateLog.tsx";
import DeleteLog from "./DeleteLog.tsx";
import {Log} from "../../model/Log.ts";
import {getAllLogs, LogRootState} from "../../reducer/LogSlice.ts";
import SearchingTableData from "../../util/SearchingTableData.ts";
import Card from "../../components/card/Card.tsx";
import {AppDispatch} from "../../store/store.ts";

const LogPage = () => {
    const [open, setOpen] = useState(false);
    const [selectedLogs, setSelectedLogs] = useState<Log | null>();
    const [modalType, setModalType] = useState("");
    const logs = useSelector((state: LogRootState) => state.log.logs) || [];
    const [filteredLog, setFilteredLog] = useState<Log[]>(logs);
    const dispatch = useDispatch<AppDispatch>();
    const searchingTableData = new SearchingTableData();

    useEffect(() => {
        setFilteredLog(logs);
    }, [logs]);

    useEffect(() => {
        dispatch(getAllLogs());
    },[dispatch]);

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

    const searching = (value:string) => {
        const filteredData = searchingTableData.findData(value,logs,"LOG");
        setFilteredLog(filteredData);
    }

    return(
        <>
            <section id="log-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="search log by date" enterButton onChange={(e) => {searching(e.target.value)}}/>
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
                        <Card cardType={"log"} filteredData={filteredLog} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal}/>
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