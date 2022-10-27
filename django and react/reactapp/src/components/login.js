import React, {useState} from 'react'
import Axios from 'axios'
import Cookies from 'js-cookie'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const login = async e => {
        e.preventDefault()
        let response = await Axios.post('http://localhost:8000/accounts/login', {
            username: username,
            password: password
        }, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': Cookies.get('csrftoken')
        }})
        if (response && response.data.success) {
            alert('Authenticated')
            window.location.href = '/'
        } else {
            alert('Not Authenticated')
        }
    }
    return(
        <div className="login">
            <form onSubmit={e => login(e)}>
                <div className="input-container">
                    <input type="text" onChange={(e) => setUsername(e.target.value)} placeholder="username" />
                </div>
                <div className="input-container">
                    <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password" />
                </div>
                <div className="login-btn-container">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        )
}

export default Login