import React from "react";
import { Button, Form, Input, message } from 'antd';
import { Link ,useNavigate} from "react-router-dom";
import {useDispatch} from 'react-redux'
import { showLoading , hideLoading } from "../redux/features/alertSlice"
import axios from 'axios'

export const Register = () => {

    const nevigate=useNavigate();
    const dispatch=useDispatch()

    const onfinishHandler=async(values)=>{
        try{
            dispatch(showLoading())
           const res = await axios.post('/api/v1/user/register', values);
           dispatch(hideLoading())
            if(res.data.success){
                message.success("Register Successfully")
                nevigate('/login')
            }
            else{
                message.error(res.data.message)
            }
            
        }catch(error){
            dispatch(hideLoading())
            console.log(error)
            message.error("something ernt wrong")

        }

    };
    
    return (
        <div className="authentication">
            <div className="authentication-form card p-4">
                <h1 className="card-title">Welcome 🙏</h1>
                <Form layout='vertical' onFinish={onfinishHandler}>
                    <Form.Item label="Name" name='name'>
                        <Input placeholder="name" />
                    </Form.Item>
                    <Form.Item label="Email" name='email'>
                        <Input placeholder="email" />
                    </Form.Item>
                    <Form.Item label="Password" name='password'>
                        <Input placeholder="password" type="password" />
                    </Form.Item>
                    <Button className='primary-button' htmlType="submit">REGISTER</Button>
                    <div className="anchor-part">
                        <p>Already have an account?</p>
                        <Link to='/login' className="anchor"> Click here to login</Link>
                    </div>
                </Form>
            </div>
        </div>
    );
};
