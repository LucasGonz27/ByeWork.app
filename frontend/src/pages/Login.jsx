import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../assets/LogoByeWork.png';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { setUser } from '../utils/auth';
import { useNotificationContext } from '../contexts/NotificationContext';

function Login() {
    const navigate = useNavigate();
    const { showSuccess, showError } = useNotificationContext();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {;
            const response = await fetch('http://localhost:5000/ApiByeWork/utilisateurs/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Important pour les cookies
                body: JSON.stringify({
                    email: formData.email,
                    mdp: formData.password,
                    rememberMe: formData.rememberMe
                })
            });

            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            
            const data = await response.json();
            console.log('Response data:', data);

            if (data.success) {
                // Stocker les informations utilisateur
                setUser(data.data);
                
                // Afficher une notification de succès
                showSuccess(`Bienvenue ${data.data.prenom} ! Connexion réussie.`);
                
                // Rediriger vers la page d'accueil pour tous les utilisateurs
                navigate('/');
            } else {
                setError(data.message || 'Erreur de connexion');
            }
        } catch (error) {
            console.error('Erreur complète:', error);
            console.error('Type d\'erreur:', error.name);
            console.error('Message d\'erreur:', error.message);
            
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                setError('Impossible de se connecter au serveur. Vérifiez que le serveur backend est démarré.');
            } else {
                setError('Erreur de connexion au serveur: ' + error.message);
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
                    <img src={Logo} alt="Logo ByeWork" className={styles.logo} />
                    <h1 className={styles.title}>Connexion</h1>
                    <p className={styles.subtitle}>Connectez-vous à votre compte ByeWork</p>
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    {error && (
                        <div className={styles.errorMessage}>
                            {error}
                        </div>
                    )}
                    
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <div className={styles.inputWrapper}>
                            <FiMail className={styles.inputIcon} />
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
                            <FiLock className={styles.inputIcon} />
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
                            >
                                {showPassword ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </div>

                    <div className={styles.options}>
                        <label className={styles.checkboxWrapper}>
                            <input 
                                type="checkbox" 
                                className={styles.checkbox}
                                name="rememberMe"
                                checked={formData.rememberMe}
                                onChange={handleInputChange}
                            />
                            <span className={styles.checkboxLabel}>Se souvenir de moi</span>
                        </label>
                        <Link to="#" className={styles.forgotPassword}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <button 
                        type="submit" 
                        className={styles.submitButton}
                        disabled={loading}
                    >
                        {loading ? 'Connexion...' : 'Se connecter'}
                    </button>

                    <div className={styles.signupSection}>
                        <p className={styles.signupText}>
                            Pas encore de compte ?{' '}
                            <Link to="/Signup" className={styles.signupLink}>
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
