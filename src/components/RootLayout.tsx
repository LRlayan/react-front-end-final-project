import {Layout, Menu, theme} from "antd";
import {
    AppstoreOutlined,
    CarOutlined,
    DashboardOutlined,
    FieldTimeOutlined,
    TeamOutlined,
    ToolOutlined
} from "@ant-design/icons";
import React from "react";

const { Header, Content, Footer, Sider } = Layout;

const items = [
    {
        key: '1',
        icon: <DashboardOutlined />,
        label: 'Dashboard',
    },
    {
        key: '2',
        icon: <AppstoreOutlined />,
        label: 'Crop Manage',
    },
    {
        key: '3',
        icon: <FieldTimeOutlined />,
        label: 'Field Manage',
    },
    {
        key: '4',
        icon: <TeamOutlined />,
        label: 'Staff Manage',
    },
    {
        key: '5',
        icon: <ToolOutlined />,
        label: 'Equipment Manage',
    },
    {
        key: '6',
        icon: <CarOutlined />,
        label: 'Vehicle Manage',
    },
];

const RootLayout: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

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
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px 0' }}>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 442,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        content
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Crop Monitor System ©{new Date().getFullYear()} Created by Green Shadow
                </Footer>
            </Layout>
        </Layout>
    );
};

export default RootLayout;