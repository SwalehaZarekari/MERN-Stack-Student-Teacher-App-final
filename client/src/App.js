import React from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {Login} from './pages/Login';
import  {Register}  from './pages/Register'
import './App.css';
import HomePage, { Home } from './pages/Home';
import { useSelector } from 'react-redux';
import Spinner from './components/Spinner';
import PublicRoute from './components/PublicRoute';
import ProtectedRoute from './components/ProtectedRoute';
/*import ApplyTeacher from './pages/ApplyTeacher';*/
import ApplyDoctor from './pages/ApplyDoctor';
import NotificationPage from './pages/NotificationPage';
import Users from './pages/admin/Users';
import Teachers from './pages/admin/Teachers';
import Profile from './pages/teacher/Profile';
import Appointments from './pages/Appointments';
import TeacherAppointments from './pages/teacher/TeacherAppointments';
function App() {
  const {loading}=useSelector((state)=>state.alerts)
  return (
    <div>
   <BrowserRouter>
   {loading ? (<Spinner/>):(
    <Routes>
    <Route path="/" 
    element={
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    }/>

    <Route path="/apply-teacher"
    element={
      <ProtectedRoute>
      <ApplyDoctor/>
      </ProtectedRoute>
    }/>


    <Route path="/admin/users"
    element={
     <ProtectedRoute>
       <Users/>
      </ProtectedRoute>
      }/>

      <Route path="/admin/teachers"
      element={
      <ProtectedRoute>
       <Teachers/>
      </ProtectedRoute>
              }
            />
     <Route path="/teacher/profile/:id"
      element={
        <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
              }/>



              


            
  <Route path="/notification"
    element={
      <ProtectedRoute>
        <NotificationPage />
        </ProtectedRoute>
    }/>
    
    <Route path="/login"
     element={
      <PublicRoute>
        <Login/>
        </PublicRoute>
      }/>
    <Route path='/register' 
    element={
    <PublicRoute>
      <Register/>
      </PublicRoute>
    }/>



    <Route path="/appointments"
     element={
      <ProtectedRoute>
      <Appointments/>
      </ProtectedRoute>
      }/>


      
    <Route path="/teacher-appointments"
     element={
      <ProtectedRoute>
      <TeacherAppointments/>
      </ProtectedRoute>
      }/>






</Routes>)
}
  
 
  </BrowserRouter>











</div>

  );
}

export default App;
