import React from 'react';
import './App.css';
import FormGeneric from './components/form/form.component';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import logo from './logo.jpeg';

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

/*
<div className="logo" />
*/
function App() {
  return (
    <Layout>
    <Header style={{position: 'fixed', zIndex: 1, width: '100%' }}>
      
      <img  className="logo" src={logo} alt="My logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1">Registro de informacion</Menu.Item>
        
      </Menu>
    </Header>
    <Content className="site-layout" style={{ marginTop: 64, width:"-webkit-fill-available" }}>
      <div className="site-layout-background" style={{ padding: 24, width: "100%" }}>
        <FormGeneric/>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center' }}>InfoUtility ©2020</Footer>
  </Layout>
  );
}

export default App;
