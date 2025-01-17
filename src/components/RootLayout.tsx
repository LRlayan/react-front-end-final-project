import {Layout, Menu, theme} from "antd";
import {
    AppstoreOutlined,
    CarOutlined,
    DashboardOutlined,
    DiffOutlined,
    FieldTimeOutlined,
    TeamOutlined,
    ToolOutlined
} from "@ant-design/icons";
import React, { useState } from "react";
import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router";
import {Dashboard} from "../pages/Dashboard.tsx";
import CropPage from "../pages/crop/CropPage.tsx";
import {FieldPage} from "../pages/field/FieldPage.tsx";
import LogPage from "../pages/log/LogPage.tsx";
import StaffPage from "../pages/staff/StaffPage.tsx";
import VehiclePage from "../pages/vehicle/VehiclePage.tsx";
import {EquipmentPage} from "../pages/equipment/EquipmentPage.tsx";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: '/',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
        path: '/'
    },
    {
        key: '/crop-manage',
        icon: <AppstoreOutlined />,
        label: 'Crop Manage',
        path: '/crop-manage'
    },
    {
        key: '/field-manage',
        icon: <FieldTimeOutlined />,
        label: 'Field Manage',
        path: '/field-manage'
    },
    {
        key: '/staff-manage',
        icon: <TeamOutlined />,
        label: 'StaffPage Manage',
        path: '/staff-manage',
    },
    {
        key: '/log-manage',
        icon: <DiffOutlined />,
        label: 'LogPage Manage',
        path: '/log-manage',
    },
    {
        key: '/equipment-manage',
        icon: <ToolOutlined />,
        label: 'EquipmentPage Manage',
        path: '/equipment-manage'
    },
    {
        key: '/vehicle-manage',
        icon: <CarOutlined />,
        label: 'Vehicle Manage',
        path: '/vehicle-manage'
    },
];

const RootLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate();
    const location = useLocation();

    const [selectedKey, setSelectedKey] = useState(location.pathname);

    const handleMenuClick = (e: { key: string }) => {
        setSelectedKey(e.key); // Update the selected key
        navigate(e.key); // Navigate to the selected path
    };

    return (
        <Layout>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                onBreakpoint={(broken) => {
                    console.log(broken);
                }}
                onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                }}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[selectedKey]} // Set active menu item
                    onClick={handleMenuClick}
                    items={items}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{margin: '24px 16px 0'}}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 442,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Routes>
                            {/* Default route */}
                            <Route path="/" element={<Dashboard/>}/>
                            {/* Add more routes for other sections */}
                            <Route path="/crop-manage" element={<CropPage/>}/>
                            <Route path="/field-manage" element={<FieldPage/>}/>
                            <Route path="/log-manage" element={<LogPage/>}/>
                            <Route path="/staff-manage" element={<StaffPage/>}/>
                            <Route path="/equipment-manage" element={<EquipmentPage/>}/>
                            <Route path="/vehicle-manage" element={<VehiclePage/>}/>
                            {/* Redirect unknown routes to Dashboard */}
                            <Route path="*" element={<Navigate to="/"/>}/>
                        </Routes>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>
                    Crop Monitor System ©{new Date().getFullYear()} Created by Green Shadow
                </Footer>
            </Layout>
        </Layout>
    );
};

export default RootLayout;
