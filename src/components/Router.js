import React from "react";
import {HashRouter as Router, Route,Switch} from "react-router-dom"
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import { useState } from "react";
const AppRouter= ()=> {
    const [isLoggedIn,setIsLoggenIn]=useState(false);
    return (
        <Router>
            <Switch>
                {isLoggedIn ? (
                    <>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    </>
                ) :( 
                    <Route exact path="/">
                        <Auth />
                    </Route>
                )}
            </Switch>
        </Router>
    )
}

export default AppRouter;