import style from './Publier_offre.module.css';
import React, { useState } from 'react';

function Publier_offre() {
    const [form, setForm] = useState({
        titre: '',
        lieu: '',
        description: '',
        mission_offre: [],
        profil_recherch: '',
        description_poste: '',
        type_contrat: '',
        salaire_min: '',
        salaire_max: '',
        experience_requise: '',
        niveau_etude: ''
    });
    const [missionDraft, setMissionDraft] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/ApiByeWork/offres/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ ...form })
            });
            const data = await response.json();
            if (!response.ok) {
                console.error('Erreur lors de la création de l\'offre:', data);
                return;
            }
     
            setForm({ ...form, titre: '', lieu: '', description: '', mission_offre: [], profil_recherch: '', description_poste: '', type_contrat: '', salaire_min: '', salaire_max: '', experience_requise: '', niveau_etude: '' });
        } catch (err) {
            console.error('Erreur réseau:', err);
        }
    };

    const addMission = () => {
        const trimmed = missionDraft.trim();
        if (!trimmed) return;
        setForm({ ...form, mission_offre: [...form.mission_offre, trimmed] });
        setMissionDraft('');
    };

    const removeMission = (index) => {
        const next = form.mission_offre.filter((_, i) => i !== index);
        setForm({ ...form, mission_offre: next });
    };

    return (
        <div className={style.page}>
            <div className={style.grid}>
                <div className={style.card}>
                  <div className={style.sectionHeaderBar}>
                        <span className={style.sectionTiret}>→</span>
                        <h3 className={style.sectionHeaderText}>Publier une offre</h3>
                  </div>
                   <h2>Remplissez le formulaire ci-dessous pour publier votre offre.</h2>
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
                            <div className={style.missionInputRow}>
                                <input
                                    type="text"
                                    className={style.input}
                                    placeholder="Ajouter une mission..."
                                    value={missionDraft}
                                    onChange={(e) => setMissionDraft(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addMission(); } }}
                                />
                                <button type="button" className={style.secondaryButton} onClick={addMission}>Ajouter</button>
                            </div>
                            {form.mission_offre.length > 0 && (
                                <ul className={style.missionList}>
                                    {form.mission_offre.map((m, idx) => (
                                        <li key={idx} className={style.missionItem}>
                                            <span className={style.missionText}>{m}</span>
                                            <button type="button" className={style.removeButton} onClick={() => removeMission(idx)}>Retirer</button>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
                        <button className={style.button} type="submit">Publier l'offre</button>
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