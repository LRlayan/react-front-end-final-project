import React, { useState } from "react";
import { useSelector } from "react-redux";
import AddCrop from "./AddCrop";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/es/input/Search";

const CropPage = () => {
    const [open, setOpen] = useState(false);
    const crops = useSelector((state) => state.crop.crops) || [];

    return (
        <section id="crops-sec" className="mt-4 p-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <Search placeholder="search crop by name" enterButton />
                    <h3 className="text-xl font-bold text-white">Crop Details</h3>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        className="btn bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => setOpen(true)}
                    >
                        New
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {crops.map((crop, index) => (
                        <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                            {crop.image && (
                                <img
                                    src={URL.createObjectURL(crop.image)}
                                    alt={crop.cropName}
                                    className="w-full h-32 object-cover rounded-md mb-2"
                                />
                            )}
                            <h4 className="text-lg font-semibold">{crop.cropName}</h4>
                            <p className="text-sm">Scientific Name: {crop.scientificName}</p>
                            <p className="text-sm">Category: {crop.category}</p>
                            <p className="text-sm">Season: {crop.season}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* AddCrop Modal */}
            <AddCrop isOpen={open} onClose={() => setOpen(false)} />
        </section>
    );
};

export default CropPage;
