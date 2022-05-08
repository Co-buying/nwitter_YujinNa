import React from "react";
import { storageService, dbService } from "fbase";
import { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const NweetFactory=({userObj})=>{
    const [attachment,setAttachment]=useState("");
    const [nweet,setNweet]=useState("");
    const onSubmit= async(event)=>{
        if (nweet===""){
            return;
        }
        event.preventDefault();
        let attachmentUrl="";
        if(attachment!==""){
            const attachmentRef=storageService
            .ref()
            .child(`${userObj.uid}/${uuidv4()}`);//userid 기준으로 폴더 나눠서 들어감
            const response=await attachmentRef.putString(attachment,"data_url");
            // console.log(response);
            attachmentUrl=await response.ref.getDownloadURL();
        }
        const nweetObj={
                text: nweet, //nweet은 state인 nweet의 value임
                createdAt: Date.now(),
                creatorId:userObj.uid,
                attachmentUrl,
        };
        await dbService.collection("nweets").add(nweetObj);
        
        setNweet(""); //빈 문자열로 돌아가게끔
        setAttachment("");
    };
    const onChange=(event)=>{
        const{target:{value}}=event;
        setNweet(value);
        console.log(value);
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
    const onClearAttachment=()=>setAttachment("");
    return(
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                    className="factoryInput__input"
                    value={nweet} 
                    onChange={onChange} 
                    type="text" 
                    placeholder="What's on your mind?" 
                    maxLength={120} 
                />
                <input type="submit" value="&rarr;" className="factoryInput__arrow" />
                </div>
                <label htmlFor="attach-file" className="factoryInput__label">
                    <span>Add photos</span>
                    <FontAwesomeIcon icon={faPlus} />
                </label>
                <input
                    id="attach-file"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    style={{
                        opacity: 0,
                    }}    
                />
                
                {attachment && (
                    <div className="factoryForm__attachment">
                        <img 
                            src={attachment}
                            style={{
                                backgroundImage: attachment,
                            }}
                        />
                        <div className="factoryForm__clear" onClick={onClearAttachment} >
                            <span>Remove</span>
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
                    )}            
            </form>
    )
};

export default NweetFactory;