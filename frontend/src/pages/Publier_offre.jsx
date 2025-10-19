import style from './Publier_offre.module.css';
import React, { useState } from 'react';
import { useNotificationContext } from '../contexts/NotificationContext';
import { getCurrentUser } from '../utils/auth';

function Publier_offre() {
    const { showSuccess, showError } = useNotificationContext();
    const [loading, setLoading] = useState(false);
    
    // Récupérer l'utilisateur connecté et son ID entreprise
    const currentUser = getCurrentUser();
    const idEntreprise = currentUser?.idEntreprise;
    const [form, setForm] = useState({
        titre: '',
        lieu: '',
        description: '',
        mission_offre: '',
        profil_recherch: '',
        description_poste: '',
        type_contrat: '',
        salaire_min: '',
        salaire_max: '',
        experience_requise: '',
        niveau_etude: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Vérifier que l'utilisateur est connecté et a une entreprise
        if (!currentUser) {
            showError("Vous devez être connecté pour publier une offre");
            return;
        }
        
        if (!idEntreprise) {
            showError("Vous devez être associé à une entreprise pour publier une offre");
            return;
        }
        
        // Validation des champs obligatoires
        if (!form.titre.trim()) {
            showError("Le titre de l'offre est obligatoire");
            return;
        }
        if (!form.profil_recherch.trim()) {
            showError("Le profil recherché est obligatoire");
            return;
        }
        if (!form.description_poste.trim()) {
            showError("La description du poste est obligatoire");
            return;
        }
        
        // Validation des salaires
        if (form.salaire_min && form.salaire_max && parseFloat(form.salaire_min) > parseFloat(form.salaire_max)) {
            showError("Le salaire minimum ne peut pas être supérieur au salaire maximum");
            return;
        }
        
        setLoading(true);
        
        try {
            const response = await fetch('http://localhost:5000/ApiByeWork/offres/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ 
                    ...form, 
                    idEntreprise: idEntreprise 
                })
            });
            const data = await response.json();
            
            if (!response.ok || !data?.success) {
                showError(data?.message || "Erreur lors de la création de l'offre");
                return;
            }

            showSuccess('Offre publiée avec succès !');
            setForm({
                titre: '',
                lieu: '',
                description: '',
                mission_offre: '',
                profil_recherch: '',
                description_poste: '',
                type_contrat: '',
                salaire_min: '',
                salaire_max: '',
                experience_requise: '',
                niveau_etude: ''
            });
        } catch (err) {
            showError("Erreur réseau lors de la publication de l'offre");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={style.page}>
            <div className={style.grid}>
                <div className={style.card}>
                  <div className={style.sectionHeaderBar}>
                        <span className={style.sectionTiret}>→</span>
                        <h3 className={style.sectionHeaderText}>Publier une offre</h3>
                  </div>
                   
                     <form className={style.form} onSubmit={handleSubmit}>
                        <label className={style.label}>
                            Titre de l'offre:
                            <input type="text" name="titre" className={style.input} value={form.titre} onChange={handleChange} required />
                        </label>
                        <label className={style.label}>
                            Description:
                            <textarea name="description" className={style.textarea} value={form.description} onChange={handleChange}></textarea>
                        </label>
                        <div className={style.missions}>
                            <label className={style.label}>Missions de l'offre</label>
                            <textarea
                                name="mission_offre"
                                className={style.textarea}
                                placeholder="Écrivez les missions ici..."
                                value={form.mission_offre}
                                onChange={handleChange}
                            />
                        </div>
                        <label className={style.label}>
                            Profil recherché:
                            <textarea name="profil_recherch" className={style.textarea} value={form.profil_recherch} onChange={handleChange} required></textarea>
                        </label>
                        <label className={style.label}>
                            Description du poste:
                            <textarea name="description_poste" className={style.textarea} value={form.description_poste} onChange={handleChange} required></textarea>
                        </label>
                        <label className={style.label}>
                            Lieu:
                            <input type="text" name="lieu" className={style.input} value={form.lieu} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Type de contrat:
                            <select name="type_contrat" className={style.input} value={form.type_contrat} onChange={handleChange}>
                                <option value="">Sélectionner</option>
                                <option value="CDI">CDI</option>
                                <option value="CDD">CDD</option>
                                <option value="Alternance">Alternance</option>
                            </select>
                        </label>
                        <label className={style.label}>
                            Salaire minimum:
                            <input type="number" step="0.01" name="salaire_min" className={style.input} value={form.salaire_min} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Salaire maximum:
                            <input type="number" step="0.01" name="salaire_max" className={style.input} value={form.salaire_max} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Expérience requise:
                            <input type="text" name="experience_requise" className={style.input} value={form.experience_requise} onChange={handleChange} />
                        </label>
                        <label className={style.label}>
                            Niveau d'étude:
                            <input type="text" name="niveau_etude" className={style.input} value={form.niveau_etude} onChange={handleChange} />
                        </label>
                        <button className={style.button} type="submit" disabled={loading}>
                            {loading ? 'Publication...' : 'Publier l\'offre'}
                        </button>
                    </form>
                </div>
               {/* Informations sur l'entreprise */}
        <aside className={style.sideCol}>
          <div className={style.card}>
            <div className={style.sectionHeaderBar}>
              <span className={style.sectionTiret}>→</span>
              <h2 className={style.sectionHeaderText}>L'entreprise</h2>
            </div>
            <p>Assurez-vous que les informations de votre entreprise sont à jour pour attirer les meilleurs candidats.</p>
          </div>
        </aside>
      </div>
    </div>
    );
}

export default Publier_offre;
