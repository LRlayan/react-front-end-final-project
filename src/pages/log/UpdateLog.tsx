import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Log} from "../../model/Log.ts";
import {updateLog} from "../../reducer/LogSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";

const UpdateLog: React.FC<{isOpen: boolean; onClose: () => void}> = ({ isOpen, onClose, logs }) => {

    const dispatch = useDispatch();
    const [logCode, setLogCode] = useState("");
    const [logDate, setLogDate] = useState("");
    const [logDetails, setLogDetails] = useState("");
    const [logImage, setImage] = useState<File | null>(null);

    useEffect(() => {
        setLogCode(logs.code);
        setLogDate(logs.logDate);
        setLogDetails(logs.logDetails);
        setImage(logs.image);
    }, [logs]);

    function handleSubmit() {
        const updateLogDetails = new Log(logCode,logDate,logDetails,logImage);
        dispatch(updateLog(updateLogDetails));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType="UPDATE LOG" buttonType="Upadte" onClose={onClose} onSubmit={handleSubmit}>
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

export default UpdateLog;