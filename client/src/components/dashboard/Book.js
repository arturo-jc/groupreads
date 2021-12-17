import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addRecord } from "../../actions/recordActions"

const Book = ({ groupState, addRecord, book }) => {
    const { current } = groupState;
    const { title, authors, imageLinks } = book.volumeInfo;

    const onClick = () => {
        console.log("onclick activated")
        const recordData = {
            volumeInfo: book.volumeInfo,
            groupId: current._id
        }
        addRecord(recordData);
    }

    return (
        <div>
            <img src={imageLinks.smallThumbnail} />
            <p>{title}</p>
            {authors && <p>By {authors.join(", ")}</p>}
            <a href="#" onClick={onClick}>Add to group ({current.name})</a>
        </div>
    )
};

Book.propTypes = {
    groupState: PropTypes.object.isRequired,
    addRecord: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { addRecord });

export default addState(Book);