import '../../assets/styles/App.css';
import 'react-toastify/dist/ReactToastify.css';
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState, useEffect } from "react";
import { Nav, Navbar, Button, Form, Col, Row, Card } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { BsFileEarmarkText } from "react-icons/bs";
import { getEmployeesList, deleteEmployee ,bindDesignation} from "../../services/EmployeeServices.js";
import AddEditEmployee from './AddEditEmployee.js'
import Bootbox from 'bootbox-react';
import Select from 'react-select';
import { Notification } from "../../components/Notification.js";
import { useLoading } from '../../LoadingContext.js';

export default function Employee() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [currentemployeeId, setCurrentemployeeId] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const bootboxClose = () => setShowConfirm(false);

  const [employeeName, setEmployeeName] = useState("");
  const [designation, setDesignation] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [designationList, setDesignationList] = useState([]);
  const [designationName, setDesignationName] = useState("");


  const [email, setEmail] = useState("");
  const { setLoading } = useLoading();
  const [status, setStatus] = useState({label: "All", value: "0" });
 
  const statusData = [
    {label: "All", value: "0"},
    { label: "Active", value: "1" },
    { label: "In-Active", value: "2" }

  ];

  function StatusHandler(e) {
    setStatus(e);
  }

  async function bindDesignationList() {
    setLoading(true);
    try {
      await bindDesignation().then(res => {
        debugger;
        setDesignationList(res)
      });
    }
    catch (error) {
    }
    finally {
      setLoading(false);
    }
  }

  function designationHandler(e) {
    let item = e.value;

    setDesignationId(item);
    setDesignationName(designationList?.find(x => x.value === item))   
  }



  async function handleConfirm() {
    let message = '';
    setShowConfirm(false);
    setLoading(true);
    try {
      await deleteEmployee(currentemployeeId).then(res => { message = res });
    }
    catch (error) {
      message = error.message;
    }
    finally {
      if (message == 'SUCCESS') {
        Notification('Employee deleted successfully!', 'success')
      } else {
        Notification(message, 'ERROR')
      }
      setCurrentemployeeId(null);
      setLoading(false);
    }

    getEmployeeDataList();

  }

  const handleSearch = (e) => {
    e.preventDefault();
    getEmployeeDataList();
  };

  useEffect(() => {
    getEmployeeDataList();
  }, [])

  async function handleReset(e) {
    e.preventDefault();
    setEmployeeName("");
    setDesignationName("");   
    setStatus({label: "All", value: "0" });
    setEmail("");
    await getEmployeesList(employeeName, "", "", email).then(res => { setEmployeeList(res) });

  }

  async function getEmployeeDataList() {
    setLoading(true);
    try {
      await getEmployeesList(employeeName, designationId, status.value,email).then(res => {
        setEmployeeList(res)
      });
      await bindDesignationList();
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
      Notification('Employee saved successfully!', 'SUCCESS')
      getEmployeeDataList();
    }
    else {
      Notification(message, 'ERROR')
    }
  }

  const columns = [
    {
      dataField: "employeeId",
      text: "employeeId ",
      sort: true,
      hidden: true,
      style: {
        width: '82%',
        textAlign: 'left'
      }
    },
    {
      dataField: "employeeName",
      text: "Employee Name",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "dob",
      text: "Dob",
      sort: true,
      style: {
        width: '10%',
        textAlign: 'left'
      }
    },
    {
      dataField: "gender",
      text: "Gender",
      sort: true,
      style: {
        width: '5%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          {
            columns.status == 1 ? (<span style={{ borderRadius: "2px", border: "none" }}>Male</span>) :
              <span style={{ borderRadius: "2px", border: "none" }}>Female</span>
          }
        </div>
      )
    },
    {
      dataField: "phoneNumber",
      text: "Phone Number",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: "email",
      text: "Email",
      sort: true,
      style: {
        width: '8%'
      }
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
      style: {
        width: '7%'
      }
    },
    {
      dataField: "designation.designationName",
      text: "Designation",
      sort: true,
      style: {
        width: '6%'
      }
    },
    {
      dataField: "experience",
      text: "Experience",
      sort: true,
      style: {
        width: '8%'
      }
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      style: {
        width: '5%'
      },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          {
            columns.status == 1 ? (<span style={{ borderRadius: "3px", border: "none", backgroundColor:"green", color:"white", margin:"5px", padding:"5px" }} >Active</span>) :
              <span style={{ borderRadius: "3px", border: "none", backgroundColor:"red", color:"white", margin:"5px", padding:"5px"}}>In-Active</span>
          }
        </div>
      )
    },
    {
      dataField: "hiringDate",
      text: "Hiring Date",
      sort: true,
      style: {
        width: '5%'
      }
    },
    {
      dataField: "joiningDate",
      text: "Joining Date",
      sort: true,
      style: {
        width: '8%'
      }
    },
    {
      dataField: "terminationDate",
      text: "Termination Date",
      sort: true,
      style: {
        width: '10%'
      }
    },
    {
      dataField: 'Action',
      text: 'Action',
      style: {
        padding: '3px',
        margin: '0px',
        width: '8%',
        textAlign: 'center'
      },
      headerStyle: { textAlign: 'center' },
      formatter: (cell, columns, rowIndex, extraData) => (
        <div>
          <a href={employeeList.value} style={{ display: 'inline-flex' }} >
            <button title="Edit" type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); handleShow() }} size="sm" className="icone-button"><i className="icon-pencil3 dark-grey"></i></button>
            <button title='Delete' type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); setShowConfirm(true) }} className="icone-button"><i className="icon-trash dark-grey"></i></button>
            {/* <button title='check' type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); setShowConfirm(true) }} className="icone-button"><i className="icomoon icon-checkmark-2"></i></button>
            <button title='check' type="button" onClick={() => { setCurrentemployeeId(columns.employeeId); setShowConfirm(true) }} className="icone-button"><i className="icomoon icon-close"></i></button> */}

          </a>
        </div>
      )
    },
  ]



  return (
    <>
      {show && <AddEditEmployee onDataSave={onDataSave} employeeId={currentemployeeId} />}
      <ToastContainer />
      <ListGroup>
        <ListGroup.Item>
          <Navbar collapseOnSelect expand="sm" variant="dark" className='search-card'>
            <Navbar.Brand style={{ color: 'black' }}><BsFileEarmarkText /> Employee </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto"></Nav>
              <Nav>
                <Navbar.Brand ><Button className='btn' type='button' size="sm" onClick={() => { setCurrentemployeeId(0); handleShow() }} >+ Add Employee</Button></Navbar.Brand>

              </Nav>
            </Navbar.Collapse>
          </Navbar >
        </ListGroup.Item>
        <ListGroup.Item>
          <Card className="search-panel-card">
            <Form onSubmit={(event) => handleSearch(event)}>
              <Row className="main-class">
                <Col className='display-inline pl-0' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Employee Name</Form.Label>
                  <Form.Control type="text" value={employeeName} onChange={(e) => setEmployeeName(e.target.value)} />
                </Col>
{/* 
                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Designation</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={designation} onChange={(e) => setDesignation(e.target.value)} />
                </Col> */}

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '0px' }}>
                {/* <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1'>Designation</Form.Label>
                <Select  style={{width:"60px"}}
                  // value={designationName}
                  //  options={designation.map(({ label, value }) => ({ label: label, value: value }))}
                  // options={designationList.map(({ designationId, designationName }) => ({ label: designationName, value: designationId }))}
                 
                  // defaultValue={{ label: designationName}}
                  defaultMenuIsOpen={false}
                  id="designationId">
                </Select>
              </Form.Group> */}

              <Form.Group className='defaultWidth mb-3 col-md-6'>
                <Form.Label className='display-inline search-label mb-1'>Designation</Form.Label>
                <Select
                  value={designationName}
                  //  options={designation.map(({ label, value }) => ({ label: label, value: value }))}
                  options={designationList.map(({ designationId, designationName }) => ({ label: designationName, value: designationId }))}
                  onChange={designationHandler}
                  // defaultValue={{ label: designationName}}
                  defaultMenuIsOpen={false}
                  id="designationId">
                </Select>
              </Form.Group>
              </Col>

                <Col className='display-inline pl-2' style={{ width: '280px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Status</Form.Label>
                  <Form.Group className='defaultWidth' style={{width:"380px"}}>
                    <Select style={{width:"60px"}}
                      value={status}
                      options={statusData.map(({ label, value }) => ({ label: label, value: value }))}
                      onChange={StatusHandler}
                     defaultMenuIsOpen={false}
                      id="statusid">
                    </Select>
                  </Form.Group>
                </Col>


                {/* <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Status</Form.Label>
                  <Form.Control className='defaultWidth' type="text" value={status} onChange={(e) => setStatus(e.target.value)} />
                </Col> */}

                <Col className='display-inline pl-2' style={{ width: '30px', marginLeft: '0px' }}>
                  <Form.Label className='display-inline search-label'>Email</Form.Label>
                  <Form.Control className='defaultWidth' style={{ width: "250px" }} type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Col>

                <Col className='display-inline pl-0' style={{ width: '30px', marginLeft: '16px' }} >
                  <Button className='btn btn-primary mr-5' type="submit" onClick={(event) => handleSearch(event)}>Search</Button>
                  <Button onClick={(event) => handleReset(event)} type="submit" className='btn btn-dft'>Reset</Button>
                </Col>
              </Row>
            </Form>
          </Card>
          <div className='tablecard'>
            <BootstrapTable size="sm"
              keyField={'employeeId'}
              id='tbl_employee'
              data={employeeList}
              columns={columns}
              // cellEdit={ cellEditFactory({ mode: 'click',
              // blurToSave: true }) }
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
        message={"Are you sure you want to delete this employee?"}
        onSuccess={handleConfirm}
        onCancel={bootboxClose}
        onClose={bootboxClose}
      />

    </>
  )
}



