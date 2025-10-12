import styles from './Login.module.css';



function Login() {
    return (
        <div>
            <h1>Se connecter</h1>
            <form>
                <div className={styles.group}>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder="Email" />
                </div>
                <div className={styles.group}>
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" placeholder="Mot de passe" />
                </div>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default Login;
