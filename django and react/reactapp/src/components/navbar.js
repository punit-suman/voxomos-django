import React from 'react'
import {Link} from 'react-router-dom'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

function Navbar({isLoggedIn}) {
    const [expandmenu, setExpandmenu] = useState("hide")
    const logout = async e => {
        let response = await Axios.post('http://localhost:8000/accounts/logout', {}, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        })
        console.log(response.data)
        window.location.reload()
    }
    const expandMenu = e => {
        if (expandmenu === "hide"){
            setExpandmenu("show")
        } else {
            setExpandmenu("hide")
        }
    }
    return (
        <div className="navbar">
            <div className="main-container">
                <div className="left-menu-expand" onClick={e => expandMenu(e)}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="left">
                    <Link to="/" className="link">Home</Link>
                </div>
                {isLoggedIn ?
                <div className="right">
                    <div className="items">
                        <Link to={`/profile`} className="hello-msg">Profile</Link>
                    </div>
                    <div className="items">
                        <button className="logout-btn" onClick={e => logout(e)}>Logout</button>
                    </div>
                </div>
                :
                <div className="right">
                    <div className="items">
                        <Link to="/authenticate" className="login-link">Login</Link>
                    </div>
                </div>
                }
                <div className={`expand-menu ${expandmenu}`}>
                    <div className="items">
                        <Link to="/" className="link">Home</Link>
                    </div>
                    <div className="items">
                        About Us
                    </div>
                    <div className="items">
                        Contact Us
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar