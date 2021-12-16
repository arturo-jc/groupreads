import React, { Fragment, useEffect } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getGroups } from "../../actions/groupActions";
import AddGroupForm from './AddGroupForm';

const Groups = ({ group: { groups, loading }, getGroups }) => {

    useEffect(() => {
        getGroups();
    }, [])

    return (
        <div>
            <h4>Groups</h4>
            {!loading && !groups ?
                (<Fragment>
                    <p>You don't have any groups yet</p>
                    <p>Create group</p>
                    <p>Join group</p>
                </Fragment>)
                :
                (groups.map(group => <p>{group.name}</p>))
            }
            <AddGroupForm />
        </div>
    )
};

Groups.propTypes = {
    group: PropTypes.object.isRequired,
    getGroups: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    group: state.group
});

const connection = connect(mapStateToProps, { getGroups });

export default connection(Groups);