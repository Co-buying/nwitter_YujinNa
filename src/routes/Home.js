import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home =({ userObj })=> { 
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    useEffect(()=>{
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            const nweetArray=snapshot.docs.map(doc=>({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
            //console.log(nweetArray);
        })
    },[]);
    const onSubmit= async(event)=>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            text:nweet, //nweet은 state인 nweet의 value임
            createdAt: Date.now(),
            creatorId:userObj.uid,
        });
        setNweet(""); //빈 문자열로 돌아가게끔
    };
    const onChange=(event)=>{
        const{target:{value}}=event;
        setNweet(value);
    };
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input 
                    value={nweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type="submit" value="Nweet" />
            </form>
            <div key={nweet.id}>
                {nweets.map(nweet=><div>
                   <h4>{nweet.text}</h4> 
                </div>)}
            </div>
        </div>
    );
}
export default Home;