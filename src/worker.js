self.onmessage = function(e) {
    // Upon receipt of a 'start' message, sends a message once a second which is used to increment the timer
    if (e.data === 'start') {
        setInterval(() => {
            self.postMessage('tick');
        }, 1000);
    }
}