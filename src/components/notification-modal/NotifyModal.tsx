import React, { useState } from 'react';
import { Modal } from 'antd';
import {useNavigate} from "react-router";

interface NotifyProps {
    isOpen: boolean;
    onClose: () => void;
}

const App: React.FC<NotifyProps> = ({isOpen, onClose}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const navigate = useNavigate();

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            navigate("/");
            onClose();
        }, 700);
    };

    return (
        <>
            <Modal
                title="Are you sure logout this system ?"
                centered
                open={isOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={onClose}
            >
                <p>Are you sure logout this system ?</p>
            </Modal>
        </>
    );
};

export default App;