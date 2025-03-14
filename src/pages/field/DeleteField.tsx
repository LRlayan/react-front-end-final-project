import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {Field} from "../../model/Field.ts";
import {deleteField} from "../../reducer/FieldSlice.ts";
import {Crop} from "../../model/Crop.ts";
import {Log} from "../../model/Log.ts";
import {Staff} from "../../model/Staff.ts";
import {Equipment} from "../../model/Equipment.ts";
import {AppDispatch} from "../../store/store.ts";
import {notification} from "antd";

const DeleteField: React.FC<{isOpen: boolean; onClose: () => void; field:Field; isType:string; buttonType:string}> = ({isOpen, onClose, field, isType, buttonType}) => {

    const dispatch = useDispatch<AppDispatch>();
    const [fieldCode, setFieldCode] = useState("");
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null | undefined>(null);
    const [selectedCrops, setCrops] = useState<Crop[]>([]);
    const [selectedLogs, setLogs] = useState<Log[]>([]);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const [selectedEquipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        if (field) {
            setFieldCode(field.code);
            setFieldName(field.name);
            setLocation(field.location);
            setExtentSize(field.extentSize);
            setImage(field.image);
            setCrops(field.assignCrops);
            setLogs(field.assignLogs);
            setStaff(field.assignStaffMembers);
            setEquipments(field.assignEquipments);
        }
    }, [field]);

    const handleSubmit = () => {
        new Field(fieldCode, fieldName, location, extentSize, image, selectedCrops, selectedLogs, selectedStaff, selectedEquipments);
        dispatch(deleteField(fieldCode));
        notification.success({
            message: "Success",
            description: "Equipment delete successfully",
            placement: "bottomRight",
        });
    }

    return(
        <>
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <img
                        src={`http://localhost:3001/uploads/field/${field.image}`}
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