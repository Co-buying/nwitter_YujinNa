import { authService, dbService } from "fbase";
import React, { useEffect } from "react";

export default ({userObj})=>{
    const onLogOutClick=()=>authService.signOut();
    const getMyNweets=async()=>{
        const nweets=await dbService
            .collection("nweets")
            .where("creatorId","==",userObj.uid)
            .orderBy("createdAt")
            .get();
        console.log(nweets.docs.map((doc)=>doc.data()));
    }
    useEffect(()=>{
        getMyNweets();
    },[]);
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};