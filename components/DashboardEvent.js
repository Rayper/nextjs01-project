import Link from 'next/link'
import {FaPencilAlt, FaTimes} from 'react-icons/fa'
import React from 'react'
import styles from '@/styles/DashboardEvent.module.css'

// set 2 props evt dan handleDelete, handleDelete akan dipanggil pada dashboard.js
export default function DashboardEvent({ evt, handleDelete }) {
    return (
            <div className={styles.event}>
            <h4>
                <Link href={`/events/${evt.slug}`}>
                <a>{evt.name}</a>
                </Link>
            </h4>
            <Link href={`/events/edit/${evt.id}`}>
                <a className={styles.edit}>
                <FaPencilAlt /> <span>Edit Event</span>
                </a>
            </Link>
            <a
                href="#"
                className={styles.delete}
                onClick={() => handleDelete(evt.id)}
            >
                <FaTimes /> <span>Delete Event</span>
            </a>

            </div>
    )
}
