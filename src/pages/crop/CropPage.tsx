import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import AddCrop from "./AddCrop";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Search from "antd/es/input/Search";
import UpdateCrop from "./UpdateCrop.tsx";
import DeleteCrop from "./DeleteCrop.tsx";
import {Crop} from "../../model/Crop.ts";
import SearchingTableData from "../../util/SearchingTableData.ts";
import {CropRootState, getAllCrops} from "../../reducer/CropSlice.ts";
import Card from "../../components/card/Card.tsx";
import {AppDispatch} from "../../store/store.ts";

const CropPage = () => {
    const [open, setOpen] = useState(false);
    const crops = useSelector((state: CropRootState) => state.crop.crops) || [];
    const [selectedCrop, setSelectedCrop] = useState<Crop | null>();
    const [modalType, setModalType] = useState("");
    const [filteredCrop, setFilteredCrop] = useState<Crop[]>(crops);
    const dispatch = useDispatch<AppDispatch>();
    const searchingTableData = new SearchingTableData();

    useEffect(() => {
        setFilteredCrop(crops);
    }, [crops]);

    useEffect(() => {
        dispatch(getAllCrops());
    },[dispatch]);

    function openUpdateModal(crop: Crop) {
        setSelectedCrop(crop);
        setOpen(true);
        setModalType("update");
    }

    function openDeleteModal(crop: Crop) {
        setSelectedCrop(crop);
        setOpen(true);
        setModalType("delete");
    }

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    const searching = (value:string) => {
        const filteredData = searchingTableData.findData(value,crops,"CROP");
        setFilteredCrop(filteredData);
    }

    return (
        <section id="crops-sec" className="mt-4 p-6">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <Search className="mr-5" placeholder="search crop by name, category, scientificName" enterButton onChange={(e) => {searching(e.target.value)}} />
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        className="btn bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => openAddModal()}
                    >
                        New
                    </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Card cardType={"crop"} filteredData={filteredCrop} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal} />
                </div>
            </div>
            {open && modalType === "add" && (
                <AddCrop
                    isType={"ADD CROP"}
                    buttonType={"Save"}
                    isOpen={open}
                    onClose={() =>
                        setOpen(false)
                    }
                />
            )}
            {open && selectedCrop && modalType === "update" && (
                <UpdateCrop
                    isType={"UPDATE CROP"}
                    buttonType={"Update"}
                    isOpen={open}
                    onClose={() => {
                        setOpen(false);
                        setSelectedCrop(null);
                    }}
                    crop={selectedCrop}
                />
            )}
            {open && selectedCrop && modalType === "delete" && (
                <DeleteCrop
                    isType={"DELETE CROP"}
                    buttonType={"Yes,I'm Sure"}
                    isOpen={open}
                    onClose={() => {
                        setOpen(false);
                        setSelectedCrop(null);
                    }}
                    crop={selectedCrop}
                />
            )}
        </section>
    );
};

export default CropPage;
