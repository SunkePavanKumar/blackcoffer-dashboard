import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data }) => {
  data = data.filter(d => d.sector !== "");
  const ref = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    const tooltip = d3.select(tooltipRef.current);

    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;
    const radius = Math.min(width, height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const pie = d3.pie()
      .value(d => d[1]);

    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    const groupedData = Array.from(d3.rollup(data, v => d3.sum(v, d => d.intensity), d => d.sector));

    const g = svg.append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    // Create pie chart segments
    g.selectAll('.arc')
      .data(pie(groupedData))
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data[0]))
      .attr('stroke', 'white')
      .attr('stroke-width', '2px')
      .on('mouseover', function(event, d) {
        const [name, value] = d.data;
        const percentage = ((value / d3.sum(groupedData, d => d[1])) * 100).toFixed(2);
        tooltip.html(`${name}: ${percentage}%`)
          .style('visibility', 'visible')
          .style('background', color(name))
          .style('color', 'white');
      })
      .on('mousemove', function(event) {
        tooltip.style('top', `${event.pageY + 10}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', function() {
        tooltip.style('visibility', 'hidden');
      });

  }, [data]);

  return (
    <>
      <svg ref={ref} width="600" height="400"></svg>
      <div
        ref={tooltipRef}
        style={{
          position: 'absolute',
          padding: '5px',
          border: '1px solid black',
          borderRadius: '3px',
          visibility: 'hidden',
          fontSize: '12px'
        }}
      ></div>
    </>
  );
};

export default PieChart;
