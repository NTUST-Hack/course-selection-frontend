import { ReactNode } from "react";
import { Card, Space } from "antd";

interface Props {
  children?: ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <Space
      direction="horizontal"
      style={{ width: "100%", justifyContent: "center" }}
    >
      {children}
    </Space>
  );
};

export default AuthLayout;
