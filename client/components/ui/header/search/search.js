
export default function SearchBar(props){
    return(
        <div className="search-bar">
            <div className={props.searchBarIcon}>
            </div>
            <input type="text" placeholder="Search for anything" className="search-bar-input" onChange={props.onChange}/>
        
        </div>
    )
}