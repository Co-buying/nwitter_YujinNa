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
        setUserObj({
          displayName:user.displayName,
          uid: user.uid,
          updateProfile:(args)=>user.updateProfile(user, { displayName: user.displayName }),
        });
      }
    if(user.displayName===null){
      const name = user.email.split("@")[0];
      user.displayName = name;
    }
      setInit(true);
    });
  },[]);
  const refreshUser=()=>{
    const user=authService.currentUser;
    setUserObj({
      displayName:user.displayName,
      uid: user.uid,
      updateProfile:(args)=>user.updateProfile(user, { displayName: user.displayName }),
    });
  }
  return (
    <>
      {init? <AppRouter refreshUser={refreshUser} isLoggedIn={Boolean(userObj)} userObj={userObj}/> : "Initializing.."}
      <footer>&copy;Nwitter{new Date().getFullYear(

      )}</footer>
    </>
  );
}

export default App;
