// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Layout from  '@/components/Layout'
import { API_URL } from '@/config/index'

export default function Home({events}) {
console.log(events);

  return (
    <Layout>
      <h1>Upcoming Events</h1>
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  console.log(events);

  return {
    props: {events},
    // 1 second delay untuk mendapatkan data yang terupdate
    revalidate: 1
  }
}
