const { select, scaleLinear, csv, max, scaleBand, axisLeft, axisBottom } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  data = data.map(datum => ({ ...datum, population: +datum.population * 1000 }));
  const xVal = d => d.population;
  const yVal = d => d.country;

  const margin = { top: 20, bottom: 20, left: 90, right: 50 };

  const g = svg.append('g').attr(
    'transform',
    `translate(${margin.left},${margin.top}) \
      scale(${(width - margin.left - margin.right) / width},\
      ${(height - margin.top - margin.bottom) / height})`
  );

  const xScale = scaleLinear()
    .domain([0, max(data, xVal)])
    .range([0, width]);

  const yScale = scaleBand()
    .domain(data.map(yVal))
    .range([0, height])
    .padding(0.05);

  g.append('g').call(axisLeft(yScale));
  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(axisBottom(xScale));

  g.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('y', d => yScale(yVal(d)))
    .attr('width', d => xScale(xVal(d)))
    .attr('height', yScale.bandwidth());
};

csv('./data.csv').then(render);
