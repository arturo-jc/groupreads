import React, { useState, Fragment } from 'react'
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import SearchForm from "./search/SearchForm";
import Modal from "../../../Modal"
import BookDetails from "./search/BookDetails";
import Result from "./search/Result";

const Search = ({ searchState }) => {
    const [bookDetailsModal, setBookDetailsModal] = useState({show: false});
    const showBookDetails = () => {
        setBookDetailsModal({
            ...bookDetailsModal,
            show: true
        })
    };
    const hideBookDetails = () => {
        setBookDetailsModal({
            ...bookDetailsModal,
            show: false
        })
    }
    const { results, loading } = searchState;

    return (
        <div className='card'>
            <h3>Search books</h3>
            <SearchForm />
            {loading && (<p>Loading...</p>)}
            {!loading && results ?
                (
                    <Fragment>
                        <div className='books'>
                        {results.map(result => <Result key={result.id} result={result} showBookDetails={showBookDetails}/>)}
                        </div>
                        <Modal handleClose={hideBookDetails} show={bookDetailsModal.show} Component={BookDetails}/>
                    </Fragment>
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