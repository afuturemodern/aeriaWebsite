import React, { useState, useEffect, useRef } from 'react';
import { useQuery, gql } from '@apollo/client';

import axios from 'axios'
import styles from './graph.module.css';
import D3Component from '../lib/d3display';

let vis;



export default function Graph(props) {

    const songsQuery = gql`
    query allSongs{
        songs{
            name
            artists
            key
            mode
            tempo
            releaseYear
        }
    }`

    const [graphData, setGraphData] = useState(null);
    const [width, setWidth] = useState(600);
    const [height, setHeight] = useState(600);
    const [active, setActive] = useState(false);
    const [keySig, setKeySig] = useState('Minor');
    const [bgColor, setBgColor] = useState('#360071');
    const [textColor, setTextColor] = useState('beige');
    const [lineColor, setLineColor] = useState('beige');
    const [zoomState, setCurrentZoomState] = useState();
    
    const { data } = useQuery(songsQuery);
    console.log('wayyy before data -->', data)
    
    
    
    const refElement = useRef(null);
    console.log('props -->', props)
    // useEffect(fetchData, []);
    useEffect(handleResizeEvent, []);
    useEffect(initVis, [data, active]);
    // useEffect(initVis, [active]);
    useEffect(updateVisOnResize, [width, height]);

    function majorOrMinor() {
      if (active === false) {
          setBgColor('beige') 
          setActive(true)
          setKeySig('Major')
          setTextColor('black')
          setLineColor('beige')
          
        }
      else {
          setBgColor('#360071') ;
          setActive(false);
          setKeySig('Minor');
          setTextColor('beige')
          setLineColor('#360071')
        } 
    }

    // setGraphData(data)
    // function fetchData() {
        // const runFetch = async () => {
        //     try {
        //         const results = await axios('http://localhost:3000/api/database')
        //         await setGraphData(results.data) //an array of objects
        //     } catch (error) {
        //         return { error }
        //     }
        // }
        
        // if (!data) console.log('no data')
        // console.log('data -->', data)
        // setGraphData(data)
        
        // runFetch()
        // Promise.resolve().then(() => setData(['a', 'b', 'c', 'd', 'e']));
    // }

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
        
        if (data && data.songs.length) {
            const d3Props = {
                data: data.songs,
                width,
                height,
                textColor,
                backgroundColor: bgColor,
                lineColor,
                // currentZoomState,
                onDatapointClick: setActive
            };
            console.log('vis data d3 props -->', d3Props.data)
            vis = new D3Component(refElement.current, d3Props);
        }
        else console.log('no data')
    }

    function updateVisOnResize() {
        vis && vis.resize(width, height);
    }

    

    return (
        <div className='react-world'>
            {/* <div>{keySig}</div> */}
            <input type="checkbox" className={styles.checkBox} id="checkBox" name="major/minor" value="major/minor" checked={active} onChange={majorOrMinor}></input>
            <div id="d3Graph" key={new Date().getTime()} ref={refElement} />
        </div>
    );
}