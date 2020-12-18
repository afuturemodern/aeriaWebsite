import { useState } from 'react';
import * as d3 from 'd3';
import { entries, text, zoomTransform } from 'd3';

export default class D3Display {
  containerEl;
  props;
  svg;

  constructor(containerEl, props) {
    this.containerEl = containerEl;
    this.props = props;
    const { width, height, backgroundColor} = props;

    
    this.svg = d3
    .select(containerEl)
    .append('svg')
    .style('background-color', backgroundColor)
    .attr('id', 'd3Canvas')
    .attr('width', width + 20 + 20)
    .attr('height', height + 20 + 20)
    .attr('class', 'radar' + containerEl);
    this.updateDatapoints();
  }
  

  updateDatapoints = () => {
    //deconstructs variable
    const {
      svg,
      props: { data, width, height, textColor, lineColor},
    } = this;
    const keysToString = {
      8: 'c',
      3: 'c#',
      10: 'd',
      5: 'd#',
      0: 'e',
      7: 'f',
      2: 'f#',
      9: 'g',
      4: 'g#',
      11: 'a',
      6: 'a#',
      1: 'b',
    };

    const apiNotesToWheelNotes = {
      0: 8,
      1: 3,
      2: 10,
      3: 5,
      4: 0,
      5: 7,
      6: 2,
      7: 9,
      8: 4,
      9: 11,
      10: 6,
      11: 1,
    };
    let transform;
    const zoomBehavior = d3.zoom()
      .scaleExtent([1,5])
      .translateExtent([[0,0],[width, height]])
      .on('zoom', () => {
        console.log('zoomed')
        const zoomState = zoomTransform(svg.node())
        //set current zoom state
        console.log('zoomState -->', zoomState)
        transform = d3.event.transform;
        console.log('transform', transform);
        // svg.attr('transform', transform.toString());
        
      });
    svg.call(zoomBehavior);
    //EVENT HANDLER FOR CHECKBOX
    d3.select("#checkBox").on('change', modeChange) 

    console.log('data pulled into d3 from graph ->', data);
    let radius = 200;
    let maxValue = 200;
    // let maxValue = Math.max(0, d3.max(data, (i) => d3.max(i.map(o => o.value))))
    // All songs/rows by key
    let allAxis = data.map((i, j) => i['key']);
    console.log('allaxis -->', allAxis);
    const removeDuplicates = (inputArr) => {
      let uniqueVals = {};
      return inputArr.filter((el) => {
        return uniqueVals.hasOwnProperty(el) ? false : (uniqueVals[el] = true);
      });
    };
    //select tempos
    let allTempos = data.map((i, j) => i['tempo']);

    // numRange creates 0-11 range of notes from data
    let numRange = Object.keys(removeDuplicates(allAxis));
    let total = numRange.length;
    // let radius = Math.min(width / 2, height / 2)
    let angleSlice = (Math.PI * 2) / total;
    //scale for radius and tempo
    let rScale = d3.scaleLinear().range([0, radius]).domain([0, maxValue]);

    //mode range will always be constant
    // g creates the area to draw on
    let g = svg
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`)
      // .attr('transform', "translate(" + transform + ")" + " scale(" + transform + ")");
    

    //circular grid
    let axisGrid = g.append('g').attr('class', 'axisWrapper');
    axisGrid
      .selectAll('.levels')
      .data(d3.range(1, 5).reverse())
      .join('circle')
      .attr('class', 'gridCircle')
      .attr('r', (d, i) => (radius / 4) * d)
      .style('fill', '#CDCDCD')
      .style('stroke', '#CDCDCD')
      .style('fill-opacity', 0.1);

    //text indicating bpm
    axisGrid
      .selectAll('.axisLabel')
      .data(d3.range(1, 5))
      .join('text')
      .attr('class', 'axisLabel')
      .attr('x', (d) => (d * radius) / 4)
      .attr('y', 4 * Math.sin(angleSlice / 20 - Math.PI / 2))
      .attr('dy', '0.1em')
      .style('font-size', '10px')
      .attr('fill', '#737373')
      .text((d, i) => {
        return (200 * d) / 4 + 'bpm';
      });

    //create key line points from center
    //REMOVE DUPLICATES from DATA pull filter range to be 1[7]
    let axis = axisGrid
      .selectAll('.axis')
      .data(numRange) // [0-11]
      .join('g')
      .attr('class', 'axis');
    // //append the lines
    axis
      .append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr(
        'x2',
        (d, i) =>
          rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        'y2',
        (d, i) =>
          rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .attr('class', 'line')
      .attr('stroke', lineColor)
      .attr('stroke-width', '2px');
    //create key names on each line
    axis
      .append('text')
      .attr('class', 'legend')
      .style('font-size', '11px')
      .style('fill', textColor)
      .attr('text-anchor', 'middle')
      .attr('dy', '0.35em')
      .attr(
        'x',
        (d, i) =>
          rScale(maxValue * 1.25) * Math.cos(angleSlice * i - Math.PI / 2)
      )
      .attr(
        'y',
        (d, i) =>
          rScale(maxValue * 1.25) * Math.sin(angleSlice * i - Math.PI / 2)
      )
      .text((d) => {
        return keysToString[d];
      })
      .call(wrap, 60);

    // need tempo range 0-200 x
    // need song key to be [0-11]
    // songPositions are the dots on the board
   
    function modeChange(){
      let songPositions;
      let newData;
      let circleColor;
      let textColor;

      
      
      //if statements changes mode from minor 0 to major 1
      if (d3.select("#checkBox").property("checked")) {
        newData = data.filter((el, i) => i <= 20 && el.mode === 1)
        circleColor ='#360071'
        textColor = 'black'
        console.log('newData true checked',newData)
      }
      else {
        newData = data.filter((el, i) => i <= 20 && el.mode === 0)
        console.log('newData false',newData)
        circleColor = 'beige'
        textColor = 'white'
      };

      songPositions = g
      .selectAll('.songPositions')
      .data(newData, (d) => d) // currently selecting less than 20 songs in DB and only songs in Major Keys
      .join('g')
      .attr('class', '.songPositions');
      
      songPositions
        .append('circle')
        .attr('class', 'radarCircle')
        .attr('r', 4)
        .attr('cx', function (d, i) {
          console.log('circle position x mode minor, key number -->', d.key);
          console.log('data', d);
          return (
            rScale(d.tempo) *
            Math.cos(angleSlice * apiNotesToWheelNotes[d.key] - Math.PI / 2)
          );
        })
        .attr('cy', function (d, i) {
          return (
            rScale(d.tempo) *
            Math.sin(angleSlice * apiNotesToWheelNotes[d.key] - Math.PI / 2)
          );
        })
        .style('fill', circleColor)
        .style('fill-opacity', 0.8)

        
      //append text label to dots
      songPositions
        .append('text')
        .attr('class', 'songName')
        .style('font-size', '8px')
        .attr('text-anchor', 'right')
        .style('fill', textColor)
        .attr('dy', '1em')
        .attr('dx', '1em')
        .attr('x', function (d, i) {
          return (
            rScale(d.tempo) *
            Math.cos(angleSlice * apiNotesToWheelNotes[d.key] - Math.PI / 2)
          );
        })
        .attr('y', function (d, i) {
          return (
            rScale(d.tempo) *
            Math.sin(angleSlice * apiNotesToWheelNotes[d.key] - Math.PI / 2)
          );
        })
        .text((d) => `${d.name} - ${d.artists}`)
        .call(wrap, 60);
        console.log('songpostitoons properties -->', d3.select('.songName').property('style'))
    }
    modeChange()
  };

  setActiveDatapoint = (d, node) => {
    d3.select(node).style('fill', 'yellow');
    this.props.onDatapointClick(d);
  };

  resize = (width, height) => {
    const { svg } = this;
    svg.attr('width', width).attr('height', height);
    svg
      .selectAll('circle')
      .attr('cx', () => 0.3 * width)
      .attr('cy', () => 0.1 * height);
  };
}

function wrap(text, width) {
  text.each(function () {
    var text = d3.select(this),
      words = text.text().split(/\s+/).reverse(),
      word,
      line = [],
      lineNumber = 0,
      lineHeight = 1.4, // ems
      x = text.attr('x'),
      y = text.attr('y'),
      dy = parseFloat(text.attr('dy')),
      tspan = text
        .text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('dy', dy + 'em');

    while ((word = words.pop())) {
      line.push(word);
      tspan.text(line.join(' '));
      console.log('lineNumber');
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];
        tspan = text
          .append('tspan')
          .attr('x', x)
          .attr('y', y)
          .attr('dy', ++lineNumber * lineHeight + dy + 'em')
          .text(word);
      }
    }
  });
} //wrap
