import React from 'react'
import '../App.css'
import Logo from '../personalLogo.svg'

export default function Header() {
    return (
        <div className="header">
            <img src={Logo} alt="My-Logo"/>
            <h1>Todo-List App</h1>
        </div>
    )
}
