import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
const Home =({ userObj })=> { //userObj변수는 곧 loggeduser을 의미
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    useEffect(()=>{
        dbService.collection("nweets").onSnapshot((snapshot)=>{
            //새로운 snapshhot받을때 배열(nweetArray)을 만듦
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
            <div>
                {nweets.map((nweet)=>(
                    <Nweet 
                        key={nweet.id} 
                        nweetObj={nweet} // nweet 오브젝트 전체: author,text,createdAt등 
                        isOwner={nweet.creatorId===userObj.uid} //userObj.uid는 Home의 props에서 옴(Home의 props는 router에 의해 받음)
                    />
                ))}
                
            </div>
        </div>
    );
}
export default Home;