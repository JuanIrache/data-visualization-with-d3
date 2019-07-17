const { select, scaleOrdinal } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
import FruitBowl from './FruitBowl.js';

let fruits = Array.from('x'.repeat(5)).map(e => ({ type: 'apple', id: Math.random() }));
let selected = null;

const changeType = id => {
  fruits = fruits.map(d => (d.id === id ? { ...d, type: d.type === 'lemon' ? 'apple' : 'lemon' } : d));
  render();
};

const removeOne = id => {
  fruits = fruits.filter(d => d.id !== id);
  render();
};

const selectOne = id => {
  selected = id;
  render();
};

const render = () => {
  FruitBowl(svg, { height, width, fruits, selected, changeType, removeOne, selectOne });
};

render();
