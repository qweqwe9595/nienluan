import "./notifications.scss";
import React, { useEffect, useContext, useState } from "react";
import { SocketContext } from "../../context/SocketContext";
import { UserContext } from "../../context/userContext";
import axios from "axios";
import { Link } from "react-router-dom";
import dateFormat from "dateformat";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import Post from "../../component/post/Post";

function Notifications({setReturnNoti}) {
  const socket = useContext(SocketContext);
  const [user, setUser] = useContext(UserContext);
  const [notifications, setNotifications] = useState([]);
  const [post, setPost] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    if (!user) return;
    socket?.on("getNotification", (data) => {
      setNotifications(data);
    });
  }, [user, socket]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/users/getone/${user._id}`
        );
        setNotifications(res.data.notifications);
        console.log(res.data.notifications);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [user]);

  const getPost = (postId) =>{
    axios.get(`http://localhost:5000/api/posts/${postId}`)
    .then((res) => {
      setPost(res.data.post);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  const delNoti = (notifications) => {
    axios
      .delete(`http://localhost:5000/api/users/notification/${notifications._id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        }
      })
      .then((res) => {
        console.log("delete");
        setReturnNoti((prev) => !prev);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      })
  };

  return (
    <div className="notifications">
      <div className="notifications-title">
        {window.location.pathname !== "/notification" ? (
          <h3>Th??ng b??o g???n ????y</h3>
        ) : (
          <h3>T???t c??? th??ng b??o</h3>
        )}
      </div>
      {notifications.length > 0 ? (
        notifications?.map((item) => {
          const a = new Date();
          const b = new Date(item?.createdAt);
          const timepost = (a - b) / 1000;
          return (
            <div className="notifications-list">
                <div className="notifications-items">
                  <p onClick={() => {getPost(item?.post);setShowModal(!showModal);}}>
                    <Link to={`/profile/${item?.userId?._id}`}>
                      <span className="username">
                        {`${item?.userId?.userName}`}{" "}
                      </span>
                    </Link>
                    ???? {`${item?.message}`} b??i vi???t c???a b???n --- 
                    <span>
                      {(() => {
                        switch (true) {
                          case timepost < 60:
                            return (
                              <span> {Math.round(timepost)} gi??y tr?????c</span>
                            );
                          case timepost >= 60 && timepost < 60 * 60:
                            return (
                              <span>
                                 {Math.round(timepost / 60)} ph??t tr?????c
                              </span>
                            );
                          case timepost >= 60 * 60 && timepost < 60 * 60 * 24:
                            return (
                              <span>
                                 {Math.round(timepost / (60 * 60))} gi??? tr?????c
                              </span>
                            );
                          case timepost >= 60 * 60 * 24 &&
                            timepost < 60 * 60 * 24 * 7:
                            return (
                              <span>
                                 {Math.round(timepost / (60 * 60 * 24))} ng??y
                                tr?????c
                              </span>
                            );
                          case timepost >= 60 * 60 * 24 * 7 &&
                            timepost < 60 * 60 * 24 * 7 * 4:
                            return (
                              <span>
                                 {Math.round(timepost / (60 * 60 * 24 * 7))} tu???n
                                tr?????c
                              </span>
                            );
                          default:
                            return (
                              <span>
                                {Math.round(timepost / (60 * 60 * 24 * 7 * 4))}{" "}
                                th??ng tr?????c
                              </span>
                            );
                        }
                      })()}
                    </span>
                  </p>
                  <button onClick={()=>delNoti(item)}>X??a</button>
                </div>
            </div>
          );
        })
      ) : (
        <div className="none">Kh??ng c?? th??ng b??o n??o !</div>
      )}
      {window.location.pathname !== "/notification" &&
      notifications.length > 0 ? (
        <div className="notifications-all">
          <Link to={`/notification`}>
            <p>Xem t???t c???</p>
          </Link>
        </div>
      ) : (
        ""
      )}
      <Modal size="regular" active={showModal} toggler={() => setShowModal(false)}>
                  <ModalHeader toggler={() => setShowModal(false)}>
                      Modal Title
                  </ModalHeader>
                  <ModalBody>
                    <Post
                      postInfo={post}
                      setRefreshPosts={setRefreshPosts}
                    ></Post>
                  </ModalBody>
                  <ModalFooter>
                      <Button 
                          color="red"
                          buttonType="link"
                          onClick={(e) => setShowModal(false)}
                          ripple="dark"
                      >
                          Close
                      </Button>

                      <Button
                          color="green"
                          onClick={(e) => setShowModal(false)}
                          ripple="light"
                      >
                          Save Changes
                      </Button>
                  </ModalFooter>
                </Modal>
    </div>
  );
}

export default Notifications;
