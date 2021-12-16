import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { setCurrent, getGroups } from "../../actions/groupActions";
import AddGroupForm from './AddGroupForm';

const Groups = ({ groupState, setCurrent, getGroups }) => {

    useEffect(() => {
        getGroups();
    }, [])

    const { groups, loading } = groupState;

    return (
        <div>
            <h4>Groups</h4>
            {!loading && !groups ?
                (<Fragment>
                    <p>You don't have any groups yet</p>
                </Fragment>)
                :
                (groups.map(group => <a href='#' key={group._id} onClick={() => setCurrent(group)}>{group.name}</a>))
            }
            <AddGroupForm />
        </div>
    )
};

Groups.propTypes = {
    groupState: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired,
    getCurrent: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    groupState: state.group
});

const connection = connect(mapStateToProps, { setCurrent, getGroups });

export default connection(Groups);