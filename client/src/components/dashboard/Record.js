import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

const Record = ({ recordState }) => {

    const { current, loading } = recordState;
    const { title, authors, imageUrl } = current.book;
    const { startedOn, finishedOn } = current;

    return (
        <div>
            <h1>{title}</h1>
            <p>By {authors.join(", ")}</p>
            <img src={imageUrl} alt="" />
            {startedOn ? (<p>Started on {startedOn}</p>) : (<p>Not started</p>)}
            {finishedOn ? (<p>Finished on {finishedOn}</p>) : (<p>Not finished</p>)}
        </div>
    )
}

Record.propTypes = {
    recordState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record
})

const addState = connect(mapStateToProps);

export default addState(Record);