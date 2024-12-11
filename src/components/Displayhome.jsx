import Navbar from './Navbar'
import { albumsData } from '../assets/assets'
import AlbumItem from './AlbumItem'
import { songsData } from '../assets/assets'
import SongItem from './SongItem'
import { useState, useEffect } from 'react';  
import axios from 'axios';  
import { API_ENDPOINT } from './Api.jsx';
import Swal from 'sweetalert2'; 
import { assets } from '../assets/assets'
import React from 'react'
import { Form } from 'react-bootstrap'
import { Row, Col} from 'react-bootstrap'
import { Button } from 'react-bootstrap'; // Correct import  


import { Modal } from 'react-bootstrap'
import ModalBody from 'react-bootstrap/ModalBody';    
import ModalFooter from 'react-bootstrap/ModalFooter';  
const Displayhome = () => {  
/* 1. DISPLAY USERS */  
const [users, setUsers] = useState([]);  
const userdata = JSON.parse(localStorage.getItem('token'));  
const token = userdata.data.token;  

const headers = {  
    accept: 'application/json',  
    Authorization: token  
};  

useEffect(() => {  
    fetchUsers();  
}, []);  

const fetchUsers = async () => {  
    await axios.get(`${API_ENDPOINT}/user`, { headers: headers })  
        .then(({ data }) => {  
            setUsers(data) 
        })
}
const deleteUser = async (id) => {  
  const isConfirm = await Swal.fire({  
    title: 'Are you sure?',  
    text: "You won't be able to revert this!",  
    icon: 'warning',  
    showCancelButton: true,  
    confirmButtonColor: '#3085d6',  
    cancelButtonColor: '#d33',  
    confirmButtonText: 'Yes, delete it!'  
  }).then((result) => {  
    return result.isConfirmed;  
  });  

  if (!isConfirm) {  
    return;  
  }  

  await axios.delete(`${API_ENDPOINT}/user/${id}`, { headers: headers })  
    .then(({ data }) => {  
      Swal.fire({  
        icon: 'success',  
        text: 'Successfully Deleted'  
      });  
      fetchUsers();  
    })
    .catch(({ response: { data } }) => {  
      Swal.fire({  
        text: data.message,  
        icon: 'error'  
      });
    });
}
const [show, setShow] = useState(false);  
const handleClose = () => setShow(false);  
const handleShow = () => setShow(true);  

const [fullname, setFullname] = useState("");  
const [email, setEmail] = useState("");  
const [password, setPassword] = useState("");  
const [validationError, setValidationError] = useState({});  

const createUser = async (e) => {  
    e.preventDefault();  

    const formData = new FormData();  
    formData.append('fullname', fullname);  
    formData.append('email', email);  
    formData.append('password', password);  

    await axios.post(`${API_ENDPOINT}/user/`, { fullname, email, password }, { headers: headers })  
        .then((data) => {  
            Swal.fire({  
                icon: 'success',  
                text: data.message  
            })

    fetchUsers();  
}).catch((error) => {  
  if (error.response) { // Check if response exists  
      if (error.response.status === 422) {  
          setValidationError(error.response.data.errors);  
      } else {  
          Swal.fire({  
              text: error.response.data.message || "Already Had that Email!", // Fallback message  
              icon: 'error'  
          });  
      }  
  } else {  
      Swal.fire({  
          text: "An unexpected error occurred.",  
          icon: 'error'  
      });  
  }  
});  
}
/* 4. READ USER */  
const [selectedUser, setSelectedUser] = useState(null);  
const [show1, setShow1] = useState(false);  

const handleClose1 = () => setShow1(false);  

const handleShow1 = (row_users) => {  
    setSelectedUser(row_users);  
    setShow1(true);  
};  

// console.log(row_users);
const [updateShow, setUpdateShow] = useState(false);  


const handleUpdateClose = () => {  
    setUpdateShow(false);  
    resetForm(); // Reset form when closing  
};  

const handleUpdateShow = (user) => {  
    setSelectedUser(user);  
    setFullname(user.fullname); // Pre-fill form  
    setEmail(user.email);  
    setPassword(''); // Optionally reset password field  
    setUpdateShow(true);  
};  

const updateUser = async (e) => {  
    e.preventDefault();  

    await axios.put(`${API_ENDPOINT}/user/${selectedUser.user_id}`, { fullname, email, password }, { headers: headers })  
        .then((response) => {  
            Swal.fire({  
                icon: 'success',  
                text: response.data.message  
            });  
            fetchUsers(); // Refresh user list  
            handleUpdateClose(); // Close modal after update  
        })  
        .catch((error) => {  
            if (error.response) {  
                if (error.response.status === 422) {  
                    setValidationError(error.response.data.errors);  
                } else {  
                  Swal.fire({  
                    icon: 'success',  
                    text: response.data.message 
                    });  
                }  
            } else {  
              Swal.fire({  
                icon: 'success',  
                text: response.data.message 
                });  
            }  
        });  
};  
  return (
    <>
    <Navbar/>  
    <div className='mb-4'> 
      <h1>Featured Charts</h1>
      <div className='flex overflow-auto'>
      {albumsData.map((item,index)=>(<AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
      </div>
    </div>
    <div className='mb-4'> 
      <h1>Today's Biggest Hits</h1>
      <div className='flex overflow-auto'>
      {songsData.map((item,index)=>(<SongItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image}/>))}
      </div>
    </div>
    <div className='mb-4'>  
  <h1>Who's Listening Spotify?</h1>  
  <div className='flex overflow-auto text-center'>  
    {users.length > 0 && users.map((row_users, key) => (  
      <div   
        key={row_users.user_id}   
        className='min-w-[180px] p-2 px-3 rounded cursor-pointer  hover:bg-[#ffffff26] flex flex-col items-center'  
      >  
        <div className='flex flex-col items-center justify-center'>
        <div className='bg-gradient-to-b from-mintGreen to-slate-100 text-black w-40 h-40 rounded-full flex items-center justify-center'>
          <p className='font-medium'>
          {row_users.fullname.charAt(0)}
          </p>
        </div>
        <p className='text-slate-200 text-sm font-bold my-2'>{row_users.fullname}</p>  

          {/* <div variant='secondary' size='sm' onClick={() => handleShow(row_users)}>Read</Button>  
          <Button variant='success' size='sm' onClick={() => handleShow(row_users)}>Update</Button>  
          <Button variant='danger' size='sm' onClick={() => deleteUser(row_users.user_id)}>Delete</Button>   */}
        </div>  
        <div className='inline'>  
        <button className='px-4 py-1.5 bg-slate-400 text-[15px] text-black rounded-full mx-1 hover:bg-slate-600' onClick={() => handleShow1(row_users)}>Read</button>
        <button className='px-4 py-1.5 bg-yellow-300 text-[15px] text-black rounded-full mt-1 mr-1 hover:bg-yellow-400'  onClick={() => handleUpdateShow(row_users)}>Update</button>
        <button className='px-4 py-1.5 bg-red-500 text-[15px] text-black rounded-full mt-1 hover:bg-red-600' onClick={() => deleteUser(row_users.user_id)}>Delete</button>
        </div>
      </div>  
    ))}  
    <div className='min-w-[180px] p-2 px-3 rounded cursor-pointer my-2 flex justify-center items-center'>  
    <img className='rounded-full  hover:brightness-110 size-20' src={assets.pluss} onClick={handleShow}/>
      </div>  
  

  </div>
</div>
<Modal className=' text-white fixed mt-70 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' show={show} onHide={handleClose}>  
    <Modal.Header className='bg-green-950'>  
        <Modal.Title className='fit flex justify-center mt-3'>Create User</Modal.Title>  
    </Modal.Header>  

    <Modal.Body className='flex justify-center items-center'>  
        <Form onSubmit={createUser}>  
            <Row>  
                <Col className='my-2'>  
                    <Form.Group  controlId="Name">  
                        <Form.Label className='mr-2'>Fullname</Form.Label>  
                        <Form.Control  className='text-black'
                            type="text"  
                            value={fullname}  
                            onChange={(event) => setFullname(event.target.value)}  
                            required  
                        />  
                    </Form.Group>  
                </Col>  
            </Row>  
            <Row>  
                <Col className='my-2'>  
                    <Form.Group controlId="Email">  
                        <Form.Label className='mr-2'>Email</Form.Label>  
                        <Form.Control  
                            className='text-black'
                            type="text"  
                            value={email}  
                            onChange={(event) => setEmail(event.target.value)}  
                            required  
                        />  
                    </Form.Group>  
                </Col>  
            </Row>  
            <Row>  
                <Col>  
                    <Form.Group controlId="Password">  
                        <Form.Label className='mr-2'>Password</Form.Label>  
                        <Form.Control  className='text-black'
                            type="password"  
                            value={password}  
                            onChange={(event) => setPassword(event.target.value)}  
                            required  
                        />  
                    </Form.Group>  
                </Col>  
            </Row>  
            <Button variant="primary" className="mt-2 bg-green-950  hover:bg-green-700" size="sm" type="submit">  
                Save  
            </Button>  
           
        </Form>  
    </Modal.Body>  
    <Modal.Footer className='flex justify-center items-center'>  
    <Button className='bg-gray-900 px-2  hover:bg-slate-600' variant="secondary" onClick={handleClose}>  
      Close  
    </Button>  
  </Modal.Footer>  
</Modal>
<Modal className='text-white fixed mt-70 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' show={show1} onHide={handleClose1}>  
  <Modal.Header className='bg-green-950 mt-2 flex justify-center items-center' closeButton>  
    <Modal.Title className=''>Row Details</Modal.Title>  
  </Modal.Header>  

  <Modal.Body className='py-2 flex justify-center items-center'>  
    {selectedUser ? (  
      <div className=''>  
        <p><strong>ID:</strong> {selectedUser.user_id}</p>  
        <p><strong>Fullname:</strong> {selectedUser.fullname}</p>  
        <p><strong>Email:</strong> {selectedUser.email}</p>  
      </div>  
    ) : (  
      <p>No data available</p>  
    )}  
  </Modal.Body>  

  <Modal.Footer className='flex justify-center items-center'>  
    <Button className='bg-gray-900 px-2 hover:bg-slate-600' variant="secondary" onClick={handleClose1}>  
      Close  
    </Button>  
  </Modal.Footer>  
  
</Modal>
<Modal className='text-white fixed mt-70 inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50' show={updateShow} onHide={handleUpdateClose}>  
    <Modal.Header className='bg-green-950'>  
        <Modal.Title className='fit flex justify-center mt-3'>Update User</Modal.Title>  
    </Modal.Header>  

    <Modal.Body className='flex justify-center items-center'>  
        <Form onSubmit={updateUser}>  
            <Row>  
                <Col className='my-2'>  
                    <Form.Group controlId={`UpdateName-${selectedUser ? selectedUser.user_id : ''}`}>  
                        <Form.Label className='mr-2'>Fullname</Form.Label>  
                        <Form.Control  
                            className='text-black'  
                            type="text"  
                            value={fullname}  
                            onChange={(event) => setFullname(event.target.value)}  
                            required  
                        />  
                    </Form.Group>  
                </Col>  
            </Row>  
            <Row>  
                <Col className='my-2'>  
                    <Form.Group controlId={`UpdateEmail-${selectedUser ? selectedUser.user_id : ''}`}>  
                        <Form.Label className='mr-2'>Email</Form.Label>  
                        <Form.Control  
                            className='text-black'  
                            type="username"  // Corrected type from "username" to "email"  
                            value={email}  
                            onChange={(event) => setEmail(event.target.value)}  
                            required  
                        />  
                    </Form.Group>  
                </Col>  
            </Row>  
            <Row>  
                <Col>  
                    <Form.Group controlId={`UpdatePassword-${selectedUser ? selectedUser.user_id : ''}`}>  
                        <Form.Label className='mr-2'>Password</Form.Label>  
                        <Form.Control  
                            className='text-black'  
                            type="password"  
                            value={password}  
                            onChange={(event) => setPassword(event.target.value)}  
                        />  
                    </Form.Group>  
                </Col>  
            </Row>  
            <Button variant="primary" className="mt-2 bg-green-950  hover:bg-green-700" size="sm" type="submit">  
                Update  
            </Button>  
        </Form>  
    </Modal.Body>  
    <Modal.Footer className='flex justify-center items-center'>  
        <Button className='bg-gray-900 px-2  hover:bg-slate-600' variant="secondary" onClick={handleUpdateClose}>  
            Close  
        </Button>  
    </Modal.Footer>  
</Modal>  
    </>
  )
}

export default Displayhome