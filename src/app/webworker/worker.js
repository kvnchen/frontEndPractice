
onmessage = (e) => {
  // console.log('received message from main thread: ', e);
  setTimeout(() => {
    postMessage(e.data * 2);
  }, 2000);
};
