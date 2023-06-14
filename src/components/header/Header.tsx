import React from "react";
import { Row, Col, Menu } from "antd";
import {
  HomeOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <section
      style={{
        backgroundColor: "white",
        position: "sticky",
        top: "0",
        left: "0",
        zIndex: "91",
      }}
    >
      <Row style={{ padding: "10px 20px" }}>
        <Col span={8}>
          <Menu mode="horizontal">
            <Menu.Item key="men">
              <Link style={{ fontWeight: "500" }} to={"/products/men"}>
                Men
              </Link>
            </Menu.Item>
            <Menu.Item key="women">
              <Link style={{ fontWeight: "500" }} to={"/products/women"}>
                Women
              </Link>
            </Menu.Item>
            <Menu.Item key="kids">
              <Link style={{ fontWeight: "500" }} to={"/products/kids"}>
                Kids
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={8}>
          <div className="logo" style={{ textAlign: "center", color: "white" }}>
            <Link style={{ fontWeight: "500" }} to={"/"}>
              <img
                height={"30px"}
                style={{ margin: "18px 0" }}
                src="https://i.imgur.com/bTDDGUd.png"
                alt=""
              />
            </Link>
          </div>
        </Col>
        <Col span={8}>
          <Menu
            mode="horizontal"
            style={{
              justifyContent: "flex-end",
            }}
          >
            <Menu.Item key="home" icon={<HomeOutlined />}>
              <Link to={"/"} style={{ fontWeight: "500" }}>
                Home
              </Link>
            </Menu.Item>
            <Menu.Item key="shop" icon={<ShoppingOutlined />}>
              <Link to={"/products"} style={{ fontWeight: "500" }}>
                Shop
              </Link>
            </Menu.Item>
            <Menu.Item key="account" icon={<UserOutlined />}>
              <Link to={"/auth"} style={{ fontWeight: "500" }}>
                Account
              </Link>
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </section>
  );
};

export default Header;
