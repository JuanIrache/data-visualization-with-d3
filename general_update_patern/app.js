const { select, scaleOrdinal } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
import FruitBowl from './FruitBowl.js';

let fruits = Array.from('x'.repeat(5)).map(e => ({ type: 'apple', id: Math.random() }));
fruits[2].type = 'lemon';

const render = () => {
  FruitBowl(svg, { fruits, height });
};

render();

window.setTimeout(() => {
  fruits[3].type = 'lemon';
  render();
}, 3000);

window.setTimeout(() => {
  fruits = fruits.filter((d, i) => i != 1);
  render();
}, 6000);
