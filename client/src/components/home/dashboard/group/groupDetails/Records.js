import React, {Fragment} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordItem from './RecordItem';
import Spinner from '../../../../Spinner';

const Records = ({ recordState }) => {
    const { records, loading } = recordState;

    if (loading) {
        return <Spinner/>
    }

    return (
        <Fragment>
            <h3>Books</h3>
            <div className="books">
                {records.map(record => (
                <RecordItem key={record._id} record={record} />))}
            </div>
        </Fragment>
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
