import React from 'react';
import MainModal from "../../components/modal/MainModal.tsx";

const AddEquipment: React.FC<{ isOpen:boolean; onClose: () => void; isType:string; buttonType:string}> = ({ isOpen, onClose ,isType, buttonType}) => {

    function handleSubmit(){}

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>

            </MainModal>
        </>
    )
}

export default AddEquipment;