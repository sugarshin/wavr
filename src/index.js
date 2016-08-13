import 'babel-polyfill';
import 'whatwg-fetch';
import loop from 'raf-loop';
import insertStylesheet from 'insert-stylesheet';

import BufferLoader from './utils/buffer-loader';
import Stage from './stage';
import Visualizer from './visualizer';
import ProgressBar from './partials/progress-bar';
import Rhythm from './particles/rhythm';
import Dot from './particles/dot';
import { SOUNDS, PARTICLE_LENGTH } from './constants';

insertStylesheet('//cdnjs.cloudflare.com/ajax/libs/normalize/3.0.3/normalize.min.css');

const canvas = document.createElement('canvas');
canvas.style.verticalAlign = 'top';
document.body.appendChild(canvas);

const AudioContext = global.AudioContext || global.webkitAudioContext;
const audioCtx = new AudioContext();
const bufferLoader = new BufferLoader(audioCtx);

const stage = new Stage(canvas);
const stageCtx = stage.ctx;

const progressBar = new ProgressBar(stageCtx);

const rhythms = Array.from({length: PARTICLE_LENGTH}, (v, k) => k)
  .map(i => new Rhythm(stageCtx, i))
  .reduce((a, b) => { return a.concat(b); }, []);

const dots = Array.from({length: PARTICLE_LENGTH}, (v, k) => k)
  .map(i => new Dot(stageCtx, i))
  .reduce((a, b) => { return a.concat(b); }, []);

stage.intro();

(async () => {
  try {
    const buffer = await bufferLoader.fetch(SOUNDS[0]);
    const visualizer = new Visualizer(audioCtx, buffer);
    const { duration } = buffer;

    loop(() => {
      stage.render();
      progressBar.render(audioCtx.currentTime, duration);
      visualizer.getTimeDomainData().forEach((d, i) => {
        rhythms[i].render(d);
        dots[i].render(d);
      });
    }).start();
  } catch (err) {
    console.log('ERROR:\n', err);
  }
})();
