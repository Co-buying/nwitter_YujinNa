import React from "react";
import {HashRouter as Router, Route,Switch} from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./Navigation";
import Profile from "routes/Profile";
const AppRouter= ({isLoggedIn, userObj})=> {
    //AppRouter는 App.js에 의해 userObj prop을 받음
    return (
        <Router>
            {isLoggedIn && <Navigation />}
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/">
                        <Home userObj={userObj} />
                    </Route>
                    <Route exact path="/profile">
                        <Profile />
                    </Route>
                    
                    </>
                ) :(
                    <> 
                    <Route exact path="/">
                        <Auth />
                    </Route>
                    {/* <Redirect from="*" to="/" /> */}
                    </>
                    
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;