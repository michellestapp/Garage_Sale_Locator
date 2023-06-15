import React from 'react';
import './SearchBar.css'

const SearchBar = ({searchInput, setSearchInput}) => {

    

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }


    return (  
       
        <div className='search-bar'>
         
            <span className='search-template'>Search</span>
            <input data-cy="search-input" type='text' onChange = {handleChange} value={searchInput}/>
            <button className='filter'   onClick={() => setSearchInput('')}>Clear Filter</button>
        
        </div>
    );
}
 
export default SearchBar;