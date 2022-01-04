import React, {useState} from 'react';
import { connect } from "react-redux";
import BookDetails from './BookDetails';
import Result from './Result';
import Spinner from "../../../../Spinner";
import Modal from "../../../../Modal";
import PropTypes from 'prop-types';
import { openModal, closeModal } from '../../../../../actions/modalActions';

const Results = ({searchState, openModal, closeModal}) => {

    const [bookDetailsModal, setBookDetailsModal] = useState({show: false});
    
    const showBookDetails = () => {
        setBookDetailsModal({
            ...bookDetailsModal,
            show: true
        })
        openModal()
    };
    
    const hideBookDetails = () => {
        setBookDetailsModal({
            ...bookDetailsModal,
            show: false
        })
        closeModal()
    }

    const {results, loading } = searchState;
    
    if (loading) {
        return <Spinner/>
    }

    return (
        <div className='books'>
            {results.map(result => <Result key={result.id} result={result} showBookDetails={showBookDetails}/>)}
            <Modal handleClose={hideBookDetails} show={bookDetailsModal.show} Component={BookDetails}/>
        </div>
    )
}

Results.propTypes = {
    searchState: PropTypes.object.isRequired,
    openModal: PropTypes.func.isRequired,
    closeModal: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    searchState: state.search
})

const addState = connect(mapStateToProps, {openModal, closeModal});

export default addState(Results)