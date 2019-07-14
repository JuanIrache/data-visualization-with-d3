const { select, scaleLinear, csv, max, scaleBand } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  data = data.map(datum => ({ ...datum, population: +datum.population * 1000 }));
  const xVal = d => d.population;
  const yVal = d => d.country;

  const scaleX = input =>
    scaleLinear()
      .domain([0, max(data, xVal)])
      .range([0, width])(xVal(input));

  const scaleY = scaleBand()
    .domain(data.map(yVal))
    .range([0, height]);

  svg
    .selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .style('background-color', 'steelblue')
    .attr('y', d => scaleY(yVal(d)))
    .attr('width', scaleX)
    .attr('height', scaleY.bandwidth());
};

csv('./data.csv').then(render);
