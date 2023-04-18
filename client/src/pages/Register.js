import React from 'react'
import { Form, Input,message } from "antd";
import '../style/RegisterStyle.css'
import { Link , useNavigate} from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { showLoading,hideLoading } from '../redux/features/alertSlice'
import Image from "../img/img.jpg";

const Register = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading())
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading())
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
    return (
      <>
        

<div className="body">
      <div className="container">
        <div className="login-left">
          <div className="login-header">
            <h1>Welcome to Our Application</h1>
          </div>
          <Form className="login-form" onFinish={onfinishHandler}>
            <div className="login-form-content">
            <div className="form-itema">
              <h6>Name</h6>
                <Form.Item label="" name="name">
                  <Input type="name" id="name" required />
                </Form.Item>
              </div>
              
              <div className="form-itema">
              <h6>Email</h6>
                <Form.Item label="" name="email">
                  <Input type="email" id="email" required />
                </Form.Item>
              </div>
              
              <div className="form-itema">
              <h6>password</h6>
                <Form.Item label="" name="password">
                  <Input type="password" id="password" required />
                </Form.Item>
              </div>
              <div className="form-itema">
                <div className="checkbox">
                  <Link to="/login" className="register">
                    Not a user Register here
                  </Link>
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="submit">
              Register
            </button>
          </Form>
        </div>
        <div className="login-right">
          <img src={Image} alt="" />
        </div>
      </div>
    </div>
    </>
  );
};
     

export default Register