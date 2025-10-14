import { useState, useEffect } from 'react';
import styles from './Notification.module.css';

const Notification = ({ message, type = 'success', duration = 3000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => {
                onClose();
            }, 300); // Attendre la fin de l'animation
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(() => {
            onClose();
        }, 300);
    };

    return (
        <div className={`${styles.notification} ${styles[type]} ${isVisible ? styles.show : styles.hide}`}>
            <div className={styles.content}>
                <div className={styles.icon}>
                    {type === 'success' && (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path
                                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    )}
                </div>
                <span className={styles.message}>{message}</span>
                <button className={styles.closeButton} onClick={handleClose}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M18 6L6 18M6 6L18 18"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Notification;
