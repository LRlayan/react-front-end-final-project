import React from "react";
import {Button} from "antd";
import {Field} from "../../model/Field.ts";
import {Crop} from "../../model/Crop.ts";
import {Log} from "../../model/Log.ts";
import {Staff} from "../../model/Staff.ts";
import {Equipment} from "../../model/Equipment.ts";

interface CardProps {
    cardType: string;
    filteredData: Crop[] | Field[] | Log[];
    openUpdateModal: (data:any) => void;
    openDeleteModal: (data:any) => void;
}

const Card: React.FC<CardProps> = ({
    cardType,
    filteredData,
    openUpdateModal,
    openDeleteModal,
}) => {
    return(
        <>
            {filteredData.map((data:any, index:number) => (
                <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                    {data.image && (
                        <img
                            src={`http://localhost:3000/uploads/${cardType}/${data.image}`}
                            alt={data.name}
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                    )}
                    <div className="flex flex-col space-y-2">
                        {cardType === "crop" && (
                            <>
                                <h4 className="text-lg font-semibold">{data.code}</h4>
                                <p className="text-sm">Scientific Name: {data.name}</p>
                                <p className="text-sm">Category: {data.category}</p>
                                <p className="text-sm">Season: {data.season}</p>
                                <p className="text-sm">
                                    Fields: {data && data.assignFields && data.assignFields.length
                                    ? data.assignFields.map((f: Field) => f.name).join(", ")
                                    : "No Fields"}
                                </p>
                                <p className="text-sm">
                                    Logs: {data && data.assignLogs && data.assignLogs.length
                                    ? data.assignLogs.map((l: Log) => l.name).join(", ")
                                    : "No Logs"}
                                </p>
                            </>
                        )}
                        {cardType === "FIELD" && (
                            <>
                                <h4 className="text-lg font-semibold">{data.code}</h4>
                                <p className="text-sm">Name: {data.name}</p>
                                <p className="text-sm">Location: {data.location}</p>
                                <p className="text-sm">Extent Size: {data.extentSize}</p>
                                <p className="text-sm">Crops: {data ? data.assignCrops.map((c: Crop) => c.name).join(", ") : "No Crops"}</p>
                                <p className="text-sm">Logs: {data ? data.assignLogs.map((l: Log) => l.name).join(", ") : "No Logs"}</p>
                                <p className="text-sm">Members: {data ? data.assignStaffMembers.map((s: Staff) => s.code).join(", ") : "No Members"}</p>
                                <p className="text-sm">Equipments: {data ? data.assignEquipments.map((e: Equipment) => e.name).join(", ") : "No Equipments"}</p>
                            </>
                        )}
                        {cardType === "LOG" && (
                            <>
                                <h4 className="text-lg font-semibold">{data.code}</h4>
                                <p className="text-sm">Log Title: {data.name}</p>
                                <p className="text-sm">Log Date: {data.logDate}</p>
                                <p className="text-sm">Log Details: {data.logDetails}</p>
                                <p className="text-sm">Crops: {data ? data.assignCrops.map((c: Crop) => c.name).join(", ") : "No Crops"}</p>
                                <p className="text-sm">Fields: {data ? data.assignFields.map((f: Field) => f.name).join(", ") : "No Fields"}</p>
                                <p className="text-sm">Members: {data ? data.assignStaff.map((s: Staff) => s.code).join(", ") : "No Members"}</p>
                            </>
                        )}
                    </div>
                    <div className="flex space-x-2 mt-2">
                        {/* Update Button */}
                        <Button
                            type="primary"
                            className="btn bg-green-500 hover:bg-green-600 text-white"
                            style={{width: '140px'}}
                            onClick={() => openUpdateModal(data)}
                        >
                            Update
                        </Button>
                        {/* Delete Button */}
                        <Button
                            className="btn bg-red-500 hover:bg-red-600 text-white border-red-500"
                            style={{width: '140px'}}
                            onClick={() => openDeleteModal(data)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Card;