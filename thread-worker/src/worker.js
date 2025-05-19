import { parentPort } from "worker_threads";
console.log("Worker started");
parentPort.on('message', (message) => {
  console.log(`Received message from main thread: ${message}`);
  parentPort.postMessage('Hello, main thread!');
});

parentPort.postMessage('Hello, main thread!');