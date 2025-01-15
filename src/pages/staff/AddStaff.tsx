import React, {useState} from "react";
import MainModal from "../../components/modal/MainModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {IdGenerator} from "../../util/IdGenerator.ts";
import {Staff} from "../../model/Staff.ts";
import {addStaff} from "../../reducer/StaffSlice.ts";
import {Input, Select} from "antd";
import Label from "../../components/label/Label.tsx";

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

    const roleOptions = [
        { value: "MANAGER", label: "MANAGER" },
        { value: "ADMINISTRATIVE", label: "ADMINISTRATIVE" },
        { value: "SCIENTIST", label: "SCIENTIST" },
        { value: "OTHER", label: "OTHER" },
    ];

    const designationOptions = [
        { value: "ASSISTANT MANAGER", label: "ASSISTANT MANAGER" },
        { value: "ADMIN AND HR STAFF", label: "ADMIN AND HR STAFF" },
        { value: "OFFICE ASSISTANT", label: "OFFICE ASSISTANT" },
        { value: "SENIOR AGRONOMIST", label: "SENIOR AGRONOMIST" },
        { value: "AGRONOMIST", label: "AGRONOMIST" },
        { value: "SOIL SCIENTIST", label: "SOILS SCIENTIST" },
        { value: "SENIOR TECHNICIAN", label: "SENIOR TECHNICIAN" },
        { value: "TECHNICIAN", label: "TECHNICIAN" },
        { value: "SUPERVISOR", label: "SUPERVISOR" },
        { value: "LABOUR", label: "LABOUR" },
    ];

    const genderOption = [
        { value: "MALE", label: "MALE" },
        { value: "FEMALE", label: "FEMALE" },
    ];

    return(
        <>
            <MainModal isOpen={isOpen} isType={"ADD STAFF MEMBER"} buttonType={"Save"} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4">
                        {/*<label className="block text-sm font-medium text-gray-50">First Name</label>*/}
                        <Label labelName={"First Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Last Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Role"}/>
                        <Select
                            showSearch
                            placeholder="Select your role"
                            optionFilterProp="label"
                            options={roleOptions}
                            value={role || undefined}
                            onChange={(value) => setRole(value)}
                            style={{
                                color: role ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                role ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />

                    </div>
                    <div className="mb-4">
                        <Label labelName={"Email"}/>
                        <Input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Joined Date"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setJoinedDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Designation"}/>
                        <Select
                            showSearch
                            placeholder="Select your designation"
                            optionFilterProp="label"
                            options={designationOptions}
                            value={designation || undefined}
                            onChange={(value) => setDesignation(value)}
                            style={{
                                color: designation ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                designation ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Gender"}/>
                        <Select
                            showSearch
                            placeholder="Select your gender"
                            optionFilterProp="label"
                            options={genderOption}
                            value={gender || undefined}
                            onChange={(value) => setGender(value)}
                            style={{
                                color: gender ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                gender ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Date Of Birth"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setDob(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Address Line 01"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine01(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Address Line 02"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine02(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Address Line 03"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine03(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Address Line 04"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine04(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Address Line 05"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine05(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Mobile"}/>
                        <Input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setMobile(e.target.value)}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default AddStaff;