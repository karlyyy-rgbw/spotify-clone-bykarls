import { assets } from '../assets/assets';  
import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import axios from 'axios';  
import { API_ENDPOINT } from './Api.jsx';  
import { Form, Button } from 'react-bootstrap';  

const FormContainer = () => {  
  const navigate = useNavigate();  
  const [email, setEmail] = useState('');  
  const [password, setPassword] = useState('');  
  const [error, setError] = useState('');  

  // Verify if User Is In Session in LocalStorage  
  useEffect(() => {  
    const fetchUser = async () => {  
      const token = localStorage.getItem('token');  
      if (token) {  
        try {  
          const response = JSON.parse(token); // Assuming your token has a .data property  
          if (response && response.data) {  
            navigate('/dashboard');  // Navigate to dashboard if token is valid  
          } else {  
            // Invalid token, do nothing (stay on login)  
          }  
        } catch (error) {  
          // If parsing fails or token is invalid  
          console.error("Error fetching user from local storage:", error);  
        }  
      }  
    };  

    fetchUser();  
  }, [navigate]);  // Depend on navigate to avoid warnings and re-renders  

  // Handle Form Submission  
  const handleSubmit = async (e) => {  
    e.preventDefault();  

    try {  
      const response = await axios.post(`${API_ENDPOINT}/auth/login`, { email, password });  
      localStorage.setItem("token", JSON.stringify(response)); // Save response token  
      setError('');  // Clear any previous error messages  
      navigate('/dashboard');  // Redirect to dashboard after successful login  
    } catch (error) {  
      setError('Invalid email or password');  // Display error on failed login  
    }  
  };  

  return (  
    <div className='bg-gradient-to-b from-customDark1 to-customDark2 h-screen w-[100%]'>  
      <div className='flex justify-center h-full '>  
    <div className='bg-gradient-to-t from-customDark1 to-customDark2 lg:w-[40%] rounded-md mt-9 p-6'>  
      <div className='flex flex-col items-center w-full'>  
        <img className='w-10 h-10 bg-white rounded-full border-none' src={assets.spotify_logo} alt="Spotify Logo" />  
        <h1 className='mt-3 text-white text-4xl font-medium text-center'>Login to Spotify</h1>  

        <div className='mt-6 flex flex-col items-center'>  
          <button className='flex px-10 flex-row w-fit border-2 border-gray-600 text-white py-3 rounded-3xl font-semibold mb-2 hover:border-white items-center gap-5'>  
            <img className='w-6' src={assets.google} alt="Google"/>   
            Continue with Google  
          </button>  
          <button className='flex flex-row w-fit border-2 border-gray-600 text-white py-3 px-10 rounded-3xl font-semibold mb-2 hover:border-white items-center gap-5'>  
            <img className='w-6' src={assets.facebook} alt="Facebook"/>   
            Continue with Facebook  
          </button>  
          <button className='flex flex-row w-fit border-2 border-gray-600 text-white py-3 px-10 rounded-3xl font-semibold mb-5 hover:border-white items-center gap-5'>  
            <img className='w-6' src={assets.tweet} alt="Twitter"/>   
            Continue with Twitter  
          </button>  
        </div>  

        <hr className='opacity-20 my-3' style={{ border: '1px solid gray', width: '70%' }} />  

        <Form onSubmit={handleSubmit}>  
          <Form.Group controlId="formEmail">  
            <Form.Label className='text-white mb-3 '> Username: </Form.Label>  
            <Form.Control className="w-full p-2 mb-2 rounded-md"  
              type="username"  // Changed to email for better validation  
              placeholder="Enter Email"  
              value={email}  
              onChange={(e) => setEmail(e.target.value)} required />  
          </Form.Group>  

          <Form.Group controlId="formPassword">  
            <Form.Label className='text-white mb-3'> Password: </Form.Label>  
            <Form.Control className='w-full p-2 mb-2 rounded-md'  
              type="password"  
              placeholder="Enter Password"  
              value={password}  
              onChange={(e) => setPassword(e.target.value)} required />  
          </Form.Group>  

          <Form.Group controlId="formButton">  
            {error && <p style={{ color: 'red' }}>{error}</p>}  
            <Button variant="success" className='w-full bg-green-600 text-white p-2 rounded-md' size="sm" type="submit">Login</Button>   
          </Form.Group>  
        </Form>   

        <p className='mt-2 text-center text-white'>  
          Forgot your password?  
        </p>  
      </div>  
    </div> 
    </div>
    </div> 
  );  
};  

export default FormContainer;