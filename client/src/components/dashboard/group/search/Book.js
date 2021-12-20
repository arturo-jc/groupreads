import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addRecord } from "../../../../actions/recordActions";
import { clearBooks } from '../../../../actions/bookActions';
import { useNavigate } from 'react-router-dom';

const Book = ({ book, groupState, addRecord, clearBooks }) => {
    const { current } = groupState;
    const { title, authors, imageLinks } = book.volumeInfo;
    const navigate = useNavigate();

    const onClick = async () => {
        const recordData = {
            rawBookData: book,
            groupId: current._id
        }
        await addRecord(recordData);
        clearBooks();
        navigate(`/dashboard/groups/${current._id}`);
    }

    return (
        <div>
            {imageLinks && (<img src={imageLinks.smallThumbnail} />)}
            {title ? (<p>{title}</p>) : (<p>Title unkown</p>)}
            {authors && <p>By {authors.join(", ")}</p>}
            <button onClick={onClick}>Add to group</button>
        </div>
    )
};

Book.propTypes = {
    book: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired,
    addRecord: PropTypes.func.isRequired,
    clearBooks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { addRecord, clearBooks });

export default addState(Book);