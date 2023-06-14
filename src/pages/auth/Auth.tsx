import React, { useState } from "react";
import HeaderPage from "../../components/header/Header";
import CustomFooter from "../../components/footer/Footer";
import SigninPage from "./Signin";
import SignupPage from "./Signup";
const Signin = () => {
  const [switchForm, setSwitchForm] = useState<Boolean>(true);
  const onChange = (key: boolean) => {
    setSwitchForm(key);
  };
  return (
    <section>
      <HeaderPage />
      <section style={{ paddingTop: "100px" }}>
        <div>
          <div
            style={{
              minWidth: "100%",
              height: "1px",
              backgroundColor: "rgb(102 102 102 / 16%)",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                maxWidth: "400px",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: "-40px",
                  zIndex: 1000,
                }}
              >
                <button
                  style={{
                    width: "50%",
                    backgroundColor: "#fff0",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 0",
                  }}
                  onClick={() => onChange(!switchForm)}
                >
                  Đăng nhập
                </button>
                <button
                  style={{
                    width: "50%",
                    backgroundColor: "#fff0",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px 0",
                  }}
                  onClick={() => onChange(!switchForm)}
                >
                  Đăng ký
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {switchForm ? <SigninPage /> : <SignupPage />}
      <CustomFooter />
    </section>
  );
};

export default Signin;
