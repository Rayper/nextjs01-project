import React from 'react'
import Layout from '@/components/Layout'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { parseCookies } from '@/helpers/index'

export default function AddEventPage({ token }) {
  const [values, setValues] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    // validasi jika field yang diisi error
    const hasEmptyFields = Object.values(values).some((element) => element === '')

    if(hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(values)
    })

    // jika tidak ok, maka keluar error
    if(!res.ok) {
        if(res.status === 403 || res.status === 401) {
          toast.error("No Token Included");
          return 
        }
          toast.error("Something Went Wrong!")
    } else {
      const evt = await res.json()
      // generate slug dari event yang baru di add, lalu redirect ke events yang baru di add
      router.push(`/events/${evt.slug}`);
    }

  };

  const handleInputChange = (e) => {
    const {name, value} = e.target

    setValues({
      // ambil semua current values-nya
      ...values,
      // set untuk field name nya dari value
      [name]: value
    })
  }

  return (
    <Layout title={'Add New Event'}>
        <Link href="/events">Go Back</Link>
        <h1>Add Event Page</h1>
        <ToastContainer />
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div>
                <label htmlFor="name">Event Name</label>
                <input
                type="text"
                id="name"
                name="name"
                value={values.name}
                onChange={handleInputChange}
              ></input>
            </div>

            <div>
            <label htmlFor="name">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={values.date}
              onChange={handleInputChange}
            ></input>
          </div>

          <div>
            <label htmlFor="name">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            ></input>
          </div>

        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            type="text"
            id="description"
            name="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  )
}

export async function getServerSideProps({ req }) {
  const {token} = parseCookies(req)

  // assign token ke props supaya bisa diassign ke component AddEventPage
  return {
    props: { 
      token
    }
  }
}