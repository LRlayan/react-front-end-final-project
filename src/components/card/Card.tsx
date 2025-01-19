import React from "react";
import {Button} from "antd";
import {Field} from "../../model/Field.ts";
import {Crop} from "../../model/Crop.ts";
import {Log} from "../../model/Log.ts";

interface CardProps {
    filteredData: Crop[] | Field[] | Log[];
    openUpdateModal: (data:any) => void;
    openDeleteModal: (data:any) => void;
    children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({
    filteredData,
    openUpdateModal,
    openDeleteModal,
    children,
}) => {
    return(
        <>
            {filteredData.map((data:any, index:number) => (
                <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                    {data.image && (
                        <img
                            src={URL.createObjectURL(data.image)}
                            alt={data.cropName}
                            className="w-full h-32 object-cover rounded-md mb-2"
                        />
                    )}
                    {children}
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