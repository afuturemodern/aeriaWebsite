import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios'

// library.add(fab, faSearch)

import Layout, { siteTitle } from '../components/layout';
import SearchBar from '../components/searchBar';
import Graph from '../components/graph'

import utilStyles from '../styles/utils.module.css'
import { getSortedPostsData } from '../lib/posts'

export async function getStaticProps() {
  try {
    const allPostsData = getSortedPostsData()
    const results = await axios('http://localhost:3000/api/database')
    return {
      props: {
        results: results.data
      }
    }
  } catch (error) {
    return { error }
  }
}

export default function Home({ results }) {

  const display = !results ? 'loading song..' : Object.keys(results).map((song, i) => {
    return (
      <div key={`index-${i}`} >
        <div className="card">
          <div className="card-content">
            <div>Artist: {results[i].artists}</div>
            <div>Song: {results[i].name}</div>
            <div>Tempo: {results[i].tempo}</div>
          </div>
        </div>
        <br />
      </div >
    )

  })
  return (
    <Layout home>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/_next/static/style.css" />
        <title>{siteTitle}</title>
      </Head>
      <div className="appLayout">

        <section className="section" >
          <div className="columns">
            <div className="column is-one-fifth" id="bgColumn">
              <h1 className="title">Find Artist</h1>
              <SearchBar></SearchBar>
            </div>
            <div className="column" >
              <h1 className="title">Graph</h1>
              <div id="graphDisplay">
                {/* <Graph></Graph> */}
                {display}
              </div>
              <div>{() => console.log(results)}</div>
            </div>
          </div>
        </section>
        <footer className="footer">
          <div className="content has-text-centered">
            <p>
              <strong>Aeria</strong> by <a href="#">FutureModern</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
          </div>
        </footer>
      </div>
    </Layout>
  )
}