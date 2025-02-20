import React, { useState } from 'react';
import { Modal } from 'antd';
import {useNavigate} from "react-router";
import {logout} from "../../reducer/UserSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store/store.ts";

interface NotifyProps {
    title: string;
    message: string;
    isOpen: boolean;
    onClose: () => void;
}

const App: React.FC<NotifyProps> = ({ title, message, isOpen, onClose}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            navigate("/");
            localStorage.removeItem("jwt_token")
            dispatch(logout());
            onClose();
        }, 700);
    };

    return (
        <>
            <Modal
                title={title}
                centered
                open={isOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={onClose}
            >
                <p>{message}</p>
            </Modal>
        </>
    );
};

export default App;