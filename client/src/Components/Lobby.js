import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Lobby() {
    const [name,setName] = useState('');
    const [roomId,setRoomId] = useState('');
    const navigate = useNavigate();
    let handleSubmit = (e)=>{
        e.preventDefault();
        navigate(`room/${roomId}`);
    }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' placeholder='enter your name' value={name} onChange={(e)=>setName(e.target.value)} />
        <input type='text' placeholder='room id' value={roomId} onChange={(e)=>setRoomId(e.target.value)} />
        <button>submit</button>
      </form>
    </div>
  )
}
