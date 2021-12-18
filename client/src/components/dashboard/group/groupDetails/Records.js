import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordItem from './RecordItem';

const Records = ({ groupState }) => {
    const { loading } = groupState;
    const { records } = groupState.current;

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
    groupState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    groupState: state.group
});

const addState = connect(mapStateToProps)

export default addState(Records);
