import React, { useState } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { search } from '../../../../../actions/searchActions';
import { setAlert } from "../../../../../actions/alertActions";

const SearchForm = ({ search, setAlert }) => {
    const [query, setQuery] = useState({ text: "" });

    const onChange = e => {
        setQuery({
            ...query,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        if ( query.text === "") {
            setAlert("Please enter a search term.", "danger");
        } else{
            search(query);
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <label className='hidden' htmlFor="text">Search books</label>
                <input className='form-input' type="text" name="text" id="text" onChange={onChange} value={query.text} placeholder='Enter title or author...'/>
                <input className='btn btn-yellow' type="submit" value="Search" />
            </form>

        </div>
    )
};

SearchForm.propTypes = {
    search: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired
};

const addState = connect(null, { search, setAlert });
export default addState(SearchForm);