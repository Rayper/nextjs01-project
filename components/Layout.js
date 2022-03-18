import React from 'react'
import Head from 'next/head'
import styles from '@/styles/Layout.module.css'
import Header from './Header'
import Showcase from './Showcase'
import Footer from './Footer'
import { useRouter } from 'next/router';


export default function Layout({title, keywords, description, children}) {
  const router = useRouter();

  return (
    <div>
        <Head>
        <title>{title}</title>
        <meta name='description' content={description}/>
        <meta name='keywords' content={keywords}/>
        </Head>

        <Header />
        {/* hanya tampil di ShowCase */}
        {router.pathname === '/' && <Showcase />}
        <div className={styles.container}>
          {children}  
        </div>
        <Footer />
    </div>
  )
}

Layout.defaultProps = {
    title: 'DJ Events',
    description: 'This is description',
    keywords: 'music, dj, events'
}
