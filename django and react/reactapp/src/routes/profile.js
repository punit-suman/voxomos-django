import React from 'react'
import Axios from 'axios'
import Navbar from '../components/navbar'
import { useEffect, useState } from 'react'

export default function Profile({isLoggedIn, responseStatus}) {
    
    // Axios.defaults.withCredentials = true
    
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        async function getUserData() {
            if (isLoggedIn) {
                let response = await Axios.get('http://localhost:8000/users/user', {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                        // 'X-CSRFToken': Cookies.get('csrftoken')
                    }
                })
                console.log(response.data)
                setUserData(response.data)
            }
        }
        getUserData()
    }, [])

    if (isLoggedIn) {
        return (
            <div>
                <Navbar isLoggedIn={isLoggedIn} />
                <br></br>
                <br></br>
                <br></br>
                Hi {userData?.username}!
            </div>
        )
    } else {
        window.location.href = "/authenticate"
    }
    return (
        <div>

        </div>
    )
}