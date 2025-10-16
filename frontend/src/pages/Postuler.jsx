import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';
import styles from './Postuler.module.css';

function useQuery() {
    const { search } = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

function Postuler() {

    const navigate = useNavigate();
    const query = useQuery();
    const { showSuccess, showError } = useNotificationContext();



    // la j'ai l'id de l'offre grace a l'url
    const idOffre = query.get('offre');

    //la j'ai l'id de l'utilisateur connecté
    const idUtilisateur = getCurrentUser()?.idUtilisateur;

    const [loading, setLoading] = useState(false);
    const [cvFile, setCvFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setCvFile(e.target.files[0] || null);
    };

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleApply = async () => {
        if (!idUtilisateur) { showError("Vous devez être connecté pour postuler."); return; }
        if (!idOffre) { showError("Offre introuvable."); return; }
        setLoading(true);
        try {
           
            const donnee = {
                idUtilisateur: Number(idUtilisateur),
                idOffre: Number(idOffre),
                date: new Date().toISOString().split('T')[0],
                message: message || null,
                statut: 'envoyée'
            };
            const response = await fetch('http://localhost:5000/ApiByeWork/candidatures/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(donnee)
            });
            const data = await response.json();
            if (!response.ok || !data?.success) {
                showError(data?.message || "Échec de la candidature");
                return;
            }
            showSuccess('Candidature envoyée');
            navigate('/');
        } catch (err) {
            showError("Erreur réseau lors de la candidature");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2 className={styles.title}>Postuler à l'offre</h2>
                <label className={styles.label}>Message pour le recruteur</label>
                <textarea
                    rows="4"
                    placeholder="Ajoutez un message à votre candidature..."
                    className={styles.textarea}
                    value={message}
                    onChange={handleMessageChange}
                    disabled={loading}
                />
                <button className={styles.button} onClick={handleApply} disabled={loading}>
                    {loading ? 'Envoi...' : 'Envoyer ma candidature'}
                </button>
            </div>
        </div>
    );
}

export default Postuler;