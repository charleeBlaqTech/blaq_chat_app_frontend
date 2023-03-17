import { useState} from "react";
import './App.css';
import Io from "socket.io-client";
import Chat from "./Chat";
const socket = Io.connect("https://blaq-chat-app-server.onrender.com")


function App() {

  const [userName, setUserName]  = useState("");
  const [room, setRoom]  = useState("");
  const [openChatRoom, setOpenChatRoom]  = useState(false);
  const [loginError, setLoginError]  = useState(false);
 
  
  const userNameHandler= (event)=>{
    setUserName(event.target.value);
  }

  const joinRoom=()=>{
    if(userName !== "" && room !== ""){
      socket.emit("join_room", room);
      setOpenChatRoom(true)
      setLoginError(false)
    }else{
      setLoginError(true)
    }
  }

  return (
    <div className="App">
      <h1 className="heading">LIVE CHAT</h1>
      <p className="error-meaasage">{loginError ? "your username and any group must be seletced to join!!!":""}</p>

      {!openChatRoom ?
      <div className="top-chat">
        <input type="text" placeholder="username" onChange={userNameHandler} required/>
        <input type="text" placeholder="room ID" onClick={(event)=>{setRoom(event.target.value)}} value="Chelsea FC Group" required/>
        <input type="text" placeholder="room ID" onClick={(event)=>{setRoom(event.target.value)}} value="Barca FC Group" required/>
        <input type="text" placeholder="room ID" onClick={(event)=>{setRoom(event.target.value)}} value="Madrid FC Group" required/>
        <input type="text" placeholder="room ID" onClick={(event)=>{setRoom(event.target.value)}} value="Man UTD FC Group" required/>
        <input type="text" placeholder="room ID" onClick={(event)=>{setRoom(event.target.value)}} value="football fan Group" required/>
        <button onClick={joinRoom}>join chat</button>
      </div>
      :
      <Chat socket={socket} username={userName} room={room}/>
      }
    </div>
  );
}

export default App;
