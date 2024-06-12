// myWorker.ts
self.addEventListener('message', (event: MessageEvent) => {
    const limit = event.data;
    let sum = 0;
    for (let i = 1; i <= limit; i++) {
        sum += i;
    }
    self.postMessage(sum);
});
