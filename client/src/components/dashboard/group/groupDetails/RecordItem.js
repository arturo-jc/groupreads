import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { setCurrentRecord } from '../../../../actions/recordActions';

const RecordItem = ({ record, setCurrentRecord }) => {
    const { title, authors, imageUrl } = record.book;

    const onClick = record => {
        setCurrentRecord(record);
        // Set current record
        // Get everything you need to display
    }
    return (
        <div>
            <img src={imageUrl} alt="" />
            <Link
                to={`/dashboard/records/${record._id}`}
                key={record._id}
                onClick={() => onClick(record)}
            >{title}</Link>
            <p>By {authors.join(", ")}</p>
        </div>
    )
}

RecordItem.propTypes = {
    record: PropTypes.object.isRequired,
    setCurrentRecord: PropTypes.func.isRequired
}

const addState = connect(null, { setCurrentRecord });

export default addState(RecordItem);