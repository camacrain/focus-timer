self.onmessage = function(e) {
    // Received a message from the main thread
    console.log('Message received from main thread', e.data);

    if (e.data === 'start') {
        setInterval(() => {
            self.postMessage('tick');
        }, 1000);
    }
}