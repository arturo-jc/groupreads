import React from 'react';
import { connect } from 'react-redux';
import { saveResult, clearResults } from '../../../../../actions/searchActions';
import { addRecord } from "../../../../../actions/recordActions";
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import nocover from "./nocover.gif"

const BookDetails = ({searchState, saveResult, clearResults, addRecord, handleClose}) => {
    const { groupId } = useParams();
    const { current } = searchState;

    const navigate = useNavigate();

    const onClick = async result => {
        const newBook = await saveResult(result);
        addRecord(newBook._id, groupId);
        clearResults();
        handleClose();
        navigate(`/groups/${groupId}`);
    }

    return (
        <div className='book-details'>
            {current && current.volumeInfo.title ? (<h3 className='book-title'>{current.volumeInfo.title}</h3>) : (<h3>Title unkown</h3>)}
            {current && current.volumeInfo.subtitle && <p>{current.volumeInfo.subtitle}</p>}
            {current && current.volumeInfo.authors? (<p className='authors'>By {current.volumeInfo.authors.join(", ")}</p>):(<p className='authors'>Authors unkown</p>)}
            <div className='details-row'>
                <div className="cover-col">
                    {current && current.volumeInfo.imageLinks ? (<img src={current.volumeInfo.imageLinks.smallThumbnail} />) : (<img style={{width: 128}} src={nocover}/>)}
                </div>
                <div className="details-col">
                    {current && current.volumeInfo.description && <p className='book-description'>{current.volumeInfo.description}</p>}
                    {current && current.volumeInfo.publisher && <p><span className='volume-info'>Publisher:</span> {current.volumeInfo.publisher}</p>}
                    {current && current.volumeInfo.publishedDate && <p><span className='volume-info'>Published on:</span> {current.volumeInfo.publishedDate}</p>}
                    {current && current.volumeInfo.pageCount && <p><span className='volume-info'>Pages: </span>{current.volumeInfo.pageCount}</p>}
                    {current && current.volumeInfo.industryIdentifiers && <p><span className='volume-info'>{current.volumeInfo.industryIdentifiers[0].type}:</span> {current.volumeInfo.industryIdentifiers[0].identifier}</p>}
                </div>
            </div>
            <button className='btn btn-yellow' onClick={() => onClick(current)}>Add to group</button>
        </div>
    )
}

BookDetails.propTypes = {
    searchState: PropTypes.object.isRequired,
    saveResult: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired,
    addRecord: PropTypes.func.isRequired,
    handleClose: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    searchState: state.search
});

const addState = connect(mapStateToProps, {saveResult, clearResults, addRecord});

export default addState(BookDetails)