import React from 'react';
import './SearchBar.css'
import 'bootstrap/dist/css/bootstrap.min.css';


const SearchBar = ({searchInput, setSearchInput}) => {

    

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }


    return (  
       
        <div className='search-bar'>
         
            <span className='search-template'>Search</span>
            <input className="search-input" type='text' onChange = {handleChange} value={searchInput}/>
            <button className='btn'   onClick={() => setSearchInput('')}>Reset</button>
        
        </div>
    );
}
 
export default SearchBar;