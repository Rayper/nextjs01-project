import React from 'react'
// import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index';

export default function EventPage({ evt }) {
  // const router = useRouter()
  // console.log(router);
  return (
    <Layout>
        {/* <h1>{evt.name}</h1> */}
    </Layout>
  )
}

export async function getStaticPaths() {
  // create semua paths dengan slug
  const res = await fetch(`${API_URL}/api/events`)
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

    const res = await fetch(`${API_URL}/api/events/${slug}`)
    const events = await res.json()

    return {
      props: {
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
