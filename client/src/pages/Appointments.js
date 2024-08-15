
import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Table } from 'antd'

const Appointments = () => {

    const [appointments, setAppointments] = useState([]);

    const getAppointments = async () => {
      try {
        const res = await axios.get("/api/v1/user/user-appointments", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (res.data.success) {
          setAppointments(res.data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAppointments();
    }, []);
  
    const columns = [
      {
        title: "ID",
        dataIndex: "_id",
      },
     
      {
        title: "Status",
        dataIndex: "status",
      },
    ];


return (
    <Layout>
      <div className='Appointments'>
     <h1>Appoinmtnets Lists</h1>
     <Table columns={columns} dataSource={appointments} />
     </div>
    </Layout>
    
  )
}

export default Appointments