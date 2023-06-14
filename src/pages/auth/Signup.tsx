import { Form, Input, Button, Checkbox } from "antd";

const signup = () => {
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };
  return (
    <section>
      <div style={{ minWidth: "100%", height: "3px", position: "relative" }}>
        <div
          style={{
            width: "100%",
            height: "2px",
            position: "absolute",
            top: "calc(50% - 4px)",
            left: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
            zIndex: "20000",
          }}
        >
          <div
            style={{
              float: "right",
              width: "50%",
              height: "3px",
              backgroundColor: "black",
            }}
          ></div>
        </div>
      </div>
      <main
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "0 auto",
          padding: "50px 0 60px 0",
          height: "73vh",
        }}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ width: "100%" }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="name"
            rules={[{ required: true, message: "Tên không được bỏ trống!" }]}
          >
            <Input
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Họ tên"
            />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="email"
            style={{ width: "100%" }}
            rules={[
              { required: true, message: "Email không được bỏ trống!" },
              {
                type: "email",
                message: "Email không hợp lệ!",
              },
            ]}
          >
            <Input
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Email"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="password"
            rules={[
              { required: true, message: "Mật khẩu không được bỏ trống!" },
              {
                min: 6,
                message: "Mật khẩu phải có ít nhất 6 ký tự!",
              },
              {
                validator: (_, value) => {
                  if (value && value.includes(" ")) {
                    return Promise.reject(
                      "Mật khẩu không được chứa khoảng trắng!"
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Mật khẩu"
            />
          </Form.Item>

          <Form.Item
            labelCol={{ span: 0 }}
            wrapperCol={{ span: 24 }}
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              { required: true, message: "Vui lòng nhập lại mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không khớp!");
                },
              }),
            ]}
          >
            <Input.Password
              bordered={false}
              style={{
                borderBottom: "1px solid black",
                borderRadius: "0",
              }}
              placeholder="Xác nhận mật khẩu"
            />
          </Form.Item>
          <Form.Item
            style={{ marginTop: "-20px", marginBottom: "30px", padding: 0 }}
            name="termsOfUse"
            valuePropName="checked"
            wrapperCol={{ offset: 0, span: 24 }}
            rules={[
              { required: true, message: "Điều khoản không được bỏ trống !!!" },
            ]}
          >
            <Checkbox>Chấp nhận tất cả điều khoản bên chúng tôi</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
            <Button
              type="primary"
              style={{
                borderRadius: 0,
                width: "100%",
                backgroundColor: "black",
                height: "45px",
                fontSize: "14px",
                fontWeight: "600",
              }}
              htmlType="submit"
            >
              Tạo tài khoản
            </Button>
          </Form.Item>
        </Form>
      </main>
    </section>
  );
};

export default signup;
