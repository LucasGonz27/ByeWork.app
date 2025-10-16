import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../assets/LogoByeWork.png';
import {FiMail, FiLock, FiEye, FiEyeOff, FiUser} from 'react-icons/fi';
import { useNotificationContext } from '../contexts/NotificationContext';
import { setUser } from '../utils/auth';

function Signup() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotificationContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isRecruiter, setIsRecruiter] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const [formData, setFormData] = useState({
        prenom: '',
        email: '',
        password: ''
    });

    // Charger la liste des entreprises si recruteur coché
    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                if (isRecruiter) {
                    const url = "http://localhost:5000/ApiByeWork/entreprises";
                    const fetcher = await fetch(url);
                    const json = await fetcher.json();
                    if (json.success) {
                        setCompanies(json.data);
                    }
                }
            } catch (err) {
                console.error('Erreur lors du chargement des entreprises:', err);
                showError('Erreur lors du chargement des entreprises. Veuillez réessayer plus tard.');
            }
        };

        if (isRecruiter) {
            fetchCompanies();
        } else {
            setCompanies([]);
            setSelectedCompany('');
        }
    }, [isRecruiter, showError]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRecruiterChange = (e) => {
        setIsRecruiter(e.target.checked);
        if (!e.target.checked) {
            setSelectedCompany('');
        }
    };

    const handleCompanyChange = (e) => {
        setSelectedCompany(e.target.value);
    };

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!passwordRegex.test(formData.password)) {
            setError("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:5000/ApiByeWork/utilisateurs/newUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    prenom: formData.prenom,
                    nom: '', // Champ vide car non requis
                    email: formData.email,
                    mdp: formData.password,
                    telephone: '', // Champ vide car non requis
                    ville: '', // Champ vide car non requis
                    role: isRecruiter ? 'recruteur' : 'user',
                    idEntreprise: isRecruiter ? selectedCompany : undefined
                })
            });

            const data = await response.json();

            if (data.success) {
                // Se connecter automatiquement avec le nouveau compte
                try {
                    const loginResponse = await fetch('http://localhost:5000/ApiByeWork/utilisateurs/connexion', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include',
                        body: JSON.stringify({
                            email: formData.email,
                            mdp: formData.password,
                            rememberMe: true // Se souvenir automatiquement
                        })
                    });

                    const loginData = await loginResponse.json();

                    if (loginData.success) {
                        setUser(loginData.data);
                        showSuccess(`Compte créé avec succès ! Bienvenue ${formData.prenom} !`);
                        navigate('/');
                    } else {
                        showSuccess(`Compte créé avec succès ! Veuillez vous connecter.`);
                        navigate('/login');
                    }
                } catch (loginError) {
                    showSuccess(`Compte créé avec succès ! Veuillez vous connecter.`);
                    navigate('/login');
                }
            } else {
                setError(data.message || 'Erreur lors de la création du compte');
            }
        } catch (error) {
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setError('Impossible de se connecter au serveur. Vérifiez que le serveur backend est démarré.');
            } else {
                setError('Erreur lors de la création du compte: ' + error.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginCard}>
                <div className={styles.logoSection}>
                    <img src={Logo} alt="Logo ByeWork" className={styles.logo}/>
                    <h1 className={styles.title}>Créer un compte</h1>
                    <p className={styles.subtitle}>Rejoignez la communauté ByeWork</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="prenom" className={styles.label}>
                            Prénom
                        </label>
                        <div className={styles.inputWrapper}>
                            <FiUser className={styles.inputIcon}/>
                            <input
                                type="text"
                                id="prenom"
                                name="prenom"
                                value={formData.prenom}
                                onChange={handleInputChange}
                                placeholder="Votre prénom"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <div className={styles.inputWrapper}>
                            <FiMail className={styles.inputIcon}/>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="votre@email.com"
                                className={styles.input}
                                required
                            />
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>
                            Mot de passe
                        </label>
                        <div className={styles.inputWrapper}>
                            <FiLock className={styles.inputIcon}/>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Votre mot de passe"
                                className={styles.input}
                                required
                            />
                        
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className={styles.eyeButton}
                                tabIndex={-1}
                            >
                                {showPassword ? <FiEyeOff/> : <FiEye/>}
                            </button>
                        </div>
                        <div className={styles.recru}>
                            Je suis un recruteur 
                            <input 
                                type="checkbox" 
                                name="recruteur" 
                                checked={isRecruiter}
                                onChange={handleRecruiterChange}
                            />
                        </div>
                        {isRecruiter && (
                            <div className={styles.inputGroup} style={{marginTop: 10}}>
                                <label htmlFor="entreprise" className={styles.label}>
                                    Sélectionnez votre entreprise
                                </label>
                                <select
                                    id="entreprise"
                                    name="entreprise"
                                    value={selectedCompany}
                                    onChange={handleCompanyChange}
                                    className={styles.input}
                                    required
                                >
                                    <option value="">-- Choisissez une entreprise --</option>
                                    {companies.map((company) => (
                                        <option key={company.idEntreprise} value={company.idEntreprise}>
                                            {company.nom}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading || (isRecruiter && !selectedCompany)}
                    >
                        {loading ? 'Création du compte...' : 'S\'inscrire'}
                    </button>

                    <div className={styles.signupSection}>
                        <p className={styles.signupText}>
                            Déjà un compte ?{' '}
                            <Link to="/login" className={styles.signupLink}>
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Signup;
