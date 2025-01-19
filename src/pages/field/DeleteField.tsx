import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import {deleteField} from "../../reducer/FieldSlice.ts";
import {Crop} from "../../model/Crop.ts";
import {Log} from "../../model/Log.ts";

const DeleteField: React.FC<{isOpen: boolean; onClose: () => void; field:Field; isType:string; buttonType:string}> = ({isOpen, onClose, field, isType, buttonType}) => {

    const dispatch = useDispatch();
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const [selectedLogs, setLogs] = useState<Log[]>([]);

    useEffect(() => {
        if (field) {
            setFieldCode(field.code);
            setFieldName(field.name);
            setLocation(field.location);
            setExtentSize(field.extentSize);
            setImage(field.image);
            setCrops(field.assignCrops);
            setLogs(field.assignLogs);
        }
    }, [field]);

    const handleSubmit = () => {
        const delField = new Field(fieldCode,fieldName,location,extentSize,image,selectedCrops,selectedLogs);
        dispatch(deleteField(delField));
    }

    return(
        <>
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <img
                        src={field.image ? URL.createObjectURL(field.image) : ""}
                        alt={field.name}
                        className="w-full h-32 object-cover rounded-md mb-2"
                    />
                    <div>
                        <p className="text-white">Field Code : {field.code}</p>
                        <p className="text-white">Field Name : {field.name}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure delete this field?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteField;