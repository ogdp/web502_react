import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, message, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { IProduct, ICategory } from "../../../types/product";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import SearchBox from "./SearchBox";
import { formatCurrencyVND } from "../../../function_global/products";
const { confirm } = Modal;

interface IProps {
  getProduct: () => any;
  remove: (id: number) => any;
  getCategory: () => any;
}

const ProductList = (props: IProps) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<IProduct[]>();
  const [categories, setCategories] = useState<ICategory[]>([]);
  useEffect(() => {
    (async () => {
      try {
        const { data }: { data: IProduct[] } = await props.getProduct();
        setProducts(data);
        setCategories((await props.getCategory()).data);
      } catch (error) {}
    })();
  }, []);
  const columns: ColumnsType<any> = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (_: any, record: IProduct) => (
        <h4 style={{ color: "red" }}>{formatCurrencyVND(record.price)}</h4>
      ),
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      key: "image",
      render: (_: any, record: IProduct) => (
        <div>
          <img width={64} height={54} src={`${record.image}`} alt="" />
        </div>
      ),
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Danh mục",
      dataIndex: "categoryID",
      key: "categoryID",
      render: (_: any, record: IProduct) => (
        <div>
          {categories.map((item) =>
            item.id == record.categoryID ? item.name : ""
          )}
        </div>
      ),
    },
    {
      title: "Tuỳ chọn",
      dataIndex: "actions",
      key: "actions",
      render: (_: any, record: IProduct) => (
        <div>
          <Button
            style={{
              color: "#2f54eb",
              border: "1px solid #2f54eb",
              marginRight: "5px",
            }}
            onClick={() => {
              navigate(`/admin/products/${record.id}/update`);
            }}
          >
            Cập nhật
          </Button>

          <Button onClick={() => showDeleteConfirm(record)} danger>
            Xoá
          </Button>
        </div>
      ),
    },
  ];
  if (products?.length == 0) {
    return <div>Loadding ... </div>;
  }
  const showDeleteConfirm = (product: IProduct) => {
    confirm({
      title: "Bạn có chắc chắn xoá sản phẩm này không?",
      icon: <ExclamationCircleOutlined />,
      content: `Sản phẩm: ${product.name}`,
      okText: "Xoá",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        const id = Number(product.id);
        (async () => {
          await props.remove(id);
          setProducts(products?.filter((p) => p.id !== product.id));
          const { data }: { data: IProduct[] } = await props.getProduct();
          setProducts(data);
          message.success("Xoá thành công");
        })();
      },
    });
  };
  const handleSearch = async (value: string) => {
    const { data }: { data: IProduct[] } = await props.getProduct();
    const filteredData = await data?.filter((p) => p.name == value);
    if (filteredData.length > 0) {
      // console.log("Tìm thấy", filteredData);
      setProducts(filteredData);
    } else {
      await setProducts(data);
      message.warning("Không tìm thấy sản phẩm");
      // console.log("Không tìm thấy", data);
    }
  };
  return (
    <section>
      <Link to="/admin/products/add">
        <Button style={{ backgroundColor: "#1677ff", color: "white" }}>
          Thêm sản phẩm
        </Button>
      </Link>
      <Link to="/admin/products/category">
        <Button style={{ backgroundColor: "#fa8c16", color: "white" }}>
          Quản lý danh mục
        </Button>
      </Link>
      <div>
        <Row>
          <Col md={12}></Col>
          <Col md={12} style={{ padding: "0 10%" }}>
            <SearchBox onSearch={handleSearch} />
          </Col>
        </Row>
      </div>
      <div>
        <h3
          style={{ textAlign: "center", fontSize: "29px", fontWeight: "500" }}
        >
          Danh sách sản phẩm
        </h3>
        <Table columns={columns} dataSource={products} />
      </div>
    </section>
  );
};

export default ProductList;
