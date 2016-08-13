export default class Visualizer {

  constructor(ctx, buffer) {
    this.ctx = ctx;
    this.buffer = buffer;
    this.analyser = ctx.createAnalyser();
    this.gainNode = ctx.createGain();
    this.source = ctx.createBufferSource();
    this.timeDomainData = new Uint8Array(this.analyser.frequencyBinCount);
    this.initialize();
  }

  initialize() {
    this.source.buffer = this.buffer;
    this.source.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);
    this.source.start(0);
  }

  getTimeDomainData() {
    this.analyser.getByteTimeDomainData(this.timeDomainData);
    return this.timeDomainData;
  }

}
