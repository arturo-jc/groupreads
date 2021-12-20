import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { addRecord } from "../../../../actions/recordActions";
import { saveResult, clearResults } from '../../../../actions/searchActions';
import { useNavigate } from 'react-router-dom';

const Result = ({ result, groupState, addRecord, saveResult, clearResults }) => {
    const { current } = groupState;
    const { title, authors, imageLinks } = result.volumeInfo;
    const navigate = useNavigate();

    const onClick = async () => {
        const newBook = await saveResult(result)
        addRecord(newBook._id, current._id);
        clearResults();
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

Result.propTypes = {
    result: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired,
    addRecord: PropTypes.func.isRequired,
    saveResult: PropTypes.func.isRequired,
    clearResults: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps, { addRecord, saveResult, clearResults });

export default addState(Result);