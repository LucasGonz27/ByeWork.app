import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';
import styles from './Profile.module.css';

function Profile() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotificationContext();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        prenom: '',
        nom: '',
        email: '',
        telephone: '',
        ville: '',
        role: ''
    });

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }
        fetchUserData();
    }, [navigate]);

    const fetchUserData = async () => {
        try {
            const currentUser = getCurrentUser();
            if (currentUser && currentUser.email) {
                const response = await fetch(`http://localhost:5000/ApiByeWork/utilisateurs/email/${currentUser.email}`);
                const data = await response.json();
                if (data.success) {
                    setUser(data.data);
                    setFormData({
                        prenom: data.data.prenom || '',
                        nom: data.data.nom || '',
                        email: data.data.email || '',
                        telephone: data.data.telephone || '',
                        ville: data.data.ville || '',
                        mdp : data.data.mdp || '',
                        role: data.data.role || 'user'
                    });
                }
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/ApiByeWork/utilisateurs/update/${user.idUtilisateur}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            if (data.success) {
                setUser({ ...user, ...formData });
                setIsEditing(false);
                showSuccess('Profil mis à jour avec succès !');
                // Rafraîchir les données depuis l'API pour refléter l'état réel côté serveur
                fetchUserData();
            } else {
                showError('Erreur lors de la mise à jour');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showError('Erreur lors de la mise à jour');
        }
    };

    const hasMissingInfo = () => {
        const isEmpty = (value) => {
            if (value === null || value === undefined) return true;
            if (typeof value === 'string') return value.trim() === '';
            return false;
        };
        return (
            isEmpty(user?.prenom) ||
            isEmpty(user?.nom) ||
            isEmpty(user?.telephone) ||
            isEmpty(user?.ville)
        );
    };

    const getCompletionPercentage = () => {
        const isEmpty = (value) => {
            if (value === null || value === undefined) return true;
            if (typeof value === 'string') return value.trim() === '';
            return false;
        };
        const fields = [user?.prenom, user?.nom, user?.telephone, user?.ville];
        const total = fields.length;
        const filled = fields.reduce((count, value) => count + (isEmpty(value) ? 0 : 1), 0);
        return Math.round((filled / total) * 100);
    };

    if (loading) {
        return (
            <div className={styles.profileContainer}>
                <div className={styles.loading}>Chargement...</div>
            </div>
        );
    }

    return (
        <div className={styles.profileContainer}>
            <div className={styles.profileCard}>
                <h1 className={styles.title}>Mon Profil</h1>
                <p className={styles.subtitle}>Gérez vos informations personnelles</p>
                
                {hasMissingInfo() && !isEditing && (
                    <div className={styles.completeAlert}>
                        <span className={styles.completionBadge}>
                            {getCompletionPercentage()}%
                        </span>
                        <p>
                            Votre profil n'est pas complet.
                        </p>
                        <p>
                            Complétez vos informations pour une meilleure expérience.
                        </p>
                        <button 
                            className={styles.completeButton}
                            onClick={() => setIsEditing(true)}
                        >
                            Compléter mon profil
                        </button>
                    </div>
                )}

                {isEditing ? (
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="prenom">Prénom *</label>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="nom">Nom *</label>
                            <input
                                type="text"
                                id="nom"
                                name="nom"
                                value={formData.nom}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">Email *</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                disabled
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="telephone">Téléphone</label>
                            <input
                                type="tel"
                                id="telephone"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="ville">Ville</label>
                            <input
                                type="text"
                                id="ville"
                                name="ville"
                                value={formData.ville}
                                onChange={handleInputChange}
                            />
                        </div>

                        {/* Champ caché pour préserver le rôle */}
                        <input
                            type="hidden"
                            name="role"
                            value={formData.role}
                        />

                        <input
                            type="hidden"
                            name="mdp"
                            value={formData.mdp}
                        />

                        <div className={styles.formActions}>
                            <button type="submit" className={styles.saveButton}>
                                Sauvegarder
                            </button>
                            <button 
                                type="button" 
                                className={styles.cancelButton}
                                onClick={() => setIsEditing(false)}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className={styles.userInfo}>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Prénom:</span>
                            <span className={styles.value}>{user?.prenom || 'Non renseigné'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Nom:</span>
                            <span className={styles.value}>{user?.nom || 'Non renseigné'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Email:</span>
                            <span className={styles.value}>{user?.email}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Téléphone:</span>
                            <span className={styles.value}>{user?.telephone || 'Non renseigné'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Ville:</span>
                            <span className={styles.value}>{user?.ville || 'Non renseigné'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <span className={styles.label}>Rôle:</span>
                            <span className={styles.value}>{user?.role}</span>
                        </div>

                        <button 
                            className={styles.editButton}
                            onClick={() => setIsEditing(true)}
                        >
                            Modifier mes informations
                        </button>
                    </div>
                )}
            </div>
        </div>

        
    );
}

export default Profile;
