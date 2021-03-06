import React from 'react'
import Link from 'next/link'
import styles from '@/styles/Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
        <p>Copyright &copy; Rayper 2022</p>
        <p>
            <Link href='/about'>
                <a>About This Project</a>
            </Link>
        </p>
    </footer>
  )
}
