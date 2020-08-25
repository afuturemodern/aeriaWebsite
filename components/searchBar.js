import styles from './searchbar.module.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function Searchbar() {
    return (
        <div>

            <div className="field has-addons">
                <div className="control">
                    <input className="input" data-testid="searchInput" type="text" placeholder="enter artist name" />
                </div>
                <div className="control ">

                    <div className="button">
                        <FontAwesomeIcon icon={faSearch} />

                    </div>

                </div>
            </div>
        </div>
    )
}

