import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

const BubbleChart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 800;
    const height = 500;
    const margin = { top: 20, right: 30, bottom: 60, left: 60 };

    const x = d3.scaleBand()
      .domain(Array.from(new Set(data.map(d => d.region))))
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]).nice()
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    const bubbleSize = d3.scaleSqrt()
      .domain([0, d3.max(data, d => d.likelihood)])
      .range([0, 40]);

    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0))
      .selectAll('text')
      .style('text-anchor', 'middle');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y));

    svg.append('g')
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      .attr('cx', d => x(d.Region) + x.bandwidth() / 2)
      .attr('cy', d => y(d.Intensity))
      .attr('r', d => bubbleSize(d.Likelihood))
      .attr('fill', d => color(d.Topic))
      .attr('stroke', 'white')
      .attr('stroke-width', '1px')
      .append('title')
      .text(d => `Region: ${d.Region}, Intensity: ${d.Intensity}, Likelihood: ${d.Likelihood}`);

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
      .text('Intensity')
      .attr('class', 'text-gray-700 text-lg font-semibold');

  }, [data]);

  return <svg ref={ref} className="w-full h-96"></svg>;
};

export default BubbleChart;
