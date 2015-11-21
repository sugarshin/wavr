import { getWindowSize, getRandomInt } from '../utils';
import { PARTICLE_LENGTH } from '../constants';

export default class Rhythm {

  constructor(ctx, index) {
    this.ctx = ctx;
    this.index = index;
    this.velocity = 3;
    this.length = PARTICLE_LENGTH;
    this.color = {
      r: getRandomInt(255),
      g: getRandomInt(255),
      b: getRandomInt(255)
    };
    this.radius = getRandomInt(40);
    this.alpha = 0;
    this.setSize();
    this.events();
  }

  render(y) {
    this.x = this.width / this.length * this.index | 0;
    this.y = y * this.velocity + this.height / 2 - 128 * this.velocity;
    this.alpha += getRandomInt(10) / 10;
    if (this.alpha > 1) {
      this.alpha = 0;
    }
    this.ctx.beginPath();
    this.ctx.fillStyle = this.gradient();
    this.ctx.arc(this.x, this.y, this.radius, Math.PI * 2, false);
    this.ctx.fill();
  }

  events() {
    window.addEventListener('resize', this.setSize.bind(this));
  }

  setSize() {
    const { width, height } = getWindowSize();
    this.width = width;
    this.height = height;
  }

  gradient() {
    const { ctx, x, y, radius, color, alpha } = this;
    const radialGradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
    const rgb = `${color.r}, ${color.g}, ${color.b}`;
    radialGradient.addColorStop(0, `rgba(${rgb}, ${alpha})`);
    radialGradient.addColorStop(.5, `rgba(${rgb}, ${alpha * .2})`);
    radialGradient.addColorStop(1, `rgba(${rgb}, 0)`);
    return radialGradient;
  }

}
