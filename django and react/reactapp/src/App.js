import React, { useEffect, useState } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Axios from 'axios'

import { getCookie } from './helpers/csrf';

import "./App.css"
import "./styling/navbar.css"
import "./styling/loginpage.css"

import Homepage from './routes/home'
import LoginPage from './routes/loginpage'
import Profile from './routes/profile'
import PageNotFound from './routes/pagenotfound'

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [responseStatus, setResponseStatus] = useState(false)
    const [crsfToken, setCsrfToken] = useState('')

    // Axios.defaults.withCredentials = true

    useEffect(() => {
        function checkLoggedIn() {
        Axios.get("http://localhost:8000/accounts/isAuth", {withCredentials: true}).then((response)=>{
            if (response.data.isAuthenticated === 'false') {
                alert("Not authenticated")
                setIsLoggedIn(false)
                Axios.get("http://localhost:8000/accounts/csrf_cookie", {withCredentials: false}).then((res) => {
                    alert("Cookie set")
                    setCsrfToken(getCookie('csrftoken'))
                })
            } else {
                alert('Already authenticated')
                setIsLoggedIn(true)
            }
            setTimeout(()=>{
                setResponseStatus(true)
            }, 500)
        })
    }
    checkLoggedIn();
    }, [])

    useEffect(() => {
        if (crsfToken !== '') {}
            // alert(crsfToken)
    }, [crsfToken])

    if (!responseStatus) {
        return (
            <div>
                <div className="loader-wrapper">
                    <div className="loader"></div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" component={() => (<Homepage isLoggedIn={isLoggedIn} />)} exact />
                    <Route path="/authenticate" component={() => (<LoginPage isLoggedIn={isLoggedIn} />)} exact />
                    <Route path="/profile" component={() => (<Profile isLoggedIn={isLoggedIn} responseStatus = {responseStatus} />)} exact />
                    <Route component={PageNotFound} />
                </Switch>
            </BrowserRouter>

            
        </div>
    );
}

export default App