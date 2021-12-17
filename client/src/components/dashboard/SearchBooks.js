import React from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SearchBookForm from "./SearchBookForm";
import Book from "./Book"
import { searchBooks } from '../../actions/bookActions';

const SearchBooks = ({ bookState }) => {
    const { books, loading } = bookState;
    return (
        <div>
            <h1>Search books</h1>
            <SearchBookForm />
            {!loading && books ?
                (books.map(book => <Book key={book.id} book={book} />))
                :
                (<p>No books found</p>)}
        </div>
    )
};

searchBooks.propTypes = {
    bookState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    bookState: state.book
})

const addState = connect(mapStateToProps);

export default addState(SearchBooks);