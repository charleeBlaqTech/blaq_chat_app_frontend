import React, { Fragment, useEffect, useState } from 'react';
import scroller from "react-scroll-to-bottom"


const Chat = ({ socket,room, username}) => {
    const [currentMessage, setCurrentMessage]= useState("");
    const [messages, setMessages]  = useState([]);

    //  creating a new chat message
     const sendMessage=async ()=>{
        if(currentMessage !== ""){
            const messageData={
                room: room,
                user: username,
                text: currentMessage,
                posted: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes() };

        await socket.emit("send_message", messageData);
        setCurrentMessage("");
        setMessages((prevData)=>{
            return [...prevData, messageData]

        });


        }
    };

    // getting back all the chat messages

    useEffect(()=>{
       
        socket.off("get_messages").on('get_messages', (data)=>{
            setMessages([...data]);
        })
    },[currentMessage])

  

     

      
  
  return (
    <Fragment>
    <scroller className="scroll-effect">

        <div className='chat-screen'>
            <div className='text-body'>

                {messages.map((item)=>{
                    return (
                        <Fragment>
                        <p className={username === item.user? "sender": "receiver"}>
                            <span className='user-name'>{username === item.user? "" : item.user}</span>
                            <span className='user-text'> {item.text}</span>   
                        </p>
                        <span className={username === item.user? "senderTime": "receiverTime"}>{item.posted }</span>
                        </Fragment>   
                    )
                })}
            
            </div>
        
        </div>
    </scroller>
        <div className='send'>
        <input value={currentMessage} type="text" placeholder='message' onChange={(event)=>{setCurrentMessage(event.target.value)}}/><br/>
        <button onClick={sendMessage}>send</button>
        </div>
    </Fragment>
    
    
  )
}

export default Chat