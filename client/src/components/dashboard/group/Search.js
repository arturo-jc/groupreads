import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SearchForm from "./search/SearchForm";
import Book from "./search/Book"

const Search = ({ bookState }) => {
    const { books, loading } = bookState;

    return (
        <div>
            <h1>Search books</h1>
            <SearchForm />
            {loading && (<p>Loading...</p>)}
            {!loading && books ?
                (books.map(book => <Book key={book.id} book={book} />))
                :
                (<p>No books found</p>)}
        </div>
    )
};

Search.propTypes = {
    bookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    bookState: state.book
})

const addState = connect(mapStateToProps);

export default addState(Search);