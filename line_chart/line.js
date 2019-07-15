const { select, scaleLinear, json, extent, axisLeft, axisBottom, line, curveBasis } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');

const render = data => {
  data = data[1].streams.GYRO.samples;
  const vecMag = vec => Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]);
  const keys = { x: 'time (s)', y: 'gyroscope (m/s2)' };
  const xVal = d => (new Date(d.date).getTime() - new Date(data[0].date).getTime()) / 1000;
  // const yVal = d => vecMag(d.value);
  const yVal = d => d.value[0];

  const margin = { top: 45, bottom: 60, left: 80, right: 50 };

  const g = svg.append('g').attr(
    'transform',
    `translate(${margin.left},${margin.top}) \
      scale(${(width - margin.left - margin.right) / width},\
      ${(height - margin.top - margin.bottom) / height})`
  );

  g.append('text')
    .text('gyroscope line chart')
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

  const lineGenerator = line()
    .x(d => xScale(xVal(d)))
    .y(d => yScale(yVal(d)))
    .curve(curveBasis);

  g.append('path').attr('d', lineGenerator(data));

  g.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('r', 0)
    .attr('cy', d => yScale(yVal(d)))
    .attr('cx', d => xScale(xVal(d)));
};

json('./hero5_1_GYRO.json').then(render);
