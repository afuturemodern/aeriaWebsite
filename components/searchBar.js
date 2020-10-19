import styles from './searchbar.module.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Searchbar({ placeholder }) {
  return (
    <div>
      <div className="field has-addons">
        <div className="control">
          <input
            className="input"
            data-testid="searchInput"
            type="text"
            placeholder={placeholder}
          />
        </div>
        <div className="control ">
          <button className="button">
            {/* <FontAwesomeIcon icon={faSearch} /> */}S
          </button>
        </div>
      </div>
    </div>
  );
}
