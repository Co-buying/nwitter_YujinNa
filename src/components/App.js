import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  const [init,setInit]=useState(false);
  const [userObj,setUserObj]=useState(null); //userObj가 위쪽에 있는 이유: 다른페이지에서 userObj를 원할수있기에
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      //onAuthStateChanged는 로그인,로그아웃, 어플리케이션 초기화시 발생
    if (user) {
        setUserObj(user);
      }
      setInit(true);
    });
  },[]);
  return (
    <>
      {init? <AppRouter isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing.."}
      <footer>&copy;Nwitter{new Date().getFullYear(

      )}</footer>
    </>
  );
}

export default App;
