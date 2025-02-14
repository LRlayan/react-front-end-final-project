import React, {useEffect, useState} from 'react';
import MainModal from "../../components/modal/MainModal.tsx";
import {Staff} from "../../model/Staff.ts";
import {useDispatch} from "react-redux";
import {deleteStaff} from "../../reducer/StaffSlice.ts";
import {Log} from "../../model/Log.ts";
import {Field} from "../../model/Field.ts";
import {Vehicle} from "../../model/Vehicle.ts";
import {Equipment} from "../../model/Equipment.ts";
import {AppDispatch} from "../../store/store.ts";
const DeleteStaff: React.FC<{isOpen:boolean; onClose: () => void; staff:Staff; isType:string; buttonType:string}> = ({ isOpen, onClose, staff, isType, buttonType }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [memberCode, setMemberCode] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [joinedDate, setJoinedDate] = useState("");
    const [designation, setDesignation] = useState("");
    const [gender, setGender] = useState("");
    const [dob, setDob] = useState("");
    const [addressLine01, setAddressLine01] = useState("");
    const [addressLine02, setAddressLine02] = useState("");
    const [addressLine03, setAddressLine03] = useState("");
    const [addressLine04, setAddressLine04] = useState("");
    const [addressLine05, setAddressLine05] = useState("");
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [selectedLogs, setLogs] = useState<Log[]>([]);
    const [selectedFields, setFields] = useState<Field[]>([]);
    const [selectedVehicles, setVehicles] = useState<Vehicle[]>([]);
    const [selectedEquipments, setEquipments] = useState<Equipment[]>([]);

    useEffect(() => {
        setMemberCode(staff.code);
        setFirstName(staff.firstName);
        setLastName(staff.lastName);
        setJoinedDate(staff.joinedDate);
        setDesignation(staff.designation);
        setGender(staff.gender);
        setDob(staff.dob);
        setAddressLine01(staff.addressLine01);
        setAddressLine02(staff.addressLine02);
        setAddressLine03(staff.addressLine03);
        setAddressLine04(staff.addressLine04);
        setAddressLine05(staff.addressLine05);
        setMobile(staff.mobile);
        setEmail(staff.email);
        setRole(staff.role);
        setLogs(staff.assignLogs);
        setFields(staff.assignFields);
        setVehicles(staff.assignVehicles);
        setEquipments(staff.assignEquipments);
    }, [staff]);

    function handleSubmit() {
        new Staff(memberCode, firstName, lastName, joinedDate, designation, gender, dob, addressLine01, addressLine02, addressLine03, addressLine04, addressLine05, mobile, email, role, selectedLogs, selectedFields, selectedVehicles, selectedEquipments);
        dispatch(deleteStaff(memberCode));
        onClose();
    }

    return(
        <>
            <MainModal isType={isType} isOpen={isOpen} buttonType={buttonType} onClose={onClose} onSubmit={handleSubmit}>
                <div>
                    <div>
                        <p className="text-white">Member Code : {staff.code}</p>
                        <p className="text-white">Name : {`${staff.firstName} ${staff.lastName}`}</p>
                        <p className="text-white">Role : {staff.role}</p>
                        <p className="text-white">Email : {staff.email}</p>
                    </div>
                    <div className="flex justify-end">
                        <h3 className="text-white mb-3">Are you sure delete this staff member?</h3>
                    </div>
                </div>
            </MainModal>
        </>
    )
}

export default DeleteStaff;