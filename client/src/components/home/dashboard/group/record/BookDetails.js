import React, { useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecord } from '../../../../../actions/recordActions';
import PropTypes from 'prop-types';
import Spinner from '../../../../Spinner';

const BookDetails = ({recordState, getRecord}) => {
    
    const { groupId, recordId } = useParams();

    useEffect(() => {
        getRecord(groupId, recordId);
    }, [recordId])
    
    const { current, loading } = recordState;

    if (loading){
        return <Spinner/>
    }

    return (
        <div>
            {current && current.book.description && <p className='book-description'>{current.book.description}</p>}
            {current && current.book.publisher && <p><span className='volume-info'>Publisher: </span>{current.book.publisher}</p>}
            {current && current.book.publishedOn && <p><span className='volume-info'>Published on: </span>{current.book.publishedOn.split("T")[0]}</p>}
            {current && current.book.industryIdentifiers && current.book.industryIdentifiers.length > 0 && <p><span className='volume-info'>{current.book.industryIdentifiers[0].type}: </span>{current.book.industryIdentifiers[0].identifier}</p>}
        </div>
    )
}

BookDetails.propTypes = {
    recordState: PropTypes.object.isRequired,
    getRecord: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record
})

const addState = connect(mapStateToProps, { getRecord });

export default addState(BookDetails);
