import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SearchForm from "./search/SearchForm";
import Result from "./search/Result"

const Search = ({ searchState }) => {
    const { results, loading } = searchState;

    return (
        <div>
            <h1>Search books</h1>
            <SearchForm />
            {loading && (<p>Loading...</p>)}
            {!loading && results ?
                (results.map(result => <Result key={result.id} result={result} />))
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