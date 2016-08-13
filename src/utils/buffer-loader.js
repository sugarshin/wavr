export default class BufferLoader {

  constructor(ctx) {
    this.ctx = ctx;
  }

  fetch(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => {
          this.ctx.decodeAudioData(arrayBuffer,
            buffer => resolve(buffer),
            err => reject(err)
          );
        });
    });
  }

}
