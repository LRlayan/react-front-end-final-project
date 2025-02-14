import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import MainModal from "../../components/modal/MainModal.tsx";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps} from "antd";
import {Staff} from "../../model/Staff.ts";
import {updateStaff} from "../../reducer/StaffSlice.ts";
import {LogRootState} from "../../reducer/LogSlice.ts";
import {Log} from "../../model/Log.ts";
import tagRender from "../../util/TagRender.tsx";
import {Field} from "../../model/Field.ts";
import {FieldRootState} from "../../reducer/FieldSlice.ts";
import {Vehicle} from "../../model/Vehicle.ts";
import {VehicleRootState} from "../../reducer/VehicleSlice.ts";
import {Equipment} from "../../model/Equipment.ts";
import {EquipmentRootState} from "../../reducer/EquipmentSlice.ts";
import {AppDispatch} from "../../store/store.ts";

const UpdateStaff: React.FC<{isOpen:boolean; onClose: () => void; staff:Staff; isType:string; buttonType:string}> = ({ isOpen, onClose, staff, isType, buttonType }) => {

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
    const logs = useSelector((state:LogRootState) => state.log.logs);
    const field = useSelector((state:FieldRootState) => state.field.fields);
    const vehicle = useSelector((state:VehicleRootState) => state.vehicle.vehicles);
    const equipment = useSelector((state:EquipmentRootState) => state.equipment.equipments);

    const logOptions: SelectProps['options'] = logs.map((log) => ({
        label: log.name,
        value: log.code
    }));

    const fieldOptions: SelectProps['options'] = field.map((field) => ({
        label: field.name,
        value: field.code
    }));

    const vehicleOptions: SelectProps['options'] = vehicle.map((vehicle) => ({
        label: vehicle.vehicleName,
        value: vehicle.code
    }));

    const equipmentOptions: SelectProps['options'] = equipment.map((equipment) => ({
        label: equipment.name,
        value: equipment.code
    }));

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
        setLogs(staff.assignLog);
        setFields(staff.assignFields);
        setVehicles(staff.assignVehicles);
        setEquipments(staff.assignEquipments);
    }, [staff]);

    function handleSubmit() {
        const updateMember = new Staff(memberCode,firstName,lastName,joinedDate,designation,gender,dob,addressLine01,addressLine02,addressLine03,addressLine04,addressLine05,mobile,email,role,selectedLogs,selectedFields,selectedVehicles,selectedEquipments);
        dispatch(updateStaff(updateMember));
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
            <MainModal isType={isType} buttonType={buttonType} isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        {/*<label className="block text-sm font-medium text-gray-50">First Name</label>*/}
                        <Label labelName={"First Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Last Name"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
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
                    <div className="mb-4 custom-input">
                        <Label labelName={"Email"}/>
                        <Input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Joined Date"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setJoinedDate(e.target.value)}
                            value={joinedDate}
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
                    <div className="mb-4 custom-input">
                        <Label labelName={"Date Of Birth"}/>
                        <Input
                            type="date"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setDob(e.target.value)}
                            value={dob}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Address Line 01"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine01(e.target.value)}
                            value={addressLine01}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Address Line 02"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine02(e.target.value)}
                            value={addressLine02}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Address Line 03"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine03(e.target.value)}
                            value={addressLine03}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Address Line 04"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine04(e.target.value)}
                            value={addressLine04}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Address Line 05"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setAddressLine05(e.target.value)}
                            value={addressLine05}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Mobile"}/>
                        <Input
                            type="email"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setMobile(e.target.value)}
                            value={mobile}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Logs"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            value={(selectedLogs || []).map((log: Log) => log.name)}
                            options={logOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedLogs = selectedValues
                                    .map((value: string) => {
                                        const matchedLog = logs.find((log) => log.code === value);
                                        return matchedLog ? {...matchedLog} : null;
                                    })
                                    .filter((log): log is any => log !== null);
                                setLogs(updatedLogs);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Field"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            value={selectedFields.map((f: Field) => f.code)}
                            options={fieldOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedFields = selectedValues
                                    .map((value: string) => {
                                        const matchedField = field.find((f) => f.code === value);
                                        return matchedField ? {...matchedField} : null;
                                    })
                                    .filter((f): f is any => f !== null && f !== undefined);
                                setFields(updatedFields);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Vehicles"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            value={selectedVehicles.map((v) => v.vehicleName)}
                            options={vehicleOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedVehicle = selectedValues
                                    .map((value: string) => {
                                        const matchedVehicle = vehicle.find((v) => v.code === value);
                                        return matchedVehicle ? {...matchedVehicle} : null;
                                    })
                                    .filter((v): v is Vehicle => v !== null);
                                setVehicles(updatedVehicle);
                            }}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Equipments"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            value={selectedEquipments.map((e) => e.name)}
                            options={equipmentOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const updatedEquipment = selectedValues
                                    .map((value: string) => {
                                        const matchedEquipment = equipment.find((e) => e.code === value);
                                        return matchedEquipment ? {...matchedEquipment} : null;
                                    })
                                    .filter((e): e is Equipment => e !== null);
                                setEquipments(updatedEquipment);
                            }}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default UpdateStaff;