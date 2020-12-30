import styles from './searchbar.module.css';

import { useState } from 'react'
import { connect } from 'react-redux'
import { setInfo } from '../redux/actions/main.js'
import { useQuery, gql } from '@apollo/client';
import axios from 'axios';

const myQuery = gql`
query allSongs{
    songs{
        name
        artists
        key
        mode
        tempo
        releaseYear
    }
}
`

function Searchbar({ placeholder }) {
  
  const [searchQuery, setSearchQuery] = useState('')
  const onChange = (e) => {
    console.log('on change e --> ', e);
    e.preventDefault();
    setSearchQuery(e.target.value);
  }
  
  const  onClick = async (e) => {
    e.preventDefault();
    //on click post request info from query
    const results = await axios.post("http://localhost:3000/api/search", {
      headers: { "q": searchQuery }
    })
    console.log('results', results)
    
  }

  const { loading, error, data } = useQuery(myQuery);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log('searchbar data -->', data.songs)
  
  return (
    <div>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            data-testid="searchInput"
            type="text"
            placeholder={placeholder}
            onChange={onChange}
            value={searchQuery} 
          />
        </div>
        <div className="control ">
          <button className="button" onClick={onClick}>
            {/* <FontAwesomeIcon icon={faSearch} /> */}S
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => ({
  userInfo: state.main,
})

const mapDispatchToProps = ({
  setInfo
})

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar)