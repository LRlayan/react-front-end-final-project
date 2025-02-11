import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import Search from "antd/es/input/Search";
import {Button} from "antd";
import {PlusCircleOutlined} from "@ant-design/icons";
import AddField from "./AddField.tsx";
import UpdateField from "./UpdateField.tsx";
import DeleteField from "./DeleteField.tsx";
import {Field} from "../../model/Field.ts";
import {FieldRootState, getAllFields} from "../../reducer/FieldSlice.ts";
import SearchingTableData from "../../util/SearchingTableData.ts";
import Card from "../../components/card/Card.tsx";
import {AppDispatch} from "../../store/store.ts";

export function FieldPage() {

    const [open, setOpen] = useState(false);
    const fields = useSelector((state: FieldRootState) => state.field.fields) || []
    const [modalType , setModalType] = useState("");
    const [selectedField, setSelectedField] = useState<Field | null>();
    const [filteredField, setFilteredField] = useState<Field[]>(fields);
    const dispatch = useDispatch<AppDispatch>();
    const searchingTableData = new SearchingTableData();

    useEffect(() => {
        setFilteredField(fields);
    }, [fields]);

    useEffect(() => {
        dispatch(getAllFields());
    },[dispatch]);

    function openAddModal() {
        setOpen(true);
        setModalType("add");
    }

    function openUpdateModal(field: Field) {
        setOpen(true);
        setSelectedField(field);
        setModalType("update");
    }

    function openDeleteModal(field: Field) {
        setOpen(true);
        setSelectedField(field);
        setModalType("delete");
    }

    const searching = (value:string) => {
        const filteredData = searchingTableData.findData(value,fields,"FIELD");
        setFilteredField(filteredData);
    }


    return(
        <>
            <section id="fields-sec" className="mt-4 p-6">
                <div className="container mx-auto">
                    {/* Search Bar */}
                    <div className="flex justify-between items-center mb-4">
                        <Search className="mr-5" placeholder="search field by name" enterButton onChange={(e) => {searching(e.target.value)}}/>
                        <Button
                            type="primary"
                            icon={<PlusCircleOutlined/>}
                            className="btn bg-green-500 hover:bg-green-600 text-white"
                            onClick={() => openAddModal()}
                        >
                            New
                        </Button>
                    </div>

                    {/* Field Card */}
                    <div id="fieldCard" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Card cardType={"field"} filteredData={filteredField} openUpdateModal={openUpdateModal} openDeleteModal={openDeleteModal}/>
                    </div>
                </div>
                {open && modalType === "add" && (
                    <AddField
                        isOpen={open}
                        buttonType={"Save"}
                        isType={"ADD FIELD"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedField(null);
                        }}
                    />
                )}
                {open && selectedField && modalType === "update" && (
                    <UpdateField
                        isOpen={open}
                        isType={"UPDATE FIELD"}
                        buttonType={"Update"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedField(null);
                        }}
                        field={selectedField}
                    />
                )}
                {open && selectedField && modalType === "delete" && (
                    <DeleteField
                        isOpen={open}
                        isType={"DELETE FIELD"}
                        buttonType={"Yes,I'm Sure"}
                        onClose={() => {
                            setOpen(false);
                            setSelectedField(null);
                        }}
                        field={selectedField}
                    />
                )}
            </section>
        </>
    )
}