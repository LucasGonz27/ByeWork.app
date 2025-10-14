import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Login.module.css';
import Logo from '../assets/LogoByeWork.png';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
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
        // Logique de connexion ici
        console.log('Connexion:', formData);
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
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxLabel}>Se souvenir de moi</span>
                        </label>
                        <Link to="#" className={styles.forgotPassword}>
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    <button type="submit" className={styles.submitButton}>
                        Se connecter
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
