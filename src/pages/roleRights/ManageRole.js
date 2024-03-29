import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getRoleList, deleteRoleById, searchRole } from "../../services/RoleService.js";
import AddEditRole from './AddEditRole.js'
import Bootbox from 'bootbox-react';
import { Notification } from "../../layouts/Notification.js";
import { useLoading } from '../../LoadingContext.js';
import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export default function ManageRole() {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentRoleId, setCurrentRoleId] = useState(null);
  const [roleRightsList, setRoleRightsList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);
  const [showConfirmStatus, setShowConfirmStatus] = useState(false);
  const bootboxCloseStatus = () => setShowConfirmStatus(false);
  const [roleId, setRoleRightId] = useState(null);
  const [roleName, setRoleName] = useState("");
  const { setLoading } = useLoading();
  const [status, setStatus] = useState({ label: "All", value: "-1" });

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) {
      navigate('/');
    }
    getRoleRightList();
  }, []);

  const roleView = (roleId, roleName) => {
    navigate('../../AddEditRoleRights', { state: { id: roleId, roleName: roleName } });
  }

  const handleSearch = (e) => {
    e.preventDefault();
    searchRoleList();
  };

  async function handleReset(e) {
    e.preventDefault();
    setRoleName("");
    setStatus({ label: "All", value: "-1" });
    await getRoleList("", -1).then(res => { setRoleRightsList(res) });

  }

  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteRoleById(currentRoleId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Role deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentRoleId(null);
      setLoading(false);
    }
    getRoleRightList();
  }



  async function getRoleRightList() {
    setLoading(true);
    try {
      await getRoleList().then(res => {
        setRoleRightsList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  async function searchRoleList() {
    setLoading(true);
    try {
      await searchRole(roleName).then(res => {
        setRoleRightsList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }
  
  function onDataSave(isSubmitted, message) {
    handleClose();
    if (isSubmitted && message.toUpperCase() == 'SUCCESS') {
      Notification('Role saved successfully!', 'SUCCESS')
      getRoleRightList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "roleId",
      text: "roleId ",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "roleName",
      text: "Role Name",
      sort: true,
      style: {
        width: '90%',
        textAlign: 'left'
      }
    },
    {
      dataField: 'Action',
      text: 'Action',
      style: {
        padding: '3px',
        margin: '0px',
        width: '10%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={roleRightsList.value} style={{ display: 'inline-flex' }} >
            <button title="Edit" type="button" onClick={() => { setCurrentRoleId(columns.roleId); roleView(columns.roleId, columns.roleName) }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentRoleId(columns.roleId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
            {/* <button title='check' type="button" onClick={() => { setRoleRightId(columns.roleId); setStatus(columns.status == 0 ? 1 : 0); setShowConfirmStatus(true) }} className="icone-button"><i className="icon-checkmark dark-grey"></i></button> */}
          </a>
        </div>
      )
    }
  ]

  return (
    <>
      {show && <AddEditRole onDataSave={onDataSave} roleId={currentRoleId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Manage Role </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                {/* <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentRoleId(0); roleView(columns.roleId) }} >+ Add Role</Button></Navbar.Brand> */}
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentRoleId(0); handleShow() }} >+ Add Role </Button></Navbar.Brand>
              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col xs={3} className='display-inline pl-0' >
                  <Form.Label className='display-inline search-label'>Role Name</Form.Label>
                  <Form.Control type="text" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
                </Col>
                <Col xs={8} className='display-inline pl-2'>
                  <Button type="submit" className='btn btn-primary mr-5' onClick={(event) => handleSearch(event)} >Search</Button>
                  <Button onClick={(event) => handleReset(event)} className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'roleRightsId'}
              id='tbl_roleRight'
              data={roleRightsList}
              columns={columns}
              striped
              hover
              condensed
              noDataIndication="No records found"
              pagination={paginationFactory({
                sizePerPageList: [10, 20, 30, 50]
              })}
            />
          </div>
        </ListGroup.Item>
      </ListGroup>

      <Bootbox show={showConfirm}
        type={"confirm"}
        message={"Are you sure you want to delete this Role?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />

    </>
  )
}



