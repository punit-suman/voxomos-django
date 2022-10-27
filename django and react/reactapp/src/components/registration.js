import React from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { useState } from 'react'

function Registration() {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [re_password, setRePassword] = useState('')

    const register = async e => {
        e.preventDefault()
        const response = await Axios.post('http://localhost:8000/accounts/register', {
            username: username,
            password: password,
            re_password: re_password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
            }
        })
        if (response && response.data.success) {
            alert('Registered')
            window.location.reload()
        }
        // catch((err) => console.log("--", err))
    }
    return(
        <div className="register">
            <form onSubmit={e => register(e)}>
                <div className="input-container">
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </div>
                <div className="input-container">
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>
                <div className="input-container">
                    <input type="text" value={re_password} onChange={(e) => setRePassword(e.target.value)} placeholder="re-password" />
                </div>
                <div className="register-btn-container">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    )
}

export default Registration