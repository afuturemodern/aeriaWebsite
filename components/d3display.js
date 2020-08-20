import { useState } from 'react';
import * as d3 from 'd3';

// export D3Graph = (containerEl, props) => {

// }

export default class D3Display {

    containerEl;
    props;
    svg;

    constructor(containerEl, props) {
        this.containerEl = containerEl;
        this.props = props;
        const { width, height } = props;

        this.svg = d3.select(containerEl)
            .append('svg')
            .style('background-color', 'beige')
            .attr('width', width + 20 + 20)
            .attr('height', height + 20 + 20)
            .attr('class', 'radar' + containerEl)
        this.updateDatapoints();
    }

    updateDatapoints = () => {
        //deconstructs variable
        const { svg, props: { data, width, height } } = this;
        console.log('data pulled into d3 from graph ->', data)
        let radius = 200;
        let maxValue = 200;
        // let maxValue = Math.max(0, d3.max(data, (i) => d3.max(i.map(o => o.value))))
        let allAxis = (data.map((i, j) => i['scale/key'])) // All songs/rows
        console.log('allaxis -->', allAxis)
        const removeDuplicates = (inputArr) => {
            let uniqueVals = {}
            return inputArr.filter((el) => {
                return uniqueVals.hasOwnProperty(el) ? false : (uniqueVals[el] = true)
            })
        }
        // numRange creates 0-11 range of notes from data
        let numRange = Object.keys(removeDuplicates(allAxis));
        let total = numRange.length

        // let radius = Math.min(width / 2, height / 2)
        let angleSlice = Math.PI * 2 / total;
        //scale for radius
        let rScale = d3.scaleLinear()
            .range([0, radius])
            .domain([0, maxValue])

        //mode range will always be constant
        // g creates the area to draw on
        let g = svg.append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`)

        //circular grid
        let axisGrid = g.append('g').attr("class", "axisWrapper")
        axisGrid.selectAll('.levels')
            .data(d3.range(1, 5).reverse())
            .join('circle')
            .attr('class', 'gridCircle')
            .attr("r", (d, i) => (radius / 4) * d)
            .style("fill", "#CDCDCD")
            .style("stroke", "#CDCDCD")
            .style("fill-opacity", 0.1)

        //text indicating bpm
        axisGrid.selectAll('.axisLabel')
            .data(d3.range(1, 5))
            .join('text')
            .attr('class', 'axisLabel')
            .attr('x', (d) => d * radius / 4)
            .attr('y', 4)
            .attr('dy', '0.4em')
            .style('font-size', '10px')
            .attr("fill", "#737373")
            .text((d, i) => { return (200 * d / 4) + 'bpm'; });

        //create key line points from center
        //REMOVE DUPLICATES from DATA pull filter range to be 1[7]
        let axis = axisGrid.selectAll('.axis')
            .data(numRange)
            .join('g')
            .attr('class', 'axis')
        // //append the lines
        axis.append('line')
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', (d, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
            .attr('y2', (d, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
            .attr('class', 'line')
            .attr('stroke', 'black')
            .attr('stroke-width', '2px')
        //create key names on each line
        axis.append('text')
            .attr('class', 'legend')
            .style('fontt-size', '11px')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')

        // svg.selectAll('circle')
        //     .data(data)
        //     .join('circle')
        //     .style('fill', 'red')
        //     .attr('cx', () => Math.random() * width)
        //     .attr('cy', () => Math.random() * height)
        //     .attr('r', 10)
        //     .on('mouseup', (d, i, nodes) => this.setActiveDatapoint(d, nodes[i]));
    }

    setActiveDatapoint = (d, node) => {
        d3.select(node).style('fill', 'yellow');
        this.props.onDatapointClick(d);
    }

    resize = (width, height) => {
        const { svg } = this;
        svg.attr('width', width)
            .attr('height', height);
        svg.selectAll('circle')
            .attr('cx', () => 0.3 * width)
            .attr('cy', () => 0.1 * height);
    }
}
