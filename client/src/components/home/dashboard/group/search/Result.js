import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setCurrentResult } from '../../../../../actions/searchActions';
import nocover from "./nocover.gif";

const Result = ({ result, setCurrentResult, showBookDetails }) => {
    const { title, subtitle, authors, imageLinks } = result.volumeInfo;

    const onClick = result => {
        setCurrentResult(result);
        showBookDetails();
    }

    return (
        <div className='book'>
            {imageLinks? (<img src={imageLinks.smallThumbnail} />): (<img style={{width: 128}} src={nocover}/>)}
            <div className='book-info'>
            {title ? (<p className='book-title'>{title}</p>) : (<p className='book-title'>Title unkown</p>)}
            {subtitle && <p className='book-subtitle'>{subtitle}</p>}
            {authors? (<p className='authors'>By {authors.join(", ")}</p>):(<p className='authors'>Authors unkown</p>)}
            </div>
            <button className='btn btn-grey' onClick={() => onClick(result)}>Details</button>
        </div>
    )
};

Result.propTypes = {
    result: PropTypes.object.isRequired,
    setCurrentResult: PropTypes.func.isRequired,
    showBookDetails: PropTypes.func.isRequired
}

const addState = connect(null, { setCurrentResult });

export default addState(Result);