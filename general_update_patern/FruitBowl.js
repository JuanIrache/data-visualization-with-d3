const { select, scaleOrdinal } = d3;

const color = scaleOrdinal()
  .domain(['lemon', 'apple'])
  .range(['#fbc531', '#c23616']);
const radius = scaleOrdinal()
  .domain(['lemon', 'apple'])
  .range([15, 30]);

const rectSize = { w: 395, h: 80 };

export default (selection, { height, width, fruits, selected, changeType, removeOne, selectOne }) => {
  selection
    .selectAll('rect')
    .data([null])
    .enter()
    .append('rect')
    .attr('width', rectSize.w)
    .attr('height', rectSize.h)
    .attr('y', height / 2 - rectSize.h / 2)
    .attr('x', width / 2 - rectSize.w / 2)
    .attr('rx', rectSize.h / 2);

  const translateX = (d, i) => `translate(${width / 2 - rectSize.w / 2 + 60 + i * 70},${height / 2})`;

  const groups = selection.selectAll('g').data(fruits, d => d.id);

  const groupsEnter = groups.enter().append('g');

  groupsEnter
    .attr('transform', translateX)
    .merge(groups)
    .transition()
    .duration(600)
    .attr('transform', translateX);

  const groupsExit = groups.exit();

  groupsExit
    .transition()
    .duration(600)
    .remove();

  const activeCircles = groupsEnter.append('circle').merge(groups.select('circle'));

  activeCircles
    .attr('stroke', d => (d.id === selected ? 'white' : 'none'))
    .transition()
    .duration(600)
    .attr('r', d => radius(d.type))
    .attr('fill', d => color(d.type));

  activeCircles
    .on('mouseover', d => selectOne(d.id))
    .on('mouseout', d => selectOne(null))
    .on('click', d => removeOne(d.id));

  groupsExit
    .select('circle')
    .transition()
    .duration(600)
    .attr('r', 0);

  groupsEnter
    .append('text')
    .merge(groups.select('text'))
    .text(d => d.type)
    .attr('y', 55)
    .on('click', d => changeType(d.id));

  groupsExit
    .select('text')
    .transition()
    .duration(600)
    .style('opacity', 0);
};
