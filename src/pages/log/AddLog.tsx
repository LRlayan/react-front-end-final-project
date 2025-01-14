import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Log} from "../../model/Log.ts";
import {addLog} from "../../reducer/LogSlice.ts";
import {IdGenerator} from "../../util/IdGenerator.ts";
import MainModal from "../../components/modal/MainModal.tsx";

const AddLog: React.FC<{isOpen: boolean; onClose: () => void}> = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
    const [lodDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const logs = useSelector((state) => state.log.logs);

    const idGenerator = new IdGenerator();

    function handleSubmit() {
        const getLastLogCode = logs.length > 0 ? logs[logs.length -1].code : "LOG-";
        const newCode = idGenerator.codeGenerator("LOG",getLastLogCode);
        const newLogs = new Log(newCode,lodDate,logDetails,image);
        dispatch(addLog(newLogs));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={"ADD LOG"} buttonType={"Save"} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Log Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Log details</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDetails(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Log Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default AddLog;