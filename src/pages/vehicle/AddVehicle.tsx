import React, {useState} from 'react';
import MainModal from "../../components/modal/MainModal.tsx";
import Label from "../../components/label/Label.tsx";
import {Input, Select, SelectProps} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {saveVehicle} from "../../reducer/VehicleSlice.ts";
import {Vehicle} from "../../model/Vehicle.ts";
import {Staff} from "../../model/Staff.ts";
import {StaffRootState} from "../../reducer/StaffSlice.ts";
import tagRender from "../../util/TagRender.tsx";
import {AppDispatch} from "../../store/store.ts";

const AddVehicle: React.FC<{ isOpen:boolean; onClose: () => void; isType: string; buttonType: string}> = ({ isOpen, onClose, isType, buttonType }) => {

    const dispatch = useDispatch<AppDispatch>();
    const [licensePlateNumber, setLicensePlateNumber] = useState("");
    const [vehicleName, setVehicleName] = useState("");
    const [category, setCategory] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [status, setStatus] = useState("");
    const [remark, setRemark] = useState("");
    const [selectedStaffs, setStaff] = useState<Staff[]>([]);
    const staff = useSelector((state:StaffRootState) => state.staff.staffs);

    const staffOptions: SelectProps['options'] = staff.map((staff) => ({
        label: staff.code,
        value: staff.code
    }));

    function handleSubmit() {
        const newVehicle = new Vehicle("",licensePlateNumber,vehicleName,category,fuelType,status,remark,selectedStaffs);
        dispatch(saveVehicle(newVehicle));
        onClose();
    }

    const vehicleNameOptions = [
        {
            label: <span>Car</span>,
            title: 'Car',
            options: [
                { label: <span>Toyota Corolla</span>, value: 'Toyota Corolla' },
                { label: <span>Honda Civic</span>, value: 'Honda Civic' },
            ],
        },
        {
            label: <span>Van</span>,
            title: 'Van',
            options: [
                { label: <span>Nissan NV200</span>, value: 'Nissan NV200' },
                { label: <span>Ford Transit</span>, value: 'Ford Transit' },
            ],
        },
        {
            label: <span>Motorbikes</span>,
            title: 'Motorbikes',
            options: [
                { label: <span>Yamaha R15</span>, value: 'Pulser 135' },
                { label: <span>Honda CBR500R</span>, value: 'Discovery 150' },
            ],
        },
        {
            label: <span>Tractors–Land masters</span>,
            title: 'Tractors–Land masters',
            options: [
                { label: <span>John Deere 5050D</span>, value: 'John Deere 5050D' },
                { label: <span>Massey Ferguson 1035 DI</span>, value: 'Massey Ferguson 1035 DI' },
            ],
        },
        {
            label: <span>Tractors-4WD</span>,
            title: 'Tractors-4WD',
            options: [
                { label: <span>Mahindra Yuvo 575 DI</span>, value: 'Mahindra Yuvo 575 DI' },
                { label: <span>Sonalika DI 60 RX</span>, value: 'Sonalika DI 60 RX' },
            ],
        },
        {
            label: <span>Tankers truck</span>,
            title: 'Tankers truck',
            options: [
                { label: <span>Volvo FMX</span>, value: 'Volvo FMX' },
                { label: <span>Scania P360</span>, value: 'Scania P360' },
            ],
        },
        {
            label: <span>Land vehicles</span>,
            title: 'Land vehicles',
            options: [
                { label: <span>Jeep Wrangler</span>, value: 'Jeep Wrangler' },
                { label: <span>Land Rover Defender</span>, value: 'Land Rover Defender' },
            ],
        },
        {
            label: <span>Lorry</span>,
            title: 'Lorry',
            options: [
                { label: <span>TATA 407</span>, value: 'TATA 407' },
                { label: <span>Ashok Leyland Dost</span>, value: 'Ashok Leyland Dost' },
            ],
        },
    ];

    const categoryOptions = [
        {value: "Car", label: "Car"},
        {value: "Van", label: "Van"},
        {value: "Motorbikes", label: "Motorbikes"},
        {value: "Tractors–Land masters", label: "Tractors–Land masters"},
        {value: "Tractors-4WD", label: "Tractors-4WD"},
        {value: "Tankers truck", label: "Tankers truck"},
        {value: "Land vehicles", label: "Land vehicles"},
        {value: "Lorry", label: "Lorry"},
    ]

    const fuelTypeOptions = [
        {value: "Petrol", label: "Petrol"},
        {value: "Diesel", label: "Diesel"},
    ]

    const statusOptions = [
        {value: "Available", label: "Available"},
        {value: "Unavailable", label: "Unavailable"},
    ]

    return(
        <>
            <MainModal isOpen={isOpen} onClose={onClose} isType={isType} buttonType={buttonType} onSubmit={handleSubmit}>
                <form>
                    <div className="mb-4 custom-input">
                        <Label labelName={"License Plate Number"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setLicensePlateNumber(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Vehicle Name"}/>
                        <Select
                            placeholder="Select vehicle name"
                            optionFilterProp="label"
                            value={vehicleName || undefined}
                            onChange={(value) => setVehicleName(value)}
                            options={vehicleNameOptions}
                            style={{
                                color: vehicleName ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                vehicleName ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4">
                        <Label labelName={"Category"}/>
                        <Select
                            showSearch
                            placeholder="Select category of vehicle"
                            optionFilterProp="label"
                            options={categoryOptions}
                            value={category || undefined}
                            onChange={(value) => setCategory(value)}
                            style={{
                                color: category ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                category ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Fuel Type"}/>
                        <Select
                            showSearch
                            placeholder="Select category of vehicle"
                            optionFilterProp="label"
                            options={fuelTypeOptions}
                            value={fuelType || undefined}
                            onChange={(value) => setFuelType(value)}
                            style={{
                                color: fuelType ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                fuelType ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Status"}/>
                        <Select
                            showSearch
                            placeholder="Select status of vehicle"
                            optionFilterProp="label"
                            options={statusOptions}
                            value={status || undefined}
                            onChange={(value) => setStatus(value)}
                            style={{
                                color: status ? "black" : "gray",
                            }}
                            dropdownStyle={{
                                backgroundColor: "white",
                                color: "black",
                            }}
                            className={`w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 ${
                                status ? "text-black" : "text-gray-500"
                            }`}
                            dropdownClassName="custom-dropdown"
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Remark"}/>
                        <Input
                            type="text"
                            className="mt-1 block w-full px-4 py-1 border rounded-md shadow-sm"
                            onChange={(e) => setRemark(e.target.value)}
                        />
                    </div>
                    <div className="mb-4 custom-input">
                        <Label labelName={"Assign Staff Member"}/>
                        <Select
                            mode="multiple"
                            tagRender={tagRender}
                            style={{
                                width: '100%',
                                color: 'black',
                            }}
                            options={staffOptions}
                            dropdownStyle={{
                                backgroundColor: 'white',
                            }}
                            dropdownClassName="custom-dropdown"
                            onChange={(selectedValues) => {
                                const selectedStaff = selectedValues.map((value: string) => {
                                    const matchedStaff = staff.find((s) => s.code === value);
                                    return matchedStaff
                                        ? {
                                            ...matchedStaff,
                                            staffName: matchedStaff.firstName,
                                        }
                                        : null;
                                });
                                const validStaff = selectedStaff.filter((s: Staff) => s !== null);
                                setStaff(validStaff as Staff[]);
                            }}
                        />
                    </div>
                </form>
            </MainModal>
        </>
    )
}

export default AddVehicle;