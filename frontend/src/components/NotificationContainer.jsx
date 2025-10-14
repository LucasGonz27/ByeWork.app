import Notification from './Notification';

const NotificationContainer = ({ notifications, onRemove }) => {
    return (
        <>
            {notifications.map(notification => (
                <Notification
                    key={notification.id}
                    message={notification.message}
                    type={notification.type}
                    duration={notification.duration}
                    onClose={() => onRemove(notification.id)}
                />
            ))}
        </>
    );
};

export default NotificationContainer;
