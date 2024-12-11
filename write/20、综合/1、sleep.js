function sleep(times = 1000) {
  return new Promise((resolve) => setTimeout(resolve, times));
}

sleep(2000).then(() => {
  console.log("2s");
});
