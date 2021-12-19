import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordItem from './RecordItem';
import { getRecordsFor } from '../../../../actions/recordActions';

const Records = ({ groupState, recordState, getRecordsFor }) => {
    const { current } = groupState;
    const { records, loading } = recordState;
    useEffect(() => {
        getRecordsFor(current);
    }, []);

    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <div>
            <h5>Books</h5>
            {!loading && records ?
                (records.map(record => (
                    <RecordItem key={record._id} record={record} />))
                )
                :
                (<p>This group has no books yet.</p>)}
            <Link to="search">Add books</Link>
        </div>
    )
};

Records.propTypes = {
    recordState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record,
    groupState: state.group
});

const addState = connect(mapStateToProps, { getRecordsFor })

export default addState(Records);
