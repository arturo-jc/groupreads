import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addRecord } from "../../../../actions/recordActions";
import { saveBook, clearBooks } from '../../../../actions/bookActions';
import { useNavigate } from 'react-router-dom';

const Book = ({ book, groupState, addRecord, saveBook, clearBooks }) => {
    const { current } = groupState;
    const { title, authors, imageLinks } = book.volumeInfo;
    const navigate = useNavigate();

    const onClick = async () => {
        const newBook = await saveBook(book)
        addRecord(newBook._id, current._id);
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
    saveBook: PropTypes.func.isRequired,
    clearBooks: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { addRecord, saveBook, clearBooks });

export default addState(Book);