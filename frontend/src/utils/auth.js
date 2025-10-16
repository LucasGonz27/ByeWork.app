// Utilitaires pour la gestion de l'authentification

export const isLoggedIn = () => {
    return localStorage.getItem('isLoggedIn') === 'true';
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

export const getCurrentUserRole = () => {
    const user = getCurrentUser();
    return user && user.role ? user.role : localStorage.getItem('role');
};

export const logout = async () => {
    try {
        // Appeler l'API de déconnexion pour supprimer le cookie côté serveur
        await fetch('http://localhost:5000/ApiByeWork/utilisateurs/logout', {
            method: 'POST',
            credentials: 'include'
        });
    } catch (error) {
        console.error('Erreur lors de la déconnexion:', error);
    } finally {
        // Nettoyer le localStorage côté client
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('role');
        // Ne pas faire de redirection ici, laisser le composant Header gérer
    }
};

export const setUser = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
    if (userData && userData.role) {
        localStorage.setItem('role', userData.role);
    }
};

// Vérifier la session côté serveur
export const verifySession = async () => {
    try {
        const response = await fetch('http://localhost:5000/ApiByeWork/utilisateurs/verify-session', {
            method: 'GET',
            credentials: 'include'
        });
        
        const data = await response.json();
        
        if (data.success) {
            setUser(data.data);
            return true;
        } else {
            // Session invalide, nettoyer le localStorage
            localStorage.removeItem('user');
            localStorage.removeItem('isLoggedIn');
            return false;
        }
    } catch (error) {
        console.error('Erreur lors de la vérification de session:', error);
        return false;
    }
};
