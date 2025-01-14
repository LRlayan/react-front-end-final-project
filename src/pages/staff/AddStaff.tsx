import React, {useState} from "react";
import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {IdGenerator} from "../../util/IdGenerator.ts";
import {Staff} from "../../model/Staff.ts";
import {addStaff} from "../../reducer/StaffSlice.ts";
import {Select} from "antd";

const AddStaff: React.FC<{ isOpen:boolean; onClose: () => void}> = ({ isOpen, onClose }) => {

    const dispatch = useDispatch();
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
    const [contactNo, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const staff = useSelector((state) => state.staff.staffs);

    const idGenerator = new IdGenerator();

    function handleSubmit() {
        const getLastIndex = staff.length > 0 ? staff[staff.length -1].code : "STAFF-";
        const newCode = idGenerator.codeGenerator("STAFF",getLastIndex);
        const newStaff = new Staff(newCode,firstName,lastName,joinedDate,designation,gender,dob,addressLine01,addressLine02,addressLine03,addressLine04,addressLine05,contactNo,email,role);
        dispatch(addStaff(newStaff));
        onClose();
    }

    return(
        <>
            <MainModal isOpen={isOpen} isType={"ADD STAFF MEMBER"} buttonType={"Save"} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">First Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Last Name</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Role</label>
                        <Select
                            showSearch
                            placeholder="Select your role"
                            optionFilterProp="label"
                            options={[
                                {value: "MANAGER", label: "MANAGER"},
                                {value: "ADMINISTRATIVE", label: "ADMINISTRATIVE"},
                                {value: "SCIENTIST", label: "SCIENTIST"},
                                {value: "OTHER", label: "OTHER"},
                            ]}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Joined Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setJoinedDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Designation</label>
                        <Select
                            showSearch
                            placeholder="Select your designation"
                            optionFilterProp="label"
                            options={[
                                { value: "ASSISTANTMANAGER", label: "ASSISTANT MANAGER" },
                                { value: "ADMINANDHRSTAFF", label: "ADMIN AND HR STAFF" },
                                { value: "OFFICEASSISTANT", label: "OFFICE ASSISTANT" },
                                { value: "SENIORAGRONOMIST", label: "SENIOR AGRONOMIST" },
                                { value: "AGRONOMIST", label: "AGRONOMIST" },
                                { value: "SOILSCIENTIST", label: "SOILS SCIENTIST" },
                                { value: "SENIORTECHNICIAN", label: "SENIOR TECHNICIAN" },
                                { value: "TECHNICIAN", label: "TECHNICIAN" },
                                { value: "SUPERVISOR", label: "SUPERVISOR" },
                                { value: "LABOUR", label: "LABOUR" },
                            ]}
                            onChange={(e) => setDesignation(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Gender</label>
                        <Select
                            showSearch
                            placeholder="Select your gender"
                            optionFilterProp="label"
                            options={[
                                {value: "MALE", label: "MALE"},
                                {value: "FEMALE", label: "FEMALE"},
                            ]}
                            onChange={(e) => setGender(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Date Of Birth</label>
                        <input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Address Line 01</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine01(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Address Line 02</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine02(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Address Line 03</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine03(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Address Line 04</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine04(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Address Line 05</label>
                        <input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine05(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Mobile</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-50">Email</label>
                        <input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default AddStaff;