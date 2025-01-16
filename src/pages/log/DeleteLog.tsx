import React, {useEffect, useState} from "react";
import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch} from "react-redux";
import {Log} from "../../model/Log.ts";
import {deleteLog} from "../../reducer/LogSlice.ts";

const DeleteLog: React.FC<{isOpen: boolean; onClose: () => void; logs:Log; isType:string; buttonType:string}> = ({ isOpen, onClose, logs, isType, buttonType }) => {

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
        const delLog = new Log(logCode,logDate,logDetails,logImage);
        dispatch(deleteLog(delLog));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <img
                        src={logs.image ? URL.createObjectURL(logs.image) : ""}
                        alt="log image"
                        className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <div>
                        <p className="text-white">Field Code : {logs.code}</p>
                        <p className="text-white">Field Name : {logs.logDate}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure delete this log?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteLog;