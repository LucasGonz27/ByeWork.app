import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn } from '../utils/auth';
import styles from './Profile.module.css';

function Profile() {
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }
    }, [navigate]);

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <h1 className={styles.title}>Mon Profil</h1>
                <p className={styles.subtitle}>Gérez vos informations personnelles</p>
            </div>
        </div>
    );
}

export default Profile;
