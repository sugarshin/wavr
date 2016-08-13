import { getWindowSize } from './utils';

export default class Stage {

  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.setSize();
    this.events();
  }

  events() {
    window.addEventListener('resize', this.setSize.bind(this));
  }

  intro() {
    const { width, height } = getWindowSize();
    const x = width / 2;
    const y = height / 2;
    this.render();
    this.ctx.font = '18px "Helvetica"';
    this.ctx.textAlign = 'center';
    this.ctx.fillStyle = '#fff';
    this.ctx.fillText('WAVr', x, y);
  }

  setSize() {
    const { width, height } = getWindowSize();
    this.width = this.canvas.width = width;
    this.height = this.canvas.height = height;
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.style();
  }

  style() {
    this.ctx.globalCompositeOperation = 'source-over';
    this.ctx.fillStyle = '#323b43';
    this.ctx.fillRect(0, 0, this.width, this.height);
    this.ctx.globalCompositeOperation = 'lighter';
  }

}
