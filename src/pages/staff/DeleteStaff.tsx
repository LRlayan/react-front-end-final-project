import React, {useEffect, useState} from 'react';
import MainModal from "../../components/modal/MainModal.tsx";
import {Staff} from "../../model/Staff.ts";
import {useDispatch} from "react-redux";
import {deleteStaff} from "../../reducer/StaffSlice.ts";

const DeleteStaff: React.FC<{isOpen:boolean; onClose: () => void; staff:Staff}> = ({ isOpen, onClose, staff }) => {

    const dispatch = useDispatch();
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
    }, [staff]);

    function handleSubmit() {
        const delStaff = new Staff(memberCode,firstName,lastName,joinedDate,designation,gender,dob,addressLine01,addressLine02,addressLine03,addressLine04,addressLine05,mobile,email,role);
        dispatch(deleteStaff(delStaff));
        onClose();
    }

    return(
        <>
            <MainModal isType={"DELETE STAFF"} isOpen={isOpen} buttonType={"Yes,I'm Sure"} onClose={onClose}
                       onSubmit={handleSubmit}>
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