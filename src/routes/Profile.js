import { authService} from "fbase";
import React, { useState } from "react";
import { updateProfile } from "@firebase/auth";
export default ({refreshUser,userObj}) => {
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick=()=>authService.signOut();
    const onChange=(event)=>{
        const{target:{value},} =event;
        setNewDisplayName(value);
    }
    const onSubmit=async(event)=>{
        event.preventDefault();
        if(userObj.displayName!==newDisplayName){
            await updateProfile(authService.currentUser, { displayName: newDisplayName });
            refreshUser();
        }
    };
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    onChange={onChange}
                    value={newDisplayName}
                    placeholder="Display name" 
                />
                <input 
                    type="submit" 
                    value="Update profile" 
                />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    )
};