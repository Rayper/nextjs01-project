import React from 'react'
import { useState, useEffect, createContext } from 'react'
import { API_URL } from '../config/index'
import { useRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    // create state untuk validasi
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    // Register User
    const register = async (user) => {
        console.log(user);
    }

    // Login User
    const login = async ({email:identifier, password}) => {
        console.log({identifier, password});
    }

    // Logout User
    const logout = async () => {
        console.log('logout');
    }

    // Cek jika user sudah login
    const loggedIn = async (user) => {
        console.log('Check');
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;