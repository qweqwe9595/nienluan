import {
  FaBars,
  FaSearch,
  FaBook,
  FaUserTie,
  FaCalendarAlt,
  FaUserFriends,
} from "react-icons/fa";
import { AiFillCaretDown } from "react-icons/ai";
import { FiBell } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import "./nav.scss";
import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { SearchResultContext } from "../../context/SearchContext";
import Notifications from "../../component/notifications/Notifications";
import { useNavigate, Link } from "react-router-dom";
import {BsChatSquareDots } from "react-icons/bs";

function Nav() {
  const [open, setOpen] = useState(false);
  const [openNoti, setOpenNoti] = useState(false);
  let navigate = useNavigate();
  const [searchResult, setSearchResult] = useContext(SearchResultContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const currentUserId = localStorage.getItem("userID");
  const [avt, setAvt] = useState([]);
  const [returnNoti, setReturnNoti] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const getUserInfo = () => {
      axios
        .get(`http://localhost:5000/api/users//getone/${userId}`)
        .then((res) => {
          setUserInfo(res.data);
          setAvt(res.data.photos.avatar.length);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    getUserInfo();
  }, []);

  const getSearchTerm = () => {
    if (searchTerm === "") {
      return;
    }
    axios
      .get(`http://localhost:5000/api/users/search?name=${searchTerm}`)
      .then((res) => {
        setSearchResult(res.data);
        navigate(`/searchresult`);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <div className="nav">
      {openNoti ? (
        <div className="notification-icon">
           <button class="close">
              <span onClick={()=>setOpenNoti(!openNoti)}>&times;</span>
            </button>
          <Notifications setReturnNoti={setReturnNoti}></Notifications>
        </div>
      ) : (
        ""
      )}
      <div className="nav-left">
        <Link to={"/"}>
          <img className="logo" src="/stocks/img/logo/ctu.png" alt="" />
        </Link>

        <div className="search-icon-container">
          <FaSearch className="search-icon"></FaSearch>
        </div>
      </div>

      <div
        onKeyPress={(e) => {
          if (e.key === "Enter") return getSearchTerm();
        }}
        className="searchbar"
      >
        <div className="search-icon-container">
          <FaSearch
            className="search-icon"
            onClick={() => {
              getSearchTerm();
            }}
          ></FaSearch>
        </div>
        <input
          type="search"
          placeholder="T??m ki???m m???t ai ????..."
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      <div className="nav-right">
        <Link to={"/message"}>
          <BsChatSquareDots className="bell" />
        </Link>

        <FiBell
          className="bell"
          onClick={() => {
            setOpenNoti(!openNoti);
          }}
        ></FiBell>

        <FaBars
          className="hamburger"
          onClick={() => {
            setOpen(!open);
          }}
        ></FaBars>

        <div className="user-container">
          <Link to={`/profile/${currentUserId}`}>
            <div className="userinfo">
              {avt === 0 ? (
                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
              ) : (
                <img
                  src={`http://localhost:5000/images/${
                    userInfo?.photos?.avatar[
                      userInfo?.photos?.avatar?.length - 1
                    ]
                  }`}
                />
              )}
              <span>{userInfo?.userName}</span>
            </div>
          </Link>

          <AiFillCaretDown
            className="arrow-down"
            onClick={() => {
              setOpen(!open);
            }}
          />
        </div>
      </div>

      {open ? (
        <>
          <div
            className="show_optional"
            onClick={() => {
              setOpen(false);
            }}
          ></div>
          <div className="optional">
            <Link to={`/profile/${currentUserId}`}>
              <div className="user">
                {avt === 0 ? (
                  <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png" />
                ) : (
                  <img
                    src={`http://localhost:5000/images/${
                      userInfo?.photos?.avatar[
                        userInfo?.photos?.avatar?.length - 1
                      ]
                    }`}
                  />
                )}
                <div className="infouser">
                  <span>{userInfo.userName ? userInfo.userName : ""}</span>
                  <p>Xem trang c?? nh??n c???a b???n </p>
                </div>
              </div>
            </Link>

            <hr></hr>

            <Link to={"/friend"}>
              <div className="signout">
                <div className="icon_doc">
                  <FaUserFriends />
                </div>
                <span>B???n b??</span>
              </div>
            </Link>
            <Link to={"/event"}>
              <div className="signout">
                <div className="icon_doc">
                  <FaCalendarAlt></FaCalendarAlt>
                </div>
                <span>Tin t???c & S??? ki???n</span>
              </div>
            </Link>
            <Link to={"/job"}>
              <div className="signout">
                <div className="icon_doc">
                  <FaUserTie></FaUserTie>
                </div>
                <span>Th???c t???p tuy???n d???ng</span>
              </div>
            </Link>

            <Link to={"/document"}>
              <div className="signout">
                <div className="icon_doc">
                  <FaBook></FaBook>
                </div>
                <span>T??i li???u</span>
              </div>
            </Link>
            <div
              className="signout"
              onClick={() => {
                logOut();
              }}
            >
              <div className="icon-signout">
                <GoSignOut></GoSignOut>
              </div>
              <span>????ng xu???t</span>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Nav;
