import React, { useState, useEffect, useContext } from "react";
import { BiSearch } from "react-icons/bi";
import { BsImage } from "react-icons/bs";
import "./CreateGroupt.scss";
import axios from "axios";
import { UserContext } from "../../context/userContext";
function CreateGroupt({setAddGroupt,SetMyConversations}) {
  const [user] = useContext(UserContext);
  const [number, setNumber] = useState([]);


  return (
    <div className="Groupt_box">
      <div className="exit">
        <span>Tạo nhóm</span>
        <button onClick={()=>{setAddGroupt(false)}}>X</button>
      </div>
      <div className="Groupt_info">
        <div className="image">
          {/* <img src="" className="avt_groupt"></img> */}
          <BsImage className="icons"></BsImage>
        </div>
        <input placeholder="Nhập tên nhóm" type="text"></input>
      </div>
      <div className="search_friend">
        <span>Thêm thành viên vào nhóm</span>
        <div className="search">
          <BiSearch ></BiSearch>
          <input placeholder="Nhập tên " type="search"></input>
        </div>
      </div>
      <div className="result">
        <span>Bạn bè của bạn</span>
      </div>
      <div className="friendss">
        <div className="my_friend">
        {user?.friends?.map((values, index) => {
          return (
            <div className="friend_values" key={index} >
              {/* <input type="checkbox" defaultChecked={checked}></input> */}
                  {values?.photos?.avatar?.length === 0 ? (
                <img   
                  src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                ></img>
              ) : (
                <img
                  src={`http://localhost:5000/images/${
                    values?.photos?.avatar[values?.photos?.avatar?.length - 1]
                  }`}
                />
              )}
                
              <span>{values?.userName}</span>
            </div>
            );
        })}
        </div>
        

        <div className="choose_friend">
          <span>Đã chọn</span>
          <div className="choosed">
            {/* <div className="info_fr">
              <img src=""></img>
              <span>Nguyễn Văn A</span>
            </div> */}
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreateGroupt