import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addRecord } from "../../../actions/recordActions";
import { useNavigate } from 'react-router-dom';

const Book = ({ groupState, addRecord, book }) => {
    const { current } = groupState;
    const { title, authors, imageLinks } = book.volumeInfo;
    const navigate = useNavigate();

    const onClick = async () => {
        const recordData = {
            rawBookData: book,
            groupId: current._id
        }
        await addRecord(recordData);
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
    groupState: PropTypes.object.isRequired,
    addRecord: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { addRecord });

export default addState(Book);