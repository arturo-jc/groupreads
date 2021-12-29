import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordItem from './RecordItem';

const Records = ({ recordState }) => {
    const { records, loading } = recordState;

    if (loading) {
        return (<p>Loading...</p>)
    }

    return (
        <div className='card'>
            <h3>Books</h3>
            {!loading && records ?
                (
                    <div className="books">
                        {records.map(record => (
                        <RecordItem key={record._id} record={record} />))}
                    </div>
                )
                :
                (<p>This group has no books yet.</p>)}
            <Link className='btn btn-yellow' to="search">Add books</Link>
        </div>
    )
};

Records.propTypes = {
    recordState: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    recordState: state.record
});

const addState = connect(mapStateToProps)

export default addState(Records);
