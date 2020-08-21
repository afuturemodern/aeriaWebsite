import styles from './searchbar.module.css'

export default function Searchbar() {
    return (
        <div className="field has-addons">
            <div className="control">
                <input className="input" type="text" placeholder="enter artist name" />
            </div>
            <div className="control">
                <a className="button"><i className="fas fa-search"></i></a>

            </div>
        </div>
    )
}

