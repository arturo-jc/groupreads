import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { searchBooks } from '../../../actions/bookActions';

const SearchForm = ({ searchBooks }) => {
    const [book, setBook] = useState({ name: "" });
    const { name } = book;

    const onChange = e => {
        setBook({
            ...book,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        searchBooks(book);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="name"></label>
                <input type="text" name="name" id="name" onChange={onChange} value={name} />
                <input type="submit" value="Search" />
            </form>

        </div>
    )
};

SearchForm.propTypes = {
    searchBooks: PropTypes.func.isRequired
};

const addState = connect(null, { searchBooks });
export default addState(SearchForm);