import React, { useContext } from 'react';  
import { PlayerContext } from './context/PlayerContext';  
import Sidebar from './components/Sidebar';  
import Player from './components/Player';  
import Display from './components/Display';  

const Home = () => {  // Changed from App to Home  
  const { audioRef, track } = useContext(PlayerContext); // Use PlayerContext here  
  return (  
    <div className='h-screen bg-black'>  
    <div className='h-[90%] flex'>  
      <Sidebar />  
      <Display />  
    </div>  
    <div>  
      <Player />  
      <audio ref={audioRef} src={track.file} preload='auto'></audio>  
    </div>  
  </div>  
  );  
};  

export default Home;