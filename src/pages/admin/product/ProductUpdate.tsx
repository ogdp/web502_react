import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ICategory, IProduct } from "../../../types/product";
import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  Row,
  Col,
  List,
  Card,
  Space,
  Spin,
  message,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { RcFile } from "antd/lib/upload";
import {
  LoaddingRender,
  formatCurrencyVND,
} from "../../../function_global/products";
import axios from "axios";

const { Option } = Select;

interface IProps {
  getAllCategory: () => any;
  getOneProduct: (id: Number) => any;
  updateProduct: (product: IProduct) => any;
}
interface IProps2 {
  product: IProduct | undefined;
  category: ICategory[] | undefined;
  onSubmit: (product: IProduct) => any;
  handleRemove: (file: any) => any;
}
// upload hình ảnh lên ...
const CLOUD_NAME = "minhduc";
const PRESET_NAME = "freeImage";
const FOLDER_NAME = "freeImage";
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const uploadImgs = async (file: RcFile | null) => {
  if (file) {
    const urls: string[] = [];
    const formData = new FormData();
    formData.append("upload_preset", PRESET_NAME);
    formData.append("folder", FOLDER_NAME);
    formData.append("file", file);
    try {
      const response = await axios.post(API_URL, formData, {
        headers: { "Content-Type": "application/form-data" },
      });
      urls.push(response.data.url);
    } catch (error) {
      console.error("Upload image failed.");
    }
    return urls;
  }
  return [];
};
//
let fileDetails: any;

const FormDataa = (props: IProps2) => {
  if (props.product !== undefined && props.category !== undefined) {
    const [form] = useForm<IProduct>();
    const handleSubmit = () => {
      const product = form.getFieldsValue();
      props.onSubmit(product);
      form.resetFields();
    };
    // Validate ảnh khi tải lên chỉ nhận hình ảnh
    const normFile = (e: any) => {
      if (Array.isArray(e)) {
        return e;
      }
      const fileList = e && e.fileList;
      if (fileList) {
        return fileList.every((file: any) => {
          return file.type.startsWith("image/");
        })
          ? fileList
          : null;
      }
      return e && e.fileList;
    };
    // ------
    const handleBeforeUpload = async (file: RcFile) => {
      // Gán lại giá trị fileDetail khai báo ban đầu
      fileDetails = file;
      // Return false chặn sự kiện tải file lên mặc định của antd
      return false;
    };

    const [price_v1, setPrice_v1] = useState<number>(props.product.price);
    return (
      <section>
        <h1 style={{ fontSize: "22px" }}>Cập nhật sản phẩm</h1>
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            initialValue={props.product.id}
            name="id"
            label="id"
            hidden
          >
            <Input type="Number" hidden disabled />
          </Form.Item>
          <Form.Item
            initialValue={props.product.name}
            name="name"
            label="Tên sản phẩm"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            initialValue={props.product.price}
            name="price"
            label="Giá"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Row>
              <Col md={10}>
                <Input
                  type="number"
                  defaultValue={0}
                  value={price_v1}
                  onChange={(event) => setPrice_v1(Number(event.target.value))}
                />
              </Col>
              <Col md={14}>
                <Button
                  style={{ margin: "0 2px" }}
                  onClick={() => {
                    setPrice_v1(200000);
                    form.setFieldsValue({ price: 200000 });
                  }}
                >
                  200.000
                </Button>
                <Button
                  style={{ margin: "0 2px" }}
                  onClick={() => {
                    setPrice_v1(300000);
                    form.setFieldsValue({ price: 300000 });
                  }}
                >
                  300.000
                </Button>
                <Button
                  style={{ margin: "0 2px" }}
                  onClick={() => {
                    setPrice_v1(600000);
                    form.setFieldsValue({ price: 600000 });
                  }}
                >
                  600.000
                </Button>
                <Button
                  style={{ margin: "0 2px" }}
                  onClick={() => {
                    setPrice_v1(1000000);
                    form.setFieldsValue({ price: 1000000 });
                  }}
                >
                  1.000.000
                </Button>
              </Col>
            </Row>
          </Form.Item>

          <Form.Item
            name="image"
            label="Tải lên ảnh sản phẩm"
            valuePropName="file"
            getValueFromEvent={normFile}
            extra="Chọn một hình ảnh đại diện cho sản phẩm"
          >
            <Row>
              <Col md={12}>
                <Upload
                  onRemove={props.handleRemove}
                  name="logo"
                  beforeUpload={handleBeforeUpload}
                  listType="picture"
                  accept="image/*"
                >
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload>
              </Col>
              <Col md={12}>
                <img
                  src={props.product.image}
                  alt="Lỗi tải hình ảnh"
                  width={"80px"}
                  height={"80px"}
                />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            initialValue={props.product.description}
            name="description"
            label="Mô tả"
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="categoryID"
            label="Danh mục"
            initialValue={Number(props.product.categoryID)}
            rules={[{ required: true, message: "Trường này là bắt buộc" }]}
          >
            <Select defaultValue={props.product.categoryID}>
              {props.category.map((categoryd) =>
                categoryd.id == props.product?.categoryID ? (
                  <Option key={categoryd.id} value={categoryd.id} selected>
                    {categoryd.name}
                  </Option>
                ) : (
                  <Option key={categoryd.id} value={categoryd.id}>
                    {categoryd.name}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </section>
    );
  }
  return <div>Loadding ...</div>;
};

const ProductUpdate = (props: IProps) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [productDefault, setProductDefault] = useState<IProduct | undefined>(
    undefined
  );
  const [category, setCategory] = useState<ICategory[] | undefined>(undefined);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await props.getOneProduct(Number(id));
        setProductDefault(data);
        const res = await props.getAllCategory();
        setCategory(res.data);
      } catch (error) {}
    })();
  }, []);
  if (typeof productDefault !== "object") {
    LoaddingRender(true);
  } else {
    LoaddingRender(false);
  }
  const handleRemove = (file: any) => {
    // console.log("Removing file:", file);
    fileDetails = null;
  };
  const handleUpdateProduct = async (product: IProduct) => {
    LoaddingRender(true);
    try {
      const res = await uploadImgs(fileDetails);

      if (res.length !== 0) {
        product.image = await res[0];
      } else {
        if (product !== undefined && productDefault !== undefined) {
          product.image = productDefault.image;
        }
      }
      await props.updateProduct(product);
      LoaddingRender(false);
      await message.success("Cập nhật sản phẩm thành công");
      navigate("/admin/products");
      // location.reload();
    } catch (error) {}
  };

  return (
    <div style={{ position: "relative" }}>
      <div id="LoaddingRender">
        <Space
          direction="vertical"
          id="space"
          style={{
            transition: "all .35s",
            position: "absolute",
            borderRadius: "2px",
            background: "rgb(0 0 0 / 10%)",
            zIndex: -1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "75vh",
            backdropFilter: "blur(2px)",
          }}
        >
          <Spin tip="Loading..." />
        </Space>
      </div>
      <FormDataa
        product={productDefault}
        category={category}
        onSubmit={handleUpdateProduct}
        handleRemove={handleRemove}
      />
    </div>
  );
};

export default ProductUpdate;
