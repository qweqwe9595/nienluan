import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import "./app.scss";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Main from "./Main";
import { SocketContextProvider } from "./context/SocketContext";
import { UserContextProvider } from "./context/userContext";
import "./tailwind.css";

const App = () => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [localStorage.getItem("token")]);

  return (
    <div className="app">
      {token ? (
        <UserContextProvider>
          <SocketContextProvider>
            <Main />
          </SocketContextProvider>
        </UserContextProvider>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="*" element={<Login />}></Route>
        </Routes>
      )}
    </div>
  );
};

export default App;
