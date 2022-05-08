import { authService} from "fbase";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { updateProfile } from "@firebase/auth";
export default ({refreshUser,userObj}) => {
    const history=useHistory();
    const [newDisplayName,setNewDisplayName]=useState(userObj.displayName);
    const onLogOutClick=()=>{
        authService.signOut();
        history.push("/");
    }
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
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    onChange={onChange}
                    autoFocus
                    className="formInput"
                    value={newDisplayName}
                    placeholder="Display name" 
                />
                <input 
                    type="submit" 
                    className="formBtn"
                    style={{
                        marginTop:10,
                    }}
                    value="Update profile" 
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    )
};