import '../assets/styles/App.css';
import Header from './Header';
import Footer from './Footer';
import SideBar from "../components/SideBar.js";
import React from 'react';

import { useNavigate, Route, Routes } from 'react-router-dom';

// import PrivateRoute from '../routes/PrivateRoute';
import { Navigate } from 'react-router-dom';

import Login from './Login';
import axios from "axios";
import Dashboard from '../pages/Dashboard';
import Messages from "../pages/Messages";
import FileManager from "../pages/FileManager";
import FuelType from "../pages/fuelType/FuelType";
import Employee from '../pages/employee/Employee';
import Order from "../pages/Order";
import Saved from "../pages/Saved";
import Setting from "../pages/Setting";
import Forgot from '../layouts/Forgot';

import {Col, Row } from 'react-bootstrap';
import { useLoading } from "../LoadingContext";
import Loader from '../components/Loader';

export default function Layout() {
  const { loading } = useLoading();
  return (
    <>
      {loading && <Loader />}
      <Header /> 
       <Row> 
         <Col xs={12}> 
         
             <SideBar> 
              <Routes>
            <Route path="/" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/employee" element={<Employee />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/FuelType" element={<FuelType />} />
                <Route path="/file-manager" element={<FileManager />} />
                <Route path="/order" element={<Order />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/settings" element={<Setting />} />
                <Route path="/forgot" element={<Forgot />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </SideBar> 
           
        </Col> 
       </Row> 
       <Footer /> 
    </>
  );
}


