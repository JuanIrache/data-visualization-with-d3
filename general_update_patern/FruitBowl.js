const { select, scaleOrdinal } = d3;

const color = scaleOrdinal()
  .domain(['lemon', 'apple'])
  .range(['#fbc531', '#c23616']);
const radius = scaleOrdinal()
  .domain(['lemon', 'apple'])
  .range([15, 30]);

export default (selection, { fruits, height }) => {
  const groups = selection.selectAll('g').data(fruits);
  const groupsEnter = groups.enter().append('g');
  groupsEnter.merge(groups).attr('transform', (d, i) => `translate(${60 + i * 90},${height / 2})`);
  groups.exit().remove();
  groupsEnter
    .append('circle')
    .merge(groups.select('circle'))
    .attr('r', d => radius(d.type))
    .attr('fill', d => color(d.type));
};
