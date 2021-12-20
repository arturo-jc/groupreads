import React from 'react';
import { connect } from "react-redux";
import { Link, useParams } from "react-router-dom";
import PropTypes from 'prop-types'
import { setCurrentRecord } from '../../../../actions/recordActions';
import { getPostsFor } from '../../../../actions/postActions';

const RecordItem = ({ record, setCurrentRecord, getPostsFor }) => {
    const { title, authors, imageUrl } = record.book;
    const { groupId } = useParams();

    const onClick = record => {
        setCurrentRecord(record);
        getPostsFor(groupId, record);
    }

    return (
        <div>
            <img src={imageUrl} alt="" />
            <Link
                to={`/dashboard/groups/${groupId}/records/${record._id}`}
                key={record._id}
                onClick={() => onClick(record)}
            >{title}</Link>
            <p>By {authors.join(", ")}</p>
        </div>
    )
}

RecordItem.propTypes = {
    record: PropTypes.object.isRequired,
    setCurrentRecord: PropTypes.func.isRequired,
    getPostsFor: PropTypes.func.isRequired
}

const addState = connect(null, { setCurrentRecord, getPostsFor });

export default addState(RecordItem);