import React from "react";
import { useEffect, useState,useContext } from "react";
import { BiSearch } from "react-icons/bi";
import axios from "axios";
import "./MessContent.scss";
import { MdSend } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { UserContext } from "../../context/userContext";
import MyMess from "./myMess/MyMess";
import YourMess from "./yourMess/YourMess";
import PartnerInfo from "./partnerInfo/PartnerInfo";
function MessContent({myConversation}) {
  const [mess, SetMess] = useState("");
  const [me] = useContext(UserContext);
  const [chat, setChat] = useState("");
  const [loadd, setLoat] = useState(false);

  const sendMessage = () => {
    if (chat === "")
      return;
    axios
      .post(`http://localhost:5000/api/messages/createone`, {
        conversationId: myConversation._id,
        sender: me._id,
        text: chat,
      }, {
       headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
      })
      .then((res) => {
        setLoat(!loadd);
        setChat("");
     })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const getmessage = () => {
      axios
      .get(
        `http://localhost:5000/api/messages/getfromcoversation/${myConversation?._id}?token=Bearer ${localStorage.getItem(
          "token"
        )}`,
        {}
      )
      .then((res) => {
        SetMess(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
    }
    getmessage();
  }, [myConversation,loadd]);


  return (
    <div className="mess">
      <div className="mess_cent_header">
        {myConversation?.members?.length > 2 ? (
            <div className="mess_info">
              <img
                src="https://cdn.pixabay.com/photo/2016/03/23/22/26/user-1275780_960_720.png"
                className="mess_cent_avt"
              ></img>
              <span>{myConversation._id}</span>
            </div>
          ) : (
            <div>
                {myConversation?.members?.map((partners, index) => (
                  partners === me?._id ? "" : (
                    <PartnerInfo partners={partners} key={index}></PartnerInfo>
                )))}            
            </div>
          )}
        
        <div className="mess_cent_search">
          <BiSearch></BiSearch>
        </div>
        <div className="mess_cent_setting">
          <BsThreeDots></BsThreeDots>
        </div>
      </div>
      <div className="mess_content">
        {me ? (
          mess ? (
               mess?.map((sender, index) => (
          sender.sender._id === me?._id ? (
          <MyMess sender = {sender} key={index}></MyMess>
          ): (
            <YourMess sender = {sender} key={index}></YourMess>
          )
       ))
          ) : ""
        ):""}
         
      </div>
      <div className="mess_fill">
        <div className="fill"
        onKeyPress={(e) => {
          if (e.key === "Enter") return sendMessage();
        }}>
          <img className="mess_avt" src=""></img>
          <input type="text" placeholder="Nhắn tin"
              value={chat}
            onChange={(e) => {
              setChat(e.target.value);
            }}></input>
          <div className="send_message"
            onClick={() => {
              sendMessage();
            }}>
            <MdSend></MdSend>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MessContent;