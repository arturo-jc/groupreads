import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getBooks } from '../../../../actions/bookActions';

const SearchForm = ({ getBooks }) => {
    const [query, setQuery] = useState({ text: "" });

    const onChange = e => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        getBooks(query);
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label htmlFor="text"></label>
                <input type="text" name="text" id="text" onChange={onChange} value={query.text} />
                <input type="submit" value="Search" />
            </form>

        </div>
    )
};

SearchForm.propTypes = {
    getBooks: PropTypes.func.isRequired
};

const addState = connect(null, { getBooks });
export default addState(SearchForm);