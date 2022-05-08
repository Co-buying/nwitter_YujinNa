import React from "react";
import { storageService, dbService } from "fbase";
import { useState } from "react";
import {v4 as uuidv4} from "uuid";
const NweetFactory=({userObj})=>{
    const [attachment,setAttachment]=useState("");
    const [nweet,setNweet]=useState("");
    const onSubmit= async(event)=>{
        event.preventDefault();
        let attachmentUrl="";
        if(attachment!==""){
            const attachmentRef=storageService.ref().child(`${userObj.uid}/${uuidv4()}`);//userid 기준으로 폴더 나눠서 들어감
            const response=await attachmentRef.putString(attachment,"data_url");
            // console.log(response);
            attachmentUrl=await response.ref.getDownloadURL();
        }
        const nweetObj={
                text:nweet, //nweet은 state인 nweet의 value임
                createdAt: Date.now(),
                creatorId:userObj.uid,
                attachmentUrl
        }
        await dbService.collection("nweets").add(nweetObj);
        
        setNweet(""); //빈 문자열로 돌아가게끔
        setAttachment("");
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
    return(
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
    )
};

export default NweetFactory;