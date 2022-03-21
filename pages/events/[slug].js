import React from 'react'
// import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index';
import styles from '@/styles/Event.module.css'
import Link from "next/link"
import Image from "next/image"
import {FaPencilAlt, FaTimes} from 'react-icons/fa'

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    console.log('delete');
  }
  // const router = useRouter()
  // console.log(router);
  return (
    <Layout>
        {/* <h1>{evt.name}</h1> */}
        <div className={styles.event}>

              <div className={styles.controls}>  

                <Link href={`/events/edit/${evt.id}`}>
                  <a>
                    <FaPencilAlt/> Edit Event
                  </a>
                </Link>

                <a href="#" className={styles.delete} onClick={deleteEvent}>
                    <FaTimes/> Delete Event
                </a>

              </div>

              <span>
                {new Date(evt.date).toLocaleDateString('en-US')} at {evt.time} 
              </span>

              <h1>{evt.name} </h1>
              
              {evt.image && (
                <div className={styles.image}>
                  <Image src={evt.image.formats.medium.url} width={960} height={600}/>
                </div>
              )}

              <h3>Performers:</h3>
              <p>{evt.performers}</p>
              <h3>Description</h3>
              <p>{evt.description}</p>
              <h3>Venue {evt.venue}</h3>
              <p>{evt.address}</p>

              <Link href={`/events`}>
                  <a className={styles.back}>
                    {'<'} Go Back
                  </a>
              </Link>

          </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  // create semua paths dengan slug
  const res = await fetch(`${API_URL}/events`)
  const events = await res.json()

  const paths = events.map((evt) => ({
    params: {slug: evt.slug}
  }))

  return {
    paths,
    // set to false akan return 404 ketika resource dari slug tidak ditemukan ataupun path tidak ditemukan
    fallback: true,
  }
}

// pakai parameter params dari params yang dikirimkan oleh variable paths
export async function getStaticProps({ params: {slug} }) {
    console.log(slug);

    const res = await fetch(`${API_URL}/events?slug=${slug}`)
    const events = await res.json()

    return {
      props: {
        // dapetin 1 object aja
        evt: events[0],
      },
      revalidate: 1
    }
}

// export async function getServerSideProps({ params: {slug} }) {
//   console.log(slug);

//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//     revalidate: 1
//   }
// }
