import { Link, useNavigate} from "react-router-dom"
import {Button, Form,Input,message} from 'antd'
import {useDispatch} from 'react-redux'
import { showLoading , hideLoading } from "../redux/features/alertSlice"
import axios from 'axios'
import { setUser } from '../redux/features/userSlice';
import React from "react"


export const Login=()=>{

    const nevigate=useNavigate()
    const dispatch=useDispatch()

const onfinishHandler= async (values)=>{
    console.log(values)
    try{
        dispatch(showLoading())
        const res = await axios.post('/api/v1/user/login', values);
        window.location.reload();
        dispatch(hideLoading())
         if(res.data.success){
            localStorage.setItem('token',res.data.token);
            dispatch(setUser(res.data.user)); 
             message.success("Login Succesfully")
             nevigate('/')
         }
         else{
             message.error(res.data.message)
         }
         
     }catch(error){
        dispatch(hideLoading())
         console.log(error)
         message.error("something went wrong")

     }
    

}


    return(
        <div className="authentication">
            <div className="authentication-form card p-4">
                <h1 className="card-title">Welcome Back 🙏</h1>
                <Form layout='vertical' onFinish={onfinishHandler}>
                    <Form.Item label="Email" name='email'>
                        <Input placeholder="email" required/>
                    </Form.Item>
                    <Form.Item label="Password" name='password'>
                        <Input placeholder="password" type="password" required/>
                    </Form.Item>
                    <Button className='primary-button' htmlType="submit">Login</Button>
                  <div className="anchor-part"><p>Create an Account ?</p><Link to='/register' className="anchor"> Click here to Register</Link></div>
                </Form>
            </div>
        </div>
    )
}