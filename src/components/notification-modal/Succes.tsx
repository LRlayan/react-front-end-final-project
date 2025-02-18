import React, { useState } from 'react';
import { Modal } from 'antd';

interface NotifyProps {
    isOpen: boolean;
    onClose: () => void;
}

const Success: React.FC<NotifyProps> = ({isOpen, onClose}) => {
    const [confirmLoading, setConfirmLoading] = useState(false);

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setConfirmLoading(false);
            onClose();
        }, 700);
    };

    return (
        <>
            <Modal
                title="Success"
                centered
                open={isOpen}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={onClose}
            >
                <p>Saved Successfully</p>
            </Modal>
        </>
    );
};

export default Success;