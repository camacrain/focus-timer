import notificationSound from '../TimerDone.mp3';

export const sendWorkNotification = () => {
    const chime = new Audio(notificationSound);

    navigator.permissions.query({name:'notifications'}).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            new Notification("Let's work!");
            
        }
    });

    chime.play();
};

export const sendRestNotification = () => {
    const chime = new Audio(notificationSound);

    navigator.permissions.query({name:'notifications'}).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            new Notification("Break time?");
        }
    });

    chime.play();
};