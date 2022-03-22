import React from 'react'
import Layout from '@/components/Layout';
import { parseCookies } from '@/helpers/index';
import { API_URL } from '@/config/index';
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent';
import { useRouter } from 'next/router';

export default function DashboardPage({ events, token }) {
    const router = useRouter()
    
    const deleteEvent = async (id) => {
        // console.log('delete');
        if(confirm('Are you sure want to delete this Events?')) {
          // jika oke, maka jalanin ini
        const res = await fetch(`${API_URL}/events/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
        const data = await res.json()
    
        // jika tidak ok, tampilin error
        if(!res.ok) {
            toast.error(data.message())
        } else {
            // stay di halaman Dashboard setelah delete
            router.reload()
            }
        }
    }

    return (
        <Layout title={'Dashboard Page'}>
            <h1>Dashboard</h1>
            <h3>My Events</h3>

            {events.map((evt) => (
                <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
            ))}

        </Layout>
    )
}

export async function getServerSideProps({req}) {
    const {token} = parseCookies(req)

    const res = await fetch(`${API_URL}/events/me`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const events = await res.json()

    return {
        props: { 
            events,
            token
        }
    }
}
