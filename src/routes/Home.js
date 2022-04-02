import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home =()=> { 
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    const getNweets= async()=>{
        const dbNweets=await dbService.collection("nweets").get();
        dbNweets.forEach((document)=>{
            const nweetObject={
                ...document.data(),
                id: document.id, //document.id값을 가져옴
            }
            setNweets(prev => [nweetObject, ...prev]);
        });
    };
    useEffect(()=>{
        getNweets();
    },[]);
    const onSubmit= async(event)=>{
        event.preventDefault();
        await dbService.collection("nweets").add({
            nweet,
            createdAt: Date.now(),
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
                   <h4>{nweet.nweet}</h4> 
                </div>)}
            </div>
        </div>
    );
}
export default Home;