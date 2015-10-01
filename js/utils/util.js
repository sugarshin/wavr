export function getWindowSize() {
  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
}

export function getRandomInt(max) {
  return max * Math.random() | 0;
}
