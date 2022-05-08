import { dbService, storageService } from "fbase";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
const Nweet=({nweetObj, isOwner})=>{
    const [editing,setEditing]=useState(false);
    const [newNweet,setNewNweet]=useState(nweetObj.text); //input에 입력된 text를 업데이트해줌
    const onDeleteClick=async()=>{
        const ok=window.confirm("Are you sure you want to delete this nweet?");
        if(ok){
            //delete
            await dbService.doc(`nweets/${nweetObj.id}`).delete();
            await storageService.refFromURL(nweetObj.attachmentUrl).delete();
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
        <div className="nweet">
            {editing ? (
                <>
                <form onSubmit={onSubmit} className="container nweetEdit">
                    <input
                        onChange={onChange} 
                        type="text" 
                        placeholder="Edit your nweet" 
                        autoFocus
                        className="formInput"
                        value={newNweet} 
                        required
                    />
                    <input type="submit"value="Update Nweet" className="formBtn" />
                </form>
                <span onClick={toggleEditing} className="formBtn cancleBtn">
                    Cancel
                </span>
                </>
                ) : (
                <>
                    <h4>{nweetObj.text}</h4>
                    {nweetObj.attachmentUrl && <img src={nweetObj.attachmentUrl} />}
                    {isOwner && (
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )}
                </>)
            }
        </div>
    );
};

export default Nweet;