import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { setCurrentRecord } from "../../../../../actions/recordActions"
import { getPostsFor } from '../../../../../actions/postActions';
import { getMarkersFor } from '../../../../../actions/markerActions';
import { getBookmarksFor } from "../../../../../actions/bookmarkActions"

const RecordItem = ({ record, groupState, setCurrentRecord, getPostsFor, getMarkersFor, getBookmarksFor }) => {
    const { title, authors, imageUrl } = record.book;
    const { current } = groupState;

    // const onClick = record => {
    //     setCurrentRecord(record);
    //     getPostsFor(current._id, record);
    //     getMarkersFor(current._id, record);
    //     getBookmarksFor(current._id, record);
    // }

    return (
        <div>
            {current && <img src={imageUrl} alt="" />}
            {current && <Link
                to={`/groups/${current._id}/records/${record._id}`}
                key={record._id}
                // onClick={() => onClick(record)}
            >{title}</Link>}
            {current && <p>By {authors.join(", ")}</p>}
        </div>
    )
}

RecordItem.propTypes = {
    record: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired,
    setCurrentRecord: PropTypes.func.isRequired,
    getPostsFor: PropTypes.func.isRequired,
    getBookmarksFor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
})
const addState = connect(mapStateToProps, { setCurrentRecord, getPostsFor, getMarkersFor, getBookmarksFor });

export default addState(RecordItem);