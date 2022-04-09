import { dbService } from "fbase";
import React, { useState } from "react";

const Nweet=({nweetObj, isOwner})=>{
    const [editing,setEditing]=useState(false);
    const [newNweet,setNewNweet]=useState(nweetObj.text); //input에 입력된 text를 업데이트해줌
    const onDeleteClick=async()=>{
        const ok=window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            //delete
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
        }
    }
    const toggleEditing=()=>setEditing((prev)=>!prev); //editing모드인지아닌지
    const onChange=(event)=>{
        const {
            target:{value},
        } = event;
        setNewNweet(value);
    }
    const onSubmit=async(event)=>{
        event.preventDefault();
        //console.log(nweetObj,newNweet);
        await dbService.doc(`nweets/${nweetObj.id}`).update({
            text: newNweet//newNweet은 input에 있는 text임
        });
        setEditing(false);
    }
    return (
        <div>
            {editing ? (
                <>
                <form onSubmit={onSubmit}>
                    <input
                        onChange={onChange} 
                        type="text" 
                        placeholder="Edit your nweet" 
                        value={newNweet} 
                        required
                    />
                    <input type="submit"value="Update Nweet" />
                </form>
                <button onClick={toggleEditing}>Cancle</button>
                </>
                ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl&&<img src={nweetObj.attachmentUrl} width="50px" height="50px"/>}
                    {isOwner && (
                        <>
                            <button onClick={onDeleteClick}>Delete Nweet</button>
                            <button onClick={toggleEditing}>Edit Nweet</button>
                        </>
                    )}
                </>)
            }
        </div>
    );
};

export default Nweet;