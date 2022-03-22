import React from 'react'
import { useState, useEffect, createContext } from 'react'
import { API_URL, NEXT_URL } from '../config/index'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // create state untuk validasi
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    const router = useRouter()

    useEffect(() => checkUserLoggedIn(), [])

    // Register User
    const register = async (user) => {
        console.log(user);
    }

    // Login User
    const login = async ({email:identifier, password}) => {
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:  JSON.stringify({
                identifier,
                password
            })
        })

        const data = await res.json()

        console.log(data)

        if(res.ok) {
            // set user dari data yang dikirim
            setUser(data.user)
            router.push('/account/dashboard')
        } else {
            // set Error dari data yang dikirim dari login.js
            setError(data.message)
            // supaya ga stuck di state
            setError(null)
        }
    }

    // Logout User
    const logout = async () => {
        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST',
        });
        
        if (res.ok) {
            setUser(null);
            // redirect ke home
            router.push('/');
        }
    }

    // Cek jika user sudah login
    const checkUserLoggedIn = async (user) => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if(res.ok) {
            // jika oke, maka set data yang dikirim ke state setUser
            setUser(data.user)
        } else {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;