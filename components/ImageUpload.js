import React from 'react'
import { useState } from 'react'
import { API_URL } from '../config/index'
import styles from '@/styles/Form.module.css'

export default function ImageUpload( { evtId, imageUploaded, token } ) {

    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault()
        // ambil formDatanya
        const formData = new FormData()
        // files itu fileName nya
        formData.append('files', image);
        // ref adalah sebuah collection yang membantu mengelola media seperti image
        formData.append('ref', 'events');
        formData.append('refId', evtId);
        formData.append('field', 'image');

        const res = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`
            },
            // assign body dari data yang dikirim pada formData
            body: formData
        })

        if(res.ok) {
            // panggil props imageUploaded sebagai function imageUploaded
            imageUploaded()
        }
    }

    const handleFileChange = (e) => {
        // ambil 1 file aja
        setImage(e.target.files[0]);
    }

    return (
        <div className={styles.form}>
            <h1>Upload Event Image</h1>
            <form onSubmit={handleSubmit}>
                <div className={styles.file}>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <input type="submit" value="Upload" className="btn" />
            </form>
        </div>
    )
}
