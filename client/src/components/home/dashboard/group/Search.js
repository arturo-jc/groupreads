import React from 'react'
import SearchForm from "./search/SearchForm";
import Results from './search/Results';

const Search = () => {

    return (
        <div className='card'>
            <h3>Search books</h3>
            <SearchForm />
            <Results/>
        </div>
    )
};

export default Search;