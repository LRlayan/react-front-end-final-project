import {FieldModal} from "../../components/filed/FieldModal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {Field} from "../../model/Field.ts";
import {addField} from "../../reducer/FieldSlice.ts";
import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";

export function FieldPage() {

    const dispatch = useDispatch()
    const fields = useSelector((state) => state.field.fields) || []
    const [open, setOpen] = useState(false);
    const [fieldName, setFieldName] = useState("");
    const [location, setLocation] = useState("");
    const [extentSize, setExtentSize] = useState("");
    const [image, setImage] = useState<File | null>(null);

    function handleSubmit() {
        const newField = new Field("",fieldName,location,extentSize,image);
        dispatch(addField(newField));
        setOpen(false);
    }

    return(
        <>
            <section id="fields-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    {/* Search Bar */}
                    <div className="mb-6">
                        <div className="relative">
                            {/*<input*/}
                            {/*    id="filterFieldCard"*/}
                            {/*    type="text"*/}
                            {/*    className="form-control w-full rounded-md px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"*/}
                            {/*    placeholder="Search field by name"*/}
                            {/*    aria-label="Search"*/}
                            {/*/>*/}
                            {/*<span className="absolute inset-y-0 right-3 flex items-center text-gray-500">*/}
                            {/*    🔍*/}
                            {/*</span>*/}
                            <Search placeholder="search field by name" enterButton />
                        </div>
                    </div>

                    {/* Heading and New Button in One Row */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-bold text-white">
                            Field Details
                        </h3>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined />}
                            className="btn bg-green-500 hover:bg-green-600 text-white font-semibold h-10 w-[150px] rounded-md shadow-md flex items-center justify-center"
                            onClick={() => setOpen(true)}
                        >
                            New
                        </Button>
                    </div>

                    {/* Field Card */}
                    <div id="fieldCard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Add card dynamically */}
                        {
                            fields.map((field, index) => (
                                <div key={index} className="border rounded-lg bg-gray-700 text-white p-4 shadow-md">
                                    {field.image && (
                                        <img
                                            src={URL.createObjectURL(field.image)}
                                            alt={field.fieldName}
                                            className="w-full h-32 object-cover rounded-md mb-2"
                                        />
                                    )}
                                    <h4 className="text-lg font-semibold">{field.code}</h4>
                                    <p className="text-sm">Name: {field.fieldName}</p>
                                    <p className="text-sm">Location: {field.location}</p>
                                    <p className="text-sm">Extent Size: {field.extentSize}</p>
                                    <div className="mt-4 flex justify-between">
                                        <button
                                            id="updateField"
                                            type="button"
                                            className="btn bg-green-500 hover:bg-green-600 text-white font-semibold h-10 w-[150px] rounded-md shadow-md flex items-center justify-center mr-2"
                                        >
                                            Update
                                        </button>
                                        <button
                                            id="deleteField"
                                            type="button"
                                            className="btn bg-red-500 hover:bg-red-600 text-white font-semibold h-10 w-[150px] rounded-md shadow-md flex items-center justify-center"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </section>

            {/* Pass `setOpen` as prop to CropModal */}
            <FieldModal
                open={open}
                setOpen={setOpen}
                setFieldName={setFieldName}
                setLocation={setLocation}
                setExtentSize={setExtentSize}
                setImage={setImage}
                handleSubmit={handleSubmit}
            />
        </>
    )
}