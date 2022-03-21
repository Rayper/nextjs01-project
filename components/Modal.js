import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styles from '@/styles/Modal.module.css';

export default function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false);

    useEffect(() => setIsBrowser(true), []);

    const handleClose = (e) => {
        e.preventDefault();
        // panggi props yang telah dibuat, lalu panggil pada [id].js pada Modal
        onClose();
    };

    // kalau show sesuatu tampilin div dll, kalau gak ada apa2 set null
    const modalContent = show ? (
        <div className={styles.overlay}>
        <div className={styles.modal}>
            <div className={styles.header}>
            <a href="#" onClick={handleClose}>
                <FaTimes />
            </a>
            </div>
            {/* cek kalau ada judul, tampilin judul */}
            {title && <div>{title}</div>}
            <div className={styles.body}>{children}</div>
        </div>
        </div>
    ) : null;

    // kalau isBrowser true, windows document object available untuk menampilkan modal yang telah dibuat
    if (isBrowser) {
        return ReactDOM.createPortal(
        modalContent,
        document.getElementById('modal-root')
        );
    } else {
        return null;
    }
}