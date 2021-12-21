import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { search } from '../../../../../actions/searchActions';

const SearchForm = ({ search }) => {
    const [query, setQuery] = useState({ text: "" });

    const onChange = e => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        search(query);
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
    search: PropTypes.func.isRequired
};

const addState = connect(null, { search });
export default addState(SearchForm);