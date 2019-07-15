const { select, scaleLinear, csv, extent, axisLeft, axisBottom, format } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  const keys = { x: 'weight', y: 'horsepower' };
  const xVal = d => +d[keys.x];
  const yVal = d => +d[keys.y];

  const margin = { top: 45, bottom: 60, left: 80, right: 50 };

  const g = svg.append('g').attr(
    'transform',
    `translate(${margin.left},${margin.top}) \
      scale(${(width - margin.left - margin.right) / width},\
      ${(height - margin.top - margin.bottom) / height})`
  );

  g.append('text')
    .text('scatter plot exercise')
    .attr('class', 'top-title')
    .attr('x', width / 2)
    .attr('y', -15);

  const xScale = scaleLinear()
    .domain(extent(data, xVal))
    .range([0, width])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yVal))
    .range([height, 0])
    .nice();

  const yAxis = axisLeft(yScale)
    .tickSize(-width)
    .tickPadding(15);

  const leftG = g.append('g').call(yAxis);

  leftG.select('.domain').remove();

  leftG
    .append('text')
    .text(keys.y)
    .attr('x', -height / 2)
    .attr('y', -60)
    .attr('transform', 'rotate(-90)')
    .attr('class', 'label');

  const xAxis = axisBottom(xScale)
    .tickFormat(input => format('.3s')(input).replace(/G$/, 'B'))
    .tickSize(-height)
    .tickPadding(15);

  const bottomG = g
    .append('g')
    .attr('transform', `translate(0,${height})`)
    .call(xAxis);

  bottomG.select('.domain').remove();

  bottomG
    .append('text')
    .text(keys.x)
    .attr('class', 'label')
    .attr('x', width / 2)
    .attr('y', +65);

  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 10)
    .attr('cy', d => yScale(yVal(d)))
    .attr('cx', d => xScale(xVal(d)));
};

csv('https://vizhub.com/curran/datasets/auto-mpg.csv').then(render);
