import notificationSound from '../TimerDone.mp3';

export const sendNotification = (inWorkPhase) => {
    const chime = new Audio(notificationSound);

    navigator.permissions.query({name:'notifications'}).then(function(permissionStatus) {
        if (permissionStatus.state === 'granted') {
            if (!inWorkPhase) {
                new Notification("Let's work!");
            } else {
                new Notification("Break time?");
            }
        }
    });

    chime.play();
};