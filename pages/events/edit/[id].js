import React from 'react'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { API_URL } from '@/config/index'
import styles from '@/styles/Form.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import Image from 'next/image'
import { FaImage } from 'react-icons/fa'

export default function EditEventPage({evt}) {

  const [values, setValues] = useState({
    name: evt.name,
    performers: evt.performers,
    venue: evt.venue,
    address: evt.address,
    date: evt.date,
    time: evt.time,
    description: evt.description,
  });
 
  // cek apakah image-nya ada, kalau ada set jadi image.formats.thumbnail.url kalau gak ada jadi null
  const [imagePreview, setImagePreview] = useState(evt.image ? evt.image.formats.thumbnail.url : null)

  // show modal yang telah dibuat, set defaultnya false
  const [showModal, setShowModal] = useState(false)

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);

    // validasi jika field yang diisi error
    const hasEmptyFields = Object.values(values).some((element) => element === '')

    if(hasEmptyFields) {
      toast.error('Please fill in all fields')
    }

    const res = await fetch(`${API_URL}/events/${evt.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })

    // jika tidak ok, maka keluar error
    if(!res.ok) {
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
    
    const imageUploaded = async (e) => {
        const res = await fetch(`${API_URL}/events/${evt.id}`);
        const data = await res.json();
        // set state ImagePreview jadi image yang diupload
        setImagePreview(data.image.formats.thumbnail.url);
        // set to false supaya modalnya close
        setShowModal(false);
      };

  return (
    <Layout title={'Edit Event Page'}>

        <Link href="/events">Go Back</Link>

        <h1>Edit Event Page</h1>

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
                        value={moment(values.date).format('yyyy-MM-DD')}
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
        
            <input type="submit" value="Update Event" className="btn" />
        </form>

        <h2>Preview Event image</h2>
        {/* cek kalau image previewnya ada  */}
        {imagePreview ? (
            <Image src={imagePreview} height={100} width={170} />) : 
            <div> 
                <p>No Image Uploaded</p>
            </div>
        }

        <div>
            <button className='btn-secondary' onClick={() => setShowModal(true)}>
                <FaImage /> Set Image
            </button>        
        </div>

        {/* kalau close, bakal set showModal to false biar ga nampilin modalnya */}
        <Modal show={showModal} onClose={() => setShowModal(false)}>
            <ImageUpload evtId={evt.id} imageUploaded={imageUploaded}/>    
        </Modal>

    </Layout>
 )
}

export async function getServerSideProps({params: {id}}) {
    const res = await fetch(`${API_URL}/events/${id}`)
    const evt = await res.json()

    return {
        props: {
            evt
        }
    }
}
