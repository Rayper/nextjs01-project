import Link from 'next/link'
import styles from '@/styles/Header.module.css'
import Search from './Search'
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'
import AuthContext from '@/context/AuthContext'
import { useContext } from 'react'

export default function Header() {
    // create context untuk validasi apakah user sudah login
    const {user, logout} = useContext(AuthContext);

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link href='/'>
                    <a>DJ Events</a>
                </Link>
            </div>

            <Search />

            <nav>
                <ul>
                    <li>
                        <Link href='/events'>
                            <a>Events</a>
                        </Link>
                    </li>
                        {/* cek kalau user udah login, link untuk login akan jadi logout */}
                        {user? (
                            // kalau user udah login, ga nampilin add events 
                            <>
                                <li>
                                    <Link href='/events/add'>
                                        <a>Add Events</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/account/dashboard">
                                    <a>Dashboard</a>
                                    </Link>
                                </li>
                                <li>
                                    <button
                                    onClick={() => logout()}
                                    className="btn-secondary btn-icon"
                                    >
                                    <FaSignOutAlt /> Logout
                                    </button>
                                </li>
                            </> 
                        ) : (
                            // kalau user udah logout, nampilin login
                                <>
                                    <li>
                                        <Link href='/account/login'>
                                            <a className='btn-secondary btn-icon'>
                                                <FaSignInAlt /> Login
                                            </a>
                                        </Link>
                                    </li>
                                </>
                        )}
                </ul>
            </nav>
        </header>
    );
}
