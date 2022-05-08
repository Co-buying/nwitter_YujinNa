import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
const Home =({ userObj })=> { //userObj변수는 곧 loggeduser을 의미
    
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
    
    return (
        <div>
            <NweetFactory userObj={userObj}/>
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