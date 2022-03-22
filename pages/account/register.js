import React from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Layout from '@/components/Layout';
import styles from '@/styles/Auth.module.css'
import { FaUser } from 'react-icons/fa'
import AuthContext from '@/context/AuthContext';


export default function RegisterPage() {
    // create state untukk username, email dan password, confirmPassword
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');

    const {register, error} = useContext(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault()

        // validasi password dan confirm password
        if(password !== confirmpassword) {
          toast.error('Password do not match with Confirm Password!');

          return
        }

        register({username, email, password, confirmpassword})
    }


  return (
    <Layout title={'User Register'}>
        <div className={styles.auth}>
            <h1>
                <FaUser /> Register
            </h1>
            <ToastContainer />
            <form onSubmit={handleSubmit}>

                <div>
                    <label htmlFor='email'>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='email'>Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor='password'>Confirm Password</label>
                    <input
                        type="password"
                        id="confirmpassword"
                        name="confirmpassword"
                        value={confirmpassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <input type="submit" value="Login" className="btn" />
            </form>
            <p>
                Already have an account ?
                <Link href="/account/login"> Login</Link>
            </p>
        </div>
    </Layout>
  )
}
