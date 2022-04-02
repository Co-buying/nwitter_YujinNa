import AppRouter from "./Router";
import React, { useEffect, useState } from "react";
import { authService } from "fbase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
function App() {
  const [init,setInit]=useState(false);
  const [isLoggedIn,setIsLoggenIn]=useState(false);
  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
    if (user) {
        setIsLoggenIn(true);
      }
      else{
        setIsLoggenIn(false);
      }
      setInit(true);
    });
  },[]);
  return (
    <>
      {init? <AppRouter isLoggedIn={isLoggedIn}/> : "Initializing.."}
      <footer>&copy;Nwitter{new Date().getFullYear(

      )}</footer>
    </>
  );
}

export default App;
