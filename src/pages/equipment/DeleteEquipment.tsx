import React, {useEffect, useState} from 'react';
import {Equipment} from "../../model/Equipment.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch} from "react-redux";
import {deleteEquipment} from "../../reducer/EquipmentSlice.ts";
import {Staff} from "../../model/Staff.ts";
import {Field} from "../../model/Field.ts";
import {AppDispatch} from "../../store/store.ts";
import {notification} from "antd";

const DeleteEquipment: React.FC<{ isOpen:boolean; isType:string; onClose: () => void; buttonType:string; equipments: Equipment}> = ({ isOpen, isType, buttonType, onClose, equipments }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [count, setCount] = useState<number>(0);
    const [selectedStaff, setStaff] = useState<Staff[]>([]);
    const [selectedFields, setFields] = useState<Field[]>([]);

    useEffect(() => {
        setCode(equipments.code);
        setName(equipments.name);
        setType(equipments.equType);
        setStatus(equipments.status);
        setCount(equipments.count);
        setStaff(equipments.assignStaffMembers);
        setFields(equipments.assignFields);
    }, [equipments]);

    function handleSubmit() {
        new Equipment(code, name, type, status, count, selectedStaff, selectedFields);
        dispatch(deleteEquipment(code));
        notification.success({
            message: "Success",
            description: "Equipment delete successfully",
            placement: "bottomRight",
        });
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <div>
                        <p className="text-white">Code : {equipments.code}</p>
                        <p className="text-white">Name : {equipments.name}</p>
                        <p className="text-white">Type : {equipments.equType}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure remove this tool?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteEquipment;