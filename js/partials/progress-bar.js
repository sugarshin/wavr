import { getWindowSize } from '../utils/util';

export default class ProgressBar {

  constructor(ctx) {
    this.ctx = ctx;
  }

  render(current, total) {
    const { width } = getWindowSize();
    const rate = current / total;
    const x = width * rate | 0;
    this.ctx.beginPath();
    this.ctx.lineWidth = 8;
    this.ctx.strokeStyle = '#fff';
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(x, 0);
    this.ctx.stroke();
  }

}
