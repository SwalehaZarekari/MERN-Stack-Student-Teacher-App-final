import Layout from "./../../components/Layout";
import React from 'react'
import {useSelector , useDispatch} from "react-redux"
import axios from "axios"
import {useState,useEffect} from "react"
import { useParams, useNavigate } from "react-router-dom";

import { Col, Form, Input, Row, message } from "antd"

import { showLoading, hideLoading } from "../../redux/features/alertSlice";

const Profile = () => {
    const { user } = useSelector((state) => state.user);

    const [teacher, setTeacher] = useState(null);
    const params = useParams();
    const dispatch = useDispatch();
  const navigate = useNavigate();


const handleFinish = async (values) => {
        try {
          dispatch(showLoading());
          const res = await axios.post(
            "/api/v1/teacher/updateProfile",
            {
              ...values,
              userId: user._id,
              
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch(hideLoading());
          if (res.data.success) {
            message.success(res.data.message);
            navigate("/");
          } else {
            message.error(res.data.success);
          }
        } catch (error) {
          dispatch(hideLoading());
          console.log(error);
          message.error("Somthing Went Wrrong ");
        }
      };


   const getTeacherInfo = async () => {
        try {
          const res = await axios.post(
            "/api/v1/teacher/getTeacherInfo",
            { userId: params.id },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (res.data.success) {
            setTeacher(res.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };


      useEffect(() => {
        getTeacherInfo();
        //eslint-disable-next-line
      }, []);

  return (

    <Layout>



    {teacher && (
        <Form layout="vertical" onFinish={handleFinish} className="m-3"initialValues={teacher}>
        <h4 className="per">Personal Details : </h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="First Name"
              name="firstName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your first name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Last Name"
              name="lastName"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your last name" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Phone No"
              name="phone"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your contact no" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Email"
              name="email"
              required
              rules={[{ required: true }]}
            >
              <Input type="email" placeholder="your email address" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item label="Website" name="website">
              <Input type="text" placeholder="your website" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
           
          </Col>
        </Row>
        <h4 className="prof">Professional Details :</h4>
        <Row gutter={20}>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Specialization"
              name="specialization"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your specialization" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Experience"
              name="experience"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="your experience" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}>
            <Form.Item
              label="Time"
              name="time"
              required
              rules={[{ required: true }]}
            >
              <Input type="text" placeholder="Time you want" />
            </Form.Item>
          </Col>
          <Col xs={24} md={24} lg={8}></Col>
          <Col xs={24} md={24} lg={8}>
            <button className="btn btn-primary form-btn" type="submit">
              Update
            </button>
          </Col>
        </Row>
      </Form>
      )}
   </Layout>
  )
}

export default Profile;