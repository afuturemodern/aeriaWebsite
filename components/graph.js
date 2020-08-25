import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'

import D3Component from '../lib/d3display';

let vis;

export default function ReactComponent() {
    const [data, setData] = useState(null);
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(600);
    const [active, setActive] = useState(null);
    const refElement = useRef(null);

    useEffect(fetchData, []);
    useEffect(handleResizeEvent, []);
    useEffect(initVis, [data]);
    useEffect(updateVisOnResize, [width, height]);

    function fetchData() {
        const runFetch = async () => {
            try {
                const results = await axios('http://localhost:3000/api/database')
                await setData(results.data) //an array of objects
            } catch (error) {
                return { error }
            }
        }
        runFetch()
        // Promise.resolve().then(() => setData(['a', 'b', 'c', 'd', 'e']));
    }

    function handleResizeEvent() {
        let resizeTimer;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                setWidth(width);
                setHeight(height);
            }, 300);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }

    function initVis() {
        if (data && data.length) {
            const d3Props = {
                data,
                width,
                height,
                onDatapointClick: setActive
            };
            console.log(d3Props)
            vis = new D3Component(refElement.current, d3Props);
        }
    }

    function updateVisOnResize() {
        vis && vis.resize(width, height);
    }

    return (
        <div className='react-world'>
            {/* <div>{active}</div> */}
            <div ref={refElement} />
        </div>
    );
}