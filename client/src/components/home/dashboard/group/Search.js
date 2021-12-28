import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SearchForm from "./search/SearchForm";
import Result from "./search/Result"

const Search = ({ searchState }) => {
    const { results, loading } = searchState;

    return (
        <div className='card'>
            <h3>Search books</h3>
            <SearchForm />
            {loading && (<p>Loading...</p>)}
            {!loading && results ?
                (
                    <div className='books'>
                    {results.map(result => <Result key={result.id} result={result} />)}
                    </div>
                    )
                :
                (<p>No books found</p>)}
        </div>
    )
};

Search.propTypes = {
    searchState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    searchState: state.search
})

const addState = connect(mapStateToProps);

export default addState(Search);