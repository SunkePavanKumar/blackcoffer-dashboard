import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const Heatmap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 60, left: 60 };

    // Prepare data
    const regions = Array.from(new Set(data.map(d => d.region)));
    const countries = Array.from(new Set(data.map(d => d.country)));

    const x = d3.scaleBand()
      .domain(regions)
      .range([margin.left, width - margin.right])
      .padding(0.05);

    const y = d3.scaleBand()
      .domain(countries)
      .range([height - margin.bottom, margin.top])
      .padding(0.05);

    const color = d3.scaleSequential(d3.interpolateYlOrRd)
      .domain([0, d3.max(data, d => d.Intensity)]);

    svg.append('g')
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.Region))
      .attr('y', d => y(d.Country))
      .attr('width', x.bandwidth())
      .attr('height', y.bandwidth())
      .attr('fill', d => color(d.Intensity))
      .append('title')
      .text(d => `Intensity: ${d.Intensity}`);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSize(0))
      .selectAll('text')
      .style('text-anchor', 'middle');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickSize(0))
      .selectAll('text')
      .style('text-anchor', 'end');

    // Add axis labels
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height - 5)
      .attr('text-anchor', 'middle')
      .text('Region')
      .attr('class', 'text-gray-700 text-lg font-semibold');

    svg.append('text')
      .attr('x', -height / 2)
      .attr('y', 15)
      .attr('text-anchor', 'middle')
      .attr('transform', 'rotate(-90)')
      .text('Country')
      .attr('class', 'text-gray-700 text-lg font-semibold');

  }, [data]);

  return <svg ref={ref} className="w-full h-96"></svg>;
};

export default Heatmap;
