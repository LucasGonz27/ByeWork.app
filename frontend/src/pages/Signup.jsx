import {useState} from 'react';
import {Link} from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../assets/LogoByeWork.png';
import {FiMail, FiLock, FiEye, FiEyeOff, FiUser} from 'react-icons/fi';

function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        prenom: '',
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logique d'inscription ici
        console.log('Inscription:', formData);
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
                            >
                                {showPassword ? <FiEyeOff/> : <FiEye/>}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        S’inscrire
                    </button>

                    <div className={styles.signupSection}>
                        <p className={styles.signupText}>
                            Déjà un compte ?{' '}
                            <Link to="/Login" className={styles.signupLink}>
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
