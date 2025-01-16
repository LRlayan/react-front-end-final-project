import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {Log} from "../../model/Log.ts";
import {updateLog} from "../../reducer/LogSlice.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {Input} from "antd";
import Label from "../../components/label/Label.tsx";

const UpdateLog: React.FC<{isOpen: boolean; onClose: () => void; logs:Log; isType:string; buttonType:string}> = ({ isOpen, onClose, logs, isType, buttonType }) => {

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
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Date"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Details"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLogDetails(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Log Image"}/>
                        <Input
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