const { select, arc } = d3;
const svg = select('svg');
const width = +svg.attr('width');
const height = +svg.attr('height');
const g = svg.append('g').attr('transform', `translate(${width / 2},${height / 2})`);

g.append('circle')
  .attr('id', 'face')
  .attr('r', 150)
  .attr('fill', 'rgb(255, 239, 9)');

const appendEye = function(target, side) {
  const hOff = 50;
  const vOff = -40;
  const eyeSize = 15;
  const browHeight = 10;
  const browWidth = 50;
  const browDist = 40;
  target
    .append('circle')
    .attr('r', eyeSize)
    .attr('cx', hOff * side)
    .attr('cy', vOff);

  const browAnchor = target.append('g').attr('transform', `translate(${hOff * side},${vOff})`);

  const brow = browAnchor
    .append('rect')
    .attr('width', browWidth)
    .attr('height', browHeight)
    .attr('x', -browWidth / 2)
    .attr('y', -browDist);

  const moveBrow = () => {
    brow
      .transition()
      .duration(1000)
      .attr('transform', `rotate(${40 * side})`)
      .transition()
      .duration(1000)
      .attr('transform', `rotate(${-40 * side})`)
      .on('end', moveBrow);
  };

  moveBrow();
};

appendEye(g, -1);
appendEye(g, +1);

const mouth = g.append('path').attr(
  'd',
  arc()({
    innerRadius: 100,
    outerRadius: 110,
    startAngle: Math.PI / 2,
    endAngle: Math.PI * 1.5
  })
);
