import { useState, useCallback } from 'react';

export const useNotification = () => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'success', duration = 3000) => {
        const id = Date.now() + Math.random();
        const notification = { id, message, type, duration };
        
        setNotifications(prev => [...prev, notification]);
        
        return id;
    }, []);

    const removeNotification = useCallback((id) => {
        setNotifications(prev => prev.filter(notification => notification.id !== id));
    }, []);

    const showSuccess = useCallback((message, duration = 3000) => {
        return addNotification(message, 'success', duration);
    }, [addNotification]);

    const showError = useCallback((message, duration = 4000) => {
        return addNotification(message, 'error', duration);
    }, [addNotification]);

    return {
        notifications,
        addNotification,
        removeNotification,
        showSuccess,
        showError
    };
};
