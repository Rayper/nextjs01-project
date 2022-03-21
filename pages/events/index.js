// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'
import Layout from  '@/components/Layout'
import EventItem from  '@/components/EventItem'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, totalEvents }) {
  // hitung untuk lastPage nya
  // const lastPage = Math.ceil(totalEvents / PER_PAGE)

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No Events to Show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
      
      <Pagination page={page} totalEvents={totalEvents}/>

    </Layout>
  )
}

export async function getServerSideProps({query: { page = 1}}) {
  // itung start page
  // +page -> supaya jadi number
  const start = +page === 1 ? 0 : (+page - 1) * PER_PAGE

  // Fetch Total Events
  const totalRes = await fetch(`${API_URL}/events/count`)
  const totalEvents = await totalRes.json()

  // Fetch Events
  const eventRes = await fetch(`${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`)
  const events = await eventRes.json()

  return {
    // total = total events
    props: { events, page: +page, totalEvents },
    // 1 second delay untuk mendapatkan data yang terupdate
    // revalidate: 1
  }
}
