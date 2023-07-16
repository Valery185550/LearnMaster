import React, {useState, useEffect, useRef} from 'react';
import styles from "./ChatPage.module.css";
import { useLoaderData } from 'react-router-dom';
import * as signalR from "@microsoft/signalr";
import { Message as MessageType }from '../../types';
import { Message } from '../../components/message/Message';

export const ChatPage = () => {
    let {courseId, loadedMessages} = useLoaderData() as {courseId:number, loadedMessages:MessageType[]}
    let [messages, setMessages] = useState(loadedMessages);
    let [message, setMessage] = useState("");

  let[connection, setConnection] = useState( new signalR.HubConnectionBuilder().withUrl("/chat").build());
 
  useEffect(()=>{
  
  connection.on("send", data => {
    setMessages((mes)=>[...mes, data])
  });
  connection.start().then(()=>{console.log("Started")});
  },[])

  const bottomRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [messages]);
  
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timezone: 'UTC',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  } as const

  return(
    <div className={styles.main}>
      <div className={styles.messages}>
        {messages.map((m)=><Message text = {m.text} date={m.date} name={m.userName}/>)}
        <div ref={bottomRef}></div>
      </div>
      <div className={styles.inputBlock}>
        <input className={styles.input} value={message} onChange={(e)=>{setMessage(e.target.value)}} />
        <button className={styles.sendButton} onClick={()=>{connection.invoke("Send", message, sessionStorage.getItem("tokenKey"), courseId, new Date().toLocaleString("en-US", options ))}} >Send </button>
      </div>
    </div>
  ) 
}
