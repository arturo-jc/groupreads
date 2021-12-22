import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { setCurrentRecord } from "../../../../../actions/recordActions"
import { getPostsFor } from '../../../../../actions/postActions';
import { getMarkersFor } from '../../../../../actions/markerActions';

const RecordItem = ({ record, groupState, setCurrentRecord, getPostsFor, getMarkersFor }) => {
    const { title, authors, imageUrl } = record.book;
    const { current } = groupState;

    const onClick = record => {
        setCurrentRecord(record);
        getPostsFor(current._id, record);
        getMarkersFor(current._id, record);
    }

    return (
        <div>
            <img src={imageUrl} alt="" />
            <Link
                to={`/groups/${current._id}/records/${record._id}`}
                key={record._id}
                onClick={() => onClick(record)}
            >{title}</Link>
            <p>By {authors.join(", ")}</p>
        </div>
    )
}

RecordItem.propTypes = {
    record: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired,
    setCurrentRecord: PropTypes.func.isRequired,
    getPostsFor: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
})
const addState = connect(mapStateToProps, { setCurrentRecord, getPostsFor, getMarkersFor });

export default addState(RecordItem);