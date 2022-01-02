import React from 'react'
import SearchForm from "./search/SearchForm";
import Results from './search/Results';

const Search = ({group}) => {

    return (
        <div className='card'>
            {group && <h2>{group.name}</h2>}
            <h3>Search books</h3>
            <SearchForm />
            <Results/>
        </div>
    )
};

export default Search;