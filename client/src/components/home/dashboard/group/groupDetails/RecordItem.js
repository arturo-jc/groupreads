import React from 'react';
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import nocover from "../search/nocover.gif"

const RecordItem = ({ record, groupState }) => {
    const { title, subtitle, authors, imageUrl } = record.book;
    const { current } = groupState;

    return (
        <div className='book'>
            {current && imageUrl ? (<img src={imageUrl} alt="" />): (<img style={{width: 128}} src={nocover}/>)}
            {current && <Link
                className='book-title'
                to={`/groups/${current._id}/records/${record._id}`}
                key={record._id}>{title}</Link>}
            { current && subtitle && <p className='book-subtitle'>{subtitle}</p>}
            {current && <p className='authors'>By {authors.join(", ")}</p>}
        </div>
    )
}

RecordItem.propTypes = {
    record: PropTypes.object.isRequired,
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
})

const addState = connect(mapStateToProps);

export default addState(RecordItem);