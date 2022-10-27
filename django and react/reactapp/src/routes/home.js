import React from 'react'

import Navbar from '../components/navbar'

export default function Homepage({isLoggedIn}) {
    return (
        <div className="home-container">
            <div>
                <Navbar isLoggedIn={isLoggedIn} />
            </div>
            <div className="body-container">
                <div className="message">
                    Welcome to the website.
                    <a href='/privacyPolicy.html' target='_blank'>Privacy Policy</a>
                    <a href='/termsAndConditions.html' target='_blank'>T&C</a>
                </div>
            </div>
        </div>
    )
}