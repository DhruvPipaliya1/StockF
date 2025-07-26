import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png'; 
import './MainLayout.css';

const { Header, Sider, Content } = Layout;

const MainLayout = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
        {collapsed ? (
          <img src={logo} alt="Logo" style={{ width: 32, height: 32, marginBottom: 5 }} />
        ) : (
          'Magic Formula Screener'
        )}
      </div>

        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          onClick={({ key }) => navigate(key)}
          items={[
            {
              key: '/backend/top50',
              icon: <UserOutlined />,
              label: 'Top Companies',
            },
            {
              key: '/backend/all-companies',
              icon: <VideoCameraOutlined />,
              label: 'All Companies',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div style={{ marginRight: 24, display: 'flex', gap: 12 }}>
            <Button type="default" onClick={() => navigate('/')}>
              Back to Home
            </Button>
            <Button onClick={onLogout} type="primary" danger>
              Logout
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet /> 
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
