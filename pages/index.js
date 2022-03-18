// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Layout from  '@/components/Layout'
import EventItem from  '@/components/EventItem'
import { API_URL } from '@/config/index'
import Link from 'next/link'

export default function Home({ events }) {
  console.log(events);
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No Events to Show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href='/events'>
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

export async function getStaticProps() {
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  return {
    // nampilin 3 events aja
    props: { events:events.slice(0 , 3) },
    // 1 second delay untuk mendapatkan data yang terupdate
    revalidate: 1
  }
}
