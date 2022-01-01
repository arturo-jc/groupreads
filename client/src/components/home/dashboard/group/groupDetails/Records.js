import React, {Fragment} from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import RecordItem from './RecordItem';
import Spinner from '../../../../Spinner';

const Records = ({ groupState }) => {
    const { current, loading  } = groupState;

    if (loading) {
        return <Spinner/>
    }

    return (
        <Fragment>
            <h3>Books</h3>
            <div className="books">
                {current && current.records.map(record => (
                <RecordItem key={record._id} record={record} />))}
            </div>
        </Fragment>
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
