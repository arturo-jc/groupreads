import React, {useState} from 'react';
import { connect } from "react-redux";
import BookDetails from './BookDetails';
import Result from './Result';
import Spinner from "../../../../Spinner";
import Modal from "../../../../Modal";
import PropTypes from 'prop-types'

const Results = ({searchState}) => {

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
    searchState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    searchState: state.search
})

const addState = connect(mapStateToProps);

export default addState(Results)