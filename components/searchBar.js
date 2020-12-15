import styles from './searchbar.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react'
import axios from 'axios';

export default function Searchbar({ placeholder }) {
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
