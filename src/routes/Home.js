import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
const Home =({ userObj })=> { //userObj변수는 곧 loggeduser을 의미
    const [nweet,setNweet]=useState("");
    const [nweets,setNweets]=useState([]);
    const [attachment,setAttachment]=useState();
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
    const onFileChange=(event)=>{
        // console.log(event.target.files);
        const {target : {files},
        } =event;
        const theFile=files[0];
        const reader=new FileReader();
        reader.onloadend=(finishedEvent)=>{ //파일 로딩이나 리딩후, 끝나면 이 라인 실행(finishedEvent)
            //어쨌든 얘도 이벤트리스너임
            // console.log(finishedEvent);
            const {currentTarget:{result}}=finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment=()=>setAttachment(null);
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
                <input type="file" accept="image/*" onChange={onFileChange} />
                <input type="submit" value="Nweet" />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear image</button>
                    </div>
                    )}            
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