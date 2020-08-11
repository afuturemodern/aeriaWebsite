import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios'
import Layout, { siteTitle } from '../components/layout';
import SearchBar from '../components/searchBar';

import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}


export default function Home({ allPostsData }) {

  const [songs, setSongs] = useState(null)
  let display;
  useEffect(() => {
    (async () => {
      try {
        const results = await axios('http://localhost:3000/api/database')
        setSongs(results.data)
      }
      catch (error) {
        console.log(error)
      }
    })()
  }, []);

  //if songs is null, display loading message, else display search songs
  display = !songs ? 'loading song..' : Object.keys(songs).map((song, i) => {
    if (i < 10) {
      return (
        <div key={`index-${i}`} >
          <div className="card">
            <div className="card-content">
              <div>Artist: {songs[i].artist}</div>
              <div>Song: {songs[i].song}</div>
              <div>Tempo: {songs[i].tempo}</div>
            </div>
          </div>
          <br />
        </div >
      )
    }
  })
  return (
    <Layout home>
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1" /> */}
        <title>{siteTitle}</title>
        {/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.5.5/dist/css/uikit.min.css" /> */}
      </Head>
      <div className="appLayout">

        <section className="section" >
          <div className="columns">
            <div className="column is-one-fifth">
              <h1 className="title">Find Artist</h1>
              <SearchBar></SearchBar>
            </div>
            <div className="column" id="graphDisplay">
              <h1 className="title">Graph</h1>
              {display}
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Aeria</strong> by <a href="#">FutureModern</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
          </div>
        </footer>
      </div>
    </Layout>
  )
}