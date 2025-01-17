import React, {useEffect, useState} from 'react';
import {Equipment} from "../../model/Equipment.ts";
import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch} from "react-redux";
import {deleteEquipment} from "../../reducer/EquipmentSlice.ts";

const DeleteEquipment: React.FC<{ isOpen:boolean; isType:string; onClose: () => void; buttonType:string; equipments: Equipment}> = ({ isOpen, isType, buttonType, onClose, equipments }) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [status, setStatus] = useState("");
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
        setCode(equipments.code);
        setName(equipments.name);
        setType(equipments.type);
        setStatus(equipments.status);
        setCount(equipments.count);
    }, [equipments]);

    function handleSubmit() {
        const delEquipment = new Equipment(code,name,type,status,count);
        dispatch(deleteEquipment(delEquipment));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <div>
                        <p className="text-white">Code : {equipments.code}</p>
                        <p className="text-white">Name : {equipments.name}</p>
                        <p className="text-white">Type : {equipments.type}</p>
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