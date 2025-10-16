import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedIn, getCurrentUser } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';
import styles from './AdminPanel.module.css';

function AdminPanel() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotificationContext();
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [offers, setOffers] = useState([]);

    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        if (!isLoggedIn()) {
            navigate('/login');
            return;
        }
        
        const currentUser = getCurrentUser();
        if (currentUser?.role !== 'admin') {
            navigate('/');
            showError('Accès refusé. Seuls les administrateurs peuvent accéder à cette page.');
            return;
        }
        
        loadData();
    }, [navigate, showError]);

    const loadData = async () => {
        setLoading(true);
        try {
            const [usersRes, companiesRes, offersRes] = await Promise.all([
                fetch('http://localhost:5000/ApiByeWork/utilisateurs/admin'),
                fetch('http://localhost:5000/ApiByeWork/entreprises'),
                fetch('http://localhost:5000/ApiByeWork/offres')
            ]);
            
            const [usersData, companiesData, offersData] = await Promise.all([
                usersRes.json(),
                companiesRes.json(),
                offersRes.json()
            ]);
            
            if (usersData.success) setUsers(usersData.data);
            if (companiesData.success) setCompanies(companiesData.data);
            if (offersData.success) {
                console.log('Données offres reçues:', offersData.data);
                setOffers(offersData.data);
            }
        } catch (error) {
            console.error('Erreur lors du chargement des données:', error);
            showError('Erreur lors du chargement des données');
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

    const handleEdit = (item, type) => {
        setEditingItem({ ...item, type });
        setFormData(item);
        setShowForm(true);
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
        
        try {
            let endpoint = '';
            switch (type) {
                case 'user':
                    endpoint = `http://localhost:5000/ApiByeWork/utilisateurs/delete/${id}`;
                    break;
                case 'company':
                    endpoint = `http://localhost:5000/ApiByeWork/entreprises/delete/${id}`;
                    break;
                case 'offer':
                    endpoint = `http://localhost:5000/ApiByeWork/offres/delete/${id}`;
                    break;
            }
            
            const method = type === 'offer' ? 'POST' : 'DELETE';
            const response = await fetch(endpoint, { method });
            const data = await response.json();
            
            if (data.success) {
                showSuccess('Élément supprimé avec succès');
                loadData();
            } else {
                showError('Erreur lors de la suppression');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showError('Erreur lors de la suppression');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let endpoint = '';
            let method = 'POST';
            
            if (editingItem) {
                method = 'PUT';
                switch (editingItem.type) {
                    case 'user':
                        endpoint = `http://localhost:5000/ApiByeWork/utilisateurs/update/${editingItem.idUtilisateur}`;
                        break;
                    case 'company':
                        endpoint = `http://localhost:5000/ApiByeWork/entreprises/update/${editingItem.idEntreprise}`;
                        break;
                    case 'offer':
                        endpoint = `http://localhost:5000/ApiByeWork/offres/update/${editingItem.idOffre}`;
                        break;
                }
            } else {
                switch (activeTab) {
                    case 'users':
                        endpoint = 'http://localhost:5000/ApiByeWork/utilisateurs/newUser';
                        break;
                    case 'companies':
                        endpoint = 'http://localhost:5000/ApiByeWork/entreprises/create';
                        break;
                    case 'offers':
                        endpoint = 'http://localhost:5000/ApiByeWork/offres/create';
                        break;
                }
            }
            
            const response = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            const data = await response.json();
            
            if (data.success) {
                showSuccess(editingItem ? 'Élément modifié avec succès' : 'Élément créé avec succès');
                setShowForm(false);
                setEditingItem(null);
                setFormData({});
                loadData();
            } else {
                showError(data.message || 'Erreur lors de l\'opération');
            }
        } catch (error) {
            console.error('Erreur:', error);
            showError('Erreur lors de l\'opération');
        }
    };

    const renderTable = () => {
        let data = [];
        if (activeTab === 'users') {
            data = users;
        } else if (activeTab === 'companies') {
            data = companies;
        } else if (activeTab === 'offers') {
            data = offers;
        }
        
        if (loading) {
            return <div className={styles.loading}>Chargement...</div>;
        }
        
        if (data.length === 0) {
            return <div className={styles.empty}>Aucun élément trouvé</div>;
        }
        
        return (
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {activeTab === 'users' && (
                                <>
                                    <th>ID</th>
                                    <th>Prénom</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Téléphone</th>
                                    <th>Ville</th>
                                    <th>Rôle</th>
                                    <th>Actions</th>
                                </>
                            )}
                            {activeTab === 'companies' && (
                                <>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Email</th>
                                    <th>Domaine</th>
                                    <th>Taille</th>
                                    <th>Année</th>
                                    <th>CA (M€)</th>
                                    <th>Adresse</th>
                                    <th>Téléphone</th>
                                    <th>Description</th>
                                    <th>Avantages</th>
                                    <th>Mot de passe</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </>
                            )}
                            {activeTab === 'offers' && (
                                <>
                                    <th>ID</th>
                                    <th>Titre</th>
                                    <th>Entreprise</th>
                                    <th>Lieu</th>
                                    <th>Type</th>
                                    <th>Salaire</th>
                                    <th>Statut</th>
                                    <th>Actions</th>
                                </>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item) => {
                            if (activeTab === 'users') {
                                return (
                                    <tr key={item.idUtilisateur}>
                                        <td>{item.idUtilisateur}</td>
                                        <td>{item.prenom}</td>
                                        <td>{item.nom}</td>
                                        <td>{item.email}</td>
                                        <td>{item.telephone}</td>
                                        <td>{item.ville}</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[item.role]}`}>
                                                {item.role}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className={styles.editBtn}
                                                onClick={() => handleEdit(item, 'user')}
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(item.idUtilisateur, 'user')}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                );
                            } else if (activeTab === 'companies') {
                                const adresseComplete = [
                                    item.adr_rue,
                                    item.adr_ville,
                                    item.adr_postal
                                ].filter(Boolean).join(', ') || 'N/A';
                                
                                return (
                                    <tr key={item.idEntreprise}>
                                        <td>{item.idEntreprise}</td>
                                        <td>{item.nom}</td>
                                        <td>{item.email}</td>
                                        <td>{item.domaine_activite}</td>
                                        <td>{item.taille ? item.taille.toLocaleString() : 'N/A'}</td>
                                        <td>{item.annee_fondation || 'N/A'}</td>
                                        <td>{item.chiffre_affaire ? (item.chiffre_affaire / 1000000).toFixed(0) : 'N/A'}</td>
                                        <td title={adresseComplete}>
                                            {adresseComplete.length > 30 ? 
                                                adresseComplete.substring(0, 30) + '...' : 
                                                adresseComplete
                                            }
                                        </td>
                                        <td>{item.telephone || 'N/A'}</td>
                                        <td title={item.description}>
                                            {item.description ? 
                                                (item.description.length > 50 ? 
                                                    item.description.substring(0, 50) + '...' : 
                                                    item.description
                                                ) : 'N/A'
                                            }
                                        </td>
                                        <td title={item.avantages}>
                                            {item.avantages ? 
                                                (item.avantages.length > 50 ? 
                                                    item.avantages.substring(0, 50) + '...' : 
                                                    item.avantages
                                                ) : 'N/A'
                                            }
                                        </td>
                                        <td>
                                            <span style={{fontSize: '12px', color: '#666'}}>
                                                {item.mdp ? '••••••••' : 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            {item.image ? (
                                                <img 
                                                    src={item.image} 
                                                    alt={item.nom}
                                                    style={{width: '30px', height: '30px', objectFit: 'cover', borderRadius: '4px'}}
                                                    onError={(e) => {
                                                        e.target.style.display = 'none';
                                                        e.target.nextSibling.style.display = 'inline';
                                                    }}
                                                />
                                            ) : null}
                                            <span style={{display: item.image ? 'none' : 'inline', fontSize: '12px', color: '#666'}}>
                                                {item.image ? 'Image' : 'N/A'}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className={styles.editBtn}
                                                onClick={() => handleEdit(item, 'company')}
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(item.idEntreprise, 'company')}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                );
                            } else if (activeTab === 'offers') {
                                return (
                                    <tr key={item.idOffre}>
                                        <td>{item.idOffre}</td>
                                        <td>{item.titre}</td>
                                        <td>{item.nomEntreprise || item.nom || 'Entreprise inconnue'}</td>
                                        <td>{item.lieu}</td>
                                        <td>{item.type_contrat}</td>
                                        <td>{item.salaire_min}€ - {item.salaire_max}€</td>
                                        <td>
                                            <span className={`${styles.badge} ${styles[item.statut]}`}>
                                                {item.statut}
                                            </span>
                                        </td>
                                        <td>
                                            <button 
                                                className={styles.editBtn}
                                                onClick={() => handleEdit(item, 'offer')}
                                            >
                                                Modifier
                                            </button>
                                            <button 
                                                className={styles.deleteBtn}
                                                onClick={() => handleDelete(item.idOffre, 'offer')}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                );
                            }
                            return null;
                        })}
                    </tbody>
                </table>
            </div>
        );
    };

    const renderForm = () => {
        if (!showForm) return null;
        
        return (
            <div className={styles.formOverlay}>
                <div className={styles.formContainer}>
                    <h3>{editingItem ? 'Modifier' : 'Créer'} {activeTab === 'users' ? 'utilisateur' : activeTab === 'companies' ? 'entreprise' : 'offre'}</h3>
                    
                    <form onSubmit={handleSubmit}>
                        {activeTab === 'users' && (
                            <>
                                <div className={styles.formGroup}>
                                    <label>Prénom</label>
                                    <input
                                        type="text"
                                        name="prenom"
                                        value={formData.prenom || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mot de passe</label>
                                    <input
                                        type="password"
                                        name="mdp"
                                        value={formData.mdp || ''}
                                        onChange={handleInputChange}
                                        required={!editingItem}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Téléphone</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Ville</label>
                                    <input
                                        type="text"
                                        name="ville"
                                        value={formData.ville || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Rôle</label>
                                    <select
                                        name="role"
                                        value={formData.role || 'user'}
                                        onChange={handleInputChange}
                                    >
                                        <option value="user">Utilisateur</option>
                                        <option value="recruteur">Recruteur</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </>
                        )}
                        
                        {activeTab === 'companies' && (
                            <>
                                <div className={styles.formGroup}>
                                    <label>Nom</label>
                                    <input
                                        type="text"
                                        name="nom"
                                        value={formData.nom || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Domaine d'activité</label>
                                    <input
                                        type="text"
                                        name="domaine_activite"
                                        value={formData.domaine_activite || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Taille</label>
                                    <input
                                        type="text"
                                        name="taille"
                                        value={formData.taille || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Année de fondation</label>
                                    <input
                                        type="number"
                                        name="annee_fondation"
                                        value={formData.annee_fondation || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Chiffre d'affaires</label>
                                    <input
                                        type="number"
                                        name="chiffre_affaire"
                                        value={formData.chiffre_affaire || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Téléphone</label>
                                    <input
                                        type="tel"
                                        name="telephone"
                                        value={formData.telephone || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Adresse - Rue</label>
                                    <input
                                        type="text"
                                        name="adr_rue"
                                        value={formData.adr_rue || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Adresse - Ville</label>
                                    <input
                                        type="text"
                                        name="adr_ville"
                                        value={formData.adr_ville || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Adresse - Code postal</label>
                                    <input
                                        type="text"
                                        name="adr_postal"
                                        value={formData.adr_postal || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Avantages</label>
                                    <textarea
                                        name="avantages"
                                        value={formData.avantages || ''}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Image URL</label>
                                    <input
                                        type="url"
                                        name="image"
                                        value={formData.image || ''}
                                        onChange={handleInputChange}
                                        placeholder="https://example.com/image.png"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mot de passe</label>
                                    <input
                                        type="password"
                                        name="mdp"
                                        value={formData.mdp || ''}
                                        onChange={handleInputChange}
                                        required={!editingItem}
                                        placeholder={editingItem ? "Laisser vide pour ne pas changer" : "Mot de passe requis"}
                                    />
                                </div>
                            </>
                        )}
                        
                        {activeTab === 'offers' && (
                            <>
                                <div className={styles.formGroup}>
                                    <label>Titre</label>
                                    <input
                                        type="text"
                                        name="titre"
                                        value={formData.titre || ''}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description || ''}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Mission</label>
                                    <textarea
                                        name="mission_offre"
                                        value={formData.mission_offre || ''}
                                        onChange={handleInputChange}
                                        rows="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Profil recherché *</label>
                                    <textarea
                                        name="profil_recherch"
                                        value={formData.profil_recherch || ''}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Description du poste *</label>
                                    <textarea
                                        name="description_poste"
                                        value={formData.description_poste || ''}
                                        onChange={handleInputChange}
                                        required
                                        rows="3"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Entreprise</label>
                                    <select
                                        name="idEntreprise"
                                        value={formData.idEntreprise || ''}
                                        onChange={handleInputChange}
                                        required
                                    >
                                        <option value="">Sélectionner une entreprise</option>
                                        {companies.map(company => (
                                            <option key={company.idEntreprise} value={company.idEntreprise}>
                                                {company.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Lieu</label>
                                    <input
                                        type="text"
                                        name="lieu"
                                        value={formData.lieu || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Type de contrat</label>
                                    <select
                                        name="type_contrat"
                                        value={formData.type_contrat || ''}
                                        onChange={handleInputChange}
                                    >
                                        <option value="">Sélectionner un type</option>
                                        <option value="CDI">CDI</option>
                                        <option value="CDD">CDD</option>
                                        <option value="Alternance">Alternance</option>
                                    </select>
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Salaire minimum</label>
                                    <input
                                        type="number"
                                        name="salaire_min"
                                        value={formData.salaire_min || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Salaire maximum</label>
                                    <input
                                        type="number"
                                        name="salaire_max"
                                        value={formData.salaire_max || ''}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Expérience requise</label>
                                    <input
                                        type="text"
                                        name="experience_requise"
                                        value={formData.experience_requise || ''}
                                        onChange={handleInputChange}
                                        placeholder="ex: 3 ans, Débutant"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Niveau d'étude</label>
                                    <input
                                        type="text"
                                        name="niveau_etude"
                                        value={formData.niveau_etude || ''}
                                        onChange={handleInputChange}
                                        placeholder="ex: Bac+3, Bac+5"
                                    />
                                </div>
                                <div className={styles.formGroup}>
                                    <label>Statut</label>
                                    <select
                                        name="statut"
                                        value={formData.statut || 'publiée'}
                                        onChange={handleInputChange}
                                    >
                                        <option value="publiée">Publiée</option>
                                        <option value="fermée">Fermée</option>
                                        <option value="expirée">Expirée</option>
                                    </select>
                                </div>
                            </>
                        )}
                        
                        <div className={styles.formActions}>
                            <button type="submit" className={styles.saveBtn}>
                                {editingItem ? 'Modifier' : 'Créer'}
                            </button>
                            <button 
                                type="button" 
                                className={styles.cancelBtn}
                                onClick={() => {
                                    setShowForm(false);
                                    setEditingItem(null);
                                    setFormData({});
                                }}
                            >
                                Annuler
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className={styles.adminContainer}>
            <div className={styles.adminCard}>
                <h1 className={styles.title}>Panneau d'Administration</h1>
                <p className={styles.subtitle}>Gérez les utilisateurs, entreprises et offres d'emploi</p>
                
                <div className={styles.tabs}>
                    <button 
                        className={`${styles.tab} ${activeTab === 'users' ? styles.active : ''}`}
                        onClick={() => setActiveTab('users')}
                    >
                        Utilisateurs ({users.length})
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'companies' ? styles.active : ''}`}
                        onClick={() => setActiveTab('companies')}
                    >
                        Entreprises ({companies.length})
                    </button>
                    <button 
                        className={`${styles.tab} ${activeTab === 'offers' ? styles.active : ''}`}
                        onClick={() => setActiveTab('offers')}
                    >
                        Offres ({offers.length})
                    </button>
                </div>
                
                <div className={styles.actions}>
                    <button 
                        className={styles.addBtn}
                        onClick={() => {
                            setEditingItem(null);
                            setFormData({});
                            setShowForm(true);
                        }}
                    >
                        Ajouter {activeTab === 'users' ? 'un utilisateur' : activeTab === 'companies' ? 'une entreprise' : 'une offre'}
                    </button>
                    <button 
                        className={styles.refreshBtn}
                        onClick={loadData}
                    >
                        Actualiser
                    </button>
                </div>
                
                {renderTable()}
                {renderForm()}
            </div>
        </div>
    );
}

export default AdminPanel;
