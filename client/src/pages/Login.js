import React from "react";
import "../style/LoginStyle.css"
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../img/img.jpg";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    // <div className="form-container ">
    //   <Form
    //     layout="vertical"
    //     onFinish={onfinishHandler}
    //     className="register-form"
    //   >
    //     <h3 className="text-center">Login From</h3>

    //     <Form.Item label="Email" name="email">
    //       <Input type="email" required />
    //     </Form.Item>
    //     <Form.Item label="Password" name="password">
    //       <Input type="password" required />
    //     </Form.Item>
    //     <Link to="/register" className="m-2">
    //       Not a user Register here
    //     </Link>
    //     <button className="btn btn-primary" type="submit">
    //       Login
    //     </button>
    //   </Form>
    // </div>

    <div className="body">
      <div className="container">
        <div className="login-left">
          <div className="login-header">
            <h1>Welcome to Our Application</h1>
          </div>
          <Form className="login-form" onFinish={onfinishHandler}>
            <div className="login-form-content">
              <div className="form-itema">
                <h6>Email</h6>
                <Form.Item label="" name="email">
                  <Input type="email" id="email" required />
                </Form.Item>
              </div>
              <div className="form-itema">
                <h6>Password</h6>
                <Form.Item label="" name="password">
                  <Input type="password" id="password" required />
                </Form.Item>
              </div>
              <div className="form-itema">
                <div className="checkbox">
                  <Link to="/register" className="register">
                    Not a user Register here
                  </Link>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </Form>
        </div>
        <div className="login-right">
          <img src={Image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
