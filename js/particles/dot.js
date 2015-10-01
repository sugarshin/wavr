import { getWindowSize } from '../utils/util';

export default class Dot {

  constructor(ctx, index) {
    this.ctx = ctx;
    this.index = index;
    this.setSize();
    this.events();
  }

  render(index) {
    const x = index * this.index % this.width;
    const y = this.index;
    this.ctx.beginPath();
    this.ctx.fillStyle = '#aaa';
    this.ctx.arc(x, y, 1, 0, Math.PI * 2, true);
    this.ctx.fill();
  }

  events() {
    window.addEventListener('resize', () => {
      this.setSize();
    });
  }

  setSize() {
    const { width, height } = getWindowSize();
    this.width = width;
    this.height = height;
  }

}
