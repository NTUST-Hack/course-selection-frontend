import { Layout, Space } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Footer, Header } from "antd/es/layout/layout";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#7dbcea",
};

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#108ee9",
  overflow: "scroll",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#3ba0e9",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#7dbcea",
};

const App: React.FC = () => (
  <Layout style={{ minHeight: "100vh" }}>
    <Sider style={siderStyle}>Sider</Sider>
    <Layout style={{ maxHeight: "100vh" }}>
      <Header style={headerStyle}>Header</Header>
      <Content style={contentStyle}>
        Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br /> Content
        <br />
        <Footer style={footerStyle}>Footer</Footer>
      </Content>
    </Layout>
  </Layout>
);

export default App;
