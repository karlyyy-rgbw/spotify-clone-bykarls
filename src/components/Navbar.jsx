import { React, useState, useEffect} from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode';
const Navbar = () => {  
  const [user, setUser] = useState(null);  
  const navigate = useNavigate();  
  const firstLetter = user?.email.charAt(0).toUpperCase();

  /* Verify if User In-Session in LocalStorage */  
  useEffect(() => {  
    const fetchDecodedUserID = async () => {  
      try {  
        const response = JSON.parse(localStorage.getItem('token'));  
        setUser(response.data);  

        const decoded_token = jwtDecode(response.data.token);
        setUser(decoded_token);

      } catch (error) {  

        navigate('/login');  
      }  
    };  

    fetchDecodedUserID();  
  }, []);  

  /* Performs Logout Method */  
  const handleLogout = async () => {  

    try {  
      localStorage.removeItem('token');  
      navigate('/login');  

    } catch (error) {  
      console.error('Logout failed:', error);  
    }  
  };  

  return (
    <>
    <div className='w-full flex justify-between items-center font-semibold pl-2'>
      <div className='flex items-center gap-2'>
        <img onClick={()=>navigate(-1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_left} alt=""/>
        <img onClick={()=>navigate(+1)} className='w-8 bg-black p-2 rounded-2xl cursor-pointer' src={assets.arrow_right} alt=""/>
      </div>
      <div className='flex items-center gap-4 pr-3'>
        <p className='bg-white text-black text-[15px] px-4 py-1 rounded-2xl hidden md:block cursor-pointer'>Explore Premium</p>
        <p className='bg-black py-1 px-4 rounded-2xl text-white text-[15px] cursor-pointer hover:bg-[#ffffff26]' onClick={handleLogout}>Log Out</p>
        <p className='bg-purple-500 text-black w-7 h-7 rounded-full flex justify-center'> {firstLetter}  </p>  
      </div>
    </div>
    <div className='flex items-center gap-2 mt-4 pl-2'>
      <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>All</p>
      <p className='bg-black text-white px-4 py-1 rounded-2xl cursor-pointer'>Music</p>
      <p className='bg-white text-black px-4 py-1 rounded-2xl cursor-pointer'>Podcasts</p>

    </div>
    </>
  )
}

export default Navbar