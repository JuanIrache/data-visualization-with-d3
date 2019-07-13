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
  const eyeSize = 20;
  const browHeight = 10;
  const browWidth = 40;
  const browDist = 40;
  target
    .append('circle')
    .attr('r', eyeSize)
    .attr('cx', hOff * side)
    .attr('cy', vOff);

  const eye = target
    .append('rect')
    .attr('width', browWidth)
    .attr('height', browHeight);

  const moveEye = () => {
    eye
      .attr('x', hOff * side - browWidth / 2)
      .attr('y', vOff - browDist)
      .transition()
      .duration(1000)
      .attr('y', vOff - browDist - 20)
      .transition()
      .duration(1000)
      .attr('y', vOff - browDist)
      .on('end', moveEye);
  };

  moveEye(eye);
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
