import React from 'react';
import { Button, Modal, Space } from 'antd';

const error = () => {
    Modal.error({
        title: 'Rejected',
        content: 'Failed to save crop. Please try again!',
    });
};

const Success: React.FC = () => (
    <Space wrap>
        <Button onClick={error}>Success</Button>
    </Space>
);

export default Success;