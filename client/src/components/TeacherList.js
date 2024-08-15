import React,{ useState, useEffect } from 'react'
import { notification,message } from 'antd';
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

import { useParams } from "react-router-dom";
// import { black } from 'colors';





const TeacherList = ({doctor}) => {

  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const dispatch = useDispatch();
  console.log('Doctor ID:', doctor._id)

  const handleBooking = async () => {
    try {
      dispatch(showLoading());
  
      // Prepare the data to send
      const doctorInfoStr = JSON.stringify({
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        specialization: doctor.specialization,
        experience: doctor.experience,
        feesPerConsaltation: String(doctor.feesPerCunsaltation),
      });
  
      const userInfoStr = JSON.stringify({
        name: user.name,
        email: user.email,
      });
  
      // Send booking request
      const res = await axios.post(
        '/api/v1/user/book-appointment',
        {
          doctorId: doctor._id,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      dispatch(hideLoading());
  
      // Check response and show message
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message || 'Failed to book appointment');
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error('Error booking appointment:', error.response?.data || error.message);
      message.error('Error booking appointment');
    }
  };
  

  return (
    
  <div className="card-doc m-3" 
    style={{ cursor: "pointer" }}
   /*onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}*/>
    <div className="card-headeraa">
      {doctor.firstName} {doctor.lastName}
    </div>
    <div className="card-body">
      <p>
        <b>Specialization : </b> {doctor.specialization}
      </p>
      <p>
        <b>Experience : </b> {doctor.experience}
      </p>
      <p>
  
      </p>
      <p>
        <b>Time : </b> {doctor.time}
      </p>
       <div className='send-Msg'><b>Write Message :</b><textarea className='boxaa' style={{height:100,width:280,marginTop:5,resize:'none',}}></textarea></div>
      
      <button className='btnbooknow' onClick={handleBooking}>Book Now</button>
    </div>
  </div>


  )
};


export default TeacherList;