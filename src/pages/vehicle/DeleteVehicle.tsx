import React, {useEffect, useState} from 'react';
import {Vehicle} from "../../model/Vehicle.ts";
import {useDispatch} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import {deleteVehicle} from "../../reducer/VehicleSlice.ts";

const DeleteVehicle: React.FC<{ isOpen:boolean; onClose: () => void; vehicles: Vehicle; isType:string; buttonType:string}> = ({ isOpen, onClose, vehicles, isType, buttonType }) => {

    const dispatch = useDispatch();
    const [code, setCode] = useState("");
    const [licensePlateNumber, setLicensePlateNumber] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [category, setCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [remark, setRemark] = useState("");

    useEffect(() => {
        setCode(vehicles.code);
        setLicensePlateNumber(vehicles.licensePlateNumber);
        setVehicleName(vehicles.vehicleName);
        setCategory(vehicles.category);
        setFuelType(vehicles.fuelType);
        setStatus(vehicles.status);
        setRemark(vehicles.remark);
    }, [vehicles]);

    function handleSubmit() {
        const delVehicle = new Vehicle(code,licensePlateNumber,vehicleName,category,fuelType,status,remark);
        dispatch(deleteVehicle(delVehicle));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={isType} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <div>
                        <p className="text-white">Member Code : {vehicles.code}</p>
                        <p className="text-white">{`${vehicles.category} : ${vehicles.vehicleName}`}</p>
                        <p className="text-white">License Plate Number : {vehicles.licensePlateNumber}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure delete this vehicle?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteVehicle;